"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef, type RefObject } from "react";
import {
  LinearFilter,
  LinearMipmapLinearFilter,
  LinearSRGBColorSpace,
  Mesh,
  NoColorSpace,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Texture,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { gsap } from "@/lib/gsap";
import { CASE_HERO, HERO_BRIGHTNESS } from "@/lib/media";
import {
  clamp,
  presenceAt,
  slideOffset,
  slideStep,
  wrapIndex,
  type SliderMotion,
} from "@/lib/slider";

export interface SlideSource {
  readonly src: string;
  readonly width: number;
  readonly height: number;
}

interface Props {
  /** Must be referentially stable: a new array rebuilds the whole scene. */
  readonly sources: readonly SlideSource[];
  readonly motion: RefObject<SliderMotion>;
  /** A DOM plate. Its layout box is the frame every WebGL plate is drawn in. */
  readonly frameRef: RefObject<HTMLElement | null>;
  /** The slide on screen at mount; the canvas reports ready once it is. */
  readonly initialIndex: number;
  readonly onReady: () => void;
  /** The WebGL context was lost; the DOM plates should take over. */
  readonly onLost: () => void;
}

interface SlideUniforms {
  [uniform: string]: { value: unknown };
  uTexture: { value: Texture | null };
  uPlane: { value: Vector2 };
  uImage: { value: Vector2 };
  uVelocity: { value: number };
  uHover: { value: number };
  uBrightness: { value: number };
  uPresence: { value: number };
  uGround: { value: Vector3 };
  uReady: { value: number };
}

/** The page's ink, #111111, as the shader's raw sRGB values. */
const GROUND = 17 / 255;

// The plate's leading edge bows forward, furthest across the middle row, and
// the trailing edge holds -- film pulled through a gate. The plate only ever
// grows, so the DOM plate registered beneath it can never show at an edge.
const VERTEX = /* glsl */ `
  uniform float uVelocity;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    float row = p.y * 2.0;
    float leading = step(p.x * uVelocity, 0.0);
    p.x -= uVelocity * 0.06 * (1.0 - row * row) * leading;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uPlane;
  uniform vec2 uImage;
  uniform float uVelocity;
  uniform float uHover;
  uniform float uBrightness;
  uniform float uPresence;
  uniform vec3 uGround;
  uniform float uReady;
  varying vec2 vUv;

  // object-fit: cover with object-position: top, in UV space (v = 1 is the
  // top edge), matching the DOM plate's object-cover object-top.
  vec2 cover(vec2 uv) {
    float planeRatio = uPlane.x / uPlane.y;
    float imageRatio = uImage.x / uImage.y;
    vec2 scale = planeRatio > imageRatio
      ? vec2(1.0, imageRatio / planeRatio)
      : vec2(planeRatio / imageRatio, 1.0);
    return vec2((uv.x - 0.5) * scale.x + 0.5, 1.0 - (1.0 - uv.y) * scale.y);
  }

  void main() {
    float v = uVelocity;

    // A slight push in while moving or hovered, inside the frame.
    float zoom = 1.0 + abs(v) * 0.03 + uHover * 0.02;
    vec2 st = cover((vUv - 0.5) / zoom + 0.5);

    // Long exposure: the capture smears back along its path.
    vec3 color = vec3(0.0);
    vec2 trail = vec2(v * 0.03, 0.0);
    for (int i = 0; i < 8; i++) {
      color += texture2D(uTexture, st + trail * (float(i) / 7.0)).rgb;
    }
    color /= 8.0;

    // A faint channel split on the leading edge.
    vec2 split = vec2(v * 0.0035, 0.0);
    color.r = mix(color.r, texture2D(uTexture, st + split).r, 0.5);
    color.b = mix(color.b, texture2D(uTexture, st - split).b, 0.5);

    // Dimmed toward the ground as the plate leaves the stage: the same mix the
    // DOM plate's opacity makes over the ink.
    vec3 lit = mix(uGround, color * uBrightness, uPresence);
    gl_FragColor = vec4(lit * uReady, uReady);
  }
`;

/**
 * The slider's WebGL layer: one plate per project on an orthographic camera
 * where a world unit is a CSS pixel. It only draws. Every input and all the
 * physics live in ProjectSlider, which shares its state by reference; this
 * reads it on the same GSAP tick, after the slider has updated it.
 *
 * The plates copy the DOM plates' geometry rather than restating it: the frame
 * is measured from `frameRef`, and plates step apart by the same `slideStep`,
 * so CSS remains the one place the layout is defined.
 *
 * Plain three.js rather than a React renderer: three plates do not need a
 * reconciler, and a second React reconciler is one more thing that has to
 * agree with the canary React the App Router runs.
 *
 * The renderer does not re-encode colour and textures are not decoded, so a
 * plate at rest is the image darkened by exactly HERO_BRIGHTNESS -- the same
 * value the DOM plate's CSS filter applies, which is what keeps the
 * page-transition handover from flashing. When nothing is moving, nothing is
 * redrawn.
 */
export function SliderCanvas({ sources, motion, frameRef, initialIndex, onReady, onLost }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  // Callbacks change identity on every parent render; the scene must not, so
  // it reads them through refs kept current after each render.
  const onReadyRef = useRef(onReady);
  const onLostRef = useRef(onLost);
  useEffect(() => {
    onReadyRef.current = onReady;
    onLostRef.current = onLost;
  });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = LinearSRGBColorSpace;
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
    camera.position.z = 10;
    // Rows to bow along; columns stay straight.
    const geometry = new PlaneGeometry(1, 1, 1, 24);

    const slides = sources.map((source) => {
      const uniforms: SlideUniforms = {
        uTexture: { value: null },
        uPlane: { value: new Vector2(1, 1) },
        uImage: { value: new Vector2(source.width, source.height) },
        uVelocity: { value: 0 },
        uHover: { value: 0 },
        uBrightness: { value: HERO_BRIGHTNESS },
        uPresence: { value: 1 },
        uGround: { value: new Vector3(GROUND, GROUND, GROUND) },
        uReady: { value: 0 },
      };
      const material = new ShaderMaterial({
        uniforms,
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        transparent: true,
      });
      const mesh = new Mesh(geometry, material);
      scene.add(mesh);
      return { uniforms, material, mesh };
    });

    let width = 1;
    let height = 1;
    // The frame, in camera space: its centre and size, and the step between
    // neighbouring plates.
    let frameX = 0;
    let frameY = 0;
    let frameWidth = 1;
    let frameHeight = 1;
    let step = 1;
    let dirty = true;
    const resize = () => {
      width = Math.max(host.clientWidth, 1);
      height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      const frame = frameRef.current;
      frameWidth = Math.max(frame?.offsetWidth ?? width, 1);
      frameHeight = Math.max(frame?.offsetHeight ?? height, 1);
      frameX = (frame?.offsetLeft ?? 0) + frameWidth / 2 - width / 2;
      frameY = height / 2 - ((frame?.offsetTop ?? 0) + frameHeight / 2);
      step = slideStep(width, frameWidth);
      for (const slide of slides) {
        slide.mesh.scale.set(frameWidth, frameHeight, 1);
        slide.uniforms.uPlane.value.set(frameWidth, frameHeight);
      }
      dirty = true;
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    // Each texture's candidate is chosen by an image carrying the DOM plate's
    // own srcset and sizes, so the browser picks the same one for both: one
    // download serves the DOM plate, this texture and the case-study hero the
    // plate opens into (see CASE_HERO). A hand-built URL cannot promise that
    // -- the browser's choice between neighbouring widths is its own.
    //
    // The texture itself is made from a second, plain image of that same URL
    // (a memory-cache hit, not a second download). An srcset image reports a
    // density-corrected size -- a 2560px capture chosen for a 3840w slot
    // calls itself 917px wide -- and three.js allocates the texture from that
    // figure, so the real bitmap would not fit and the plate drew black.
    //
    // Mipmapped, because the candidate is sized for the wider hero and is
    // drawn here smaller than it was fetched.
    let cancelled = false;
    slides.forEach((slide, i) => {
      const source = sources[i];
      if (!source) return;
      const { props } = getImageProps({
        src: source.src,
        alt: "",
        width: source.width,
        height: source.height,
        sizes: CASE_HERO.sizes,
      });
      const chooser = new Image();
      chooser.sizes = CASE_HERO.sizes;
      if (props.srcSet) chooser.srcset = props.srcSet;
      chooser.src = props.src;
      chooser.onload = () => {
        if (cancelled) return;
        const image = new Image();
        image.onload = () => {
          if (cancelled) return;
          const texture = new Texture(image);
          texture.colorSpace = NoColorSpace;
          texture.minFilter = LinearMipmapLinearFilter;
          texture.magFilter = LinearFilter;
          texture.generateMipmaps = true;
          texture.needsUpdate = true;
          slide.uniforms.uTexture.value = texture;
          dirty = true;
        };
        image.src = chooser.currentSrc;
      };
    });

    let smoothedVelocity = 0;
    let lastHover = -1;
    let reported = false;

    const render = () => {
      const state = motion.current;
      const count = slides.length;
      smoothedVelocity += (clamp(state.velocity * 18, -1, 1) - smoothedVelocity) * 0.18;

      let fading = false;
      slides.forEach((slide, i) => {
        const offset = slideOffset(i, state.current, count);
        slide.mesh.position.set(frameX + offset * step, frameY, 0);
        slide.mesh.visible = Math.abs(offset) < 1.25;
        const u = slide.uniforms;
        u.uVelocity.value = smoothedVelocity;
        u.uHover.value = state.hover;
        u.uPresence.value = presenceAt(offset);
        if (u.uTexture.value && u.uReady.value < 0.999) {
          u.uReady.value += (1 - u.uReady.value) * 0.12;
          fading = true;
        }
      });

      const moving = Math.abs(smoothedVelocity) > 1e-5 || Math.abs(state.velocity) > 1e-6;
      const hovering = state.hover !== lastHover;
      if (dirty || moving || hovering || fading) {
        renderer.render(scene, camera);
        dirty = false;
        lastHover = state.hover;
      }

      if (!reported) {
        const first = slides[wrapIndex(initialIndex, count)];
        if (first && first.uniforms.uReady.value > 0.97) {
          reported = true;
          onReadyRef.current();
        }
      }
    };
    gsap.ticker.add(render);

    const onContextLost = (event: Event) => {
      event.preventDefault();
      gsap.ticker.remove(render);
      onLostRef.current();
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);

    return () => {
      cancelled = true;
      gsap.ticker.remove(render);
      observer.disconnect();
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      for (const slide of slides) {
        slide.material.dispose();
        slide.uniforms.uTexture.value?.dispose();
      }
      geometry.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [sources, motion, frameRef, initialIndex]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 [&>canvas]:block [&>canvas]:size-full"
    />
  );
}
