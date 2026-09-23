"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  LinearFilter,
  LinearSRGBColorSpace,
  Mesh,
  NoColorSpace,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  WebGLRenderer,
  type Texture,
} from "three";
import { gsap } from "@/lib/gsap";
import { HERO_BRIGHTNESS, HERO_ZOOM, optimizedUrl } from "@/lib/media";
import {
  clamp,
  SLIDE_SPACING,
  slideOffset,
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
  uOffset: { value: number };
  uVelocity: { value: number };
  uHover: { value: number };
  uBrightness: { value: number };
  uZoom: { value: number };
  uReady: { value: number };
}

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// All distortion is in UV space, so each plate stays full-bleed and nothing
// behind it can show through the bend.
const FRAGMENT = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uPlane;
  uniform vec2 uImage;
  uniform float uOffset;
  uniform float uVelocity;
  uniform float uHover;
  uniform float uBrightness;
  uniform float uZoom;
  uniform float uReady;
  varying vec2 vUv;

  // object-fit: cover, in UV space.
  vec2 cover(vec2 uv) {
    float planeRatio = uPlane.x / uPlane.y;
    float imageRatio = uImage.x / uImage.y;
    vec2 scale = planeRatio > imageRatio
      ? vec2(1.0, imageRatio / planeRatio)
      : vec2(planeRatio / imageRatio, 1.0);
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 uv = vUv;
    float v = uVelocity;

    // Rows bow toward the direction of travel, most across the middle.
    float row = uv.y * 2.0 - 1.0;
    uv.x -= v * 0.045 * (1.0 - row * row);

    // A slight push in while moving or hovered. The base zoom leaves the
    // parallax room to travel without sampling past the image's edge.
    float zoom = uZoom + abs(v) * 0.05 + uHover * 0.025;
    uv = (uv - 0.5) / zoom + 0.5;

    // Parallax: the image drifts against its own plate.
    uv.x += uOffset * 0.1;

    vec2 st = cover(uv);

    // Long exposure: the frame smears along its path, like a star trail.
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

    gl_FragColor = vec4(color * uBrightness * uReady, uReady);
  }
`;

/**
 * The slider's WebGL layer: one plate per project on an orthographic camera
 * where a world unit is a CSS pixel. It only draws. Every input and all the
 * physics live in ProjectSlider, which shares its state by reference; this
 * reads it on the same GSAP tick, after the slider has updated it.
 *
 * Plain three.js rather than a React renderer: three plates do not need a
 * reconciler, and a second React reconciler is one more thing that has to
 * agree with the canary React the App Router runs.
 *
 * The renderer does not re-encode colour and textures are not decoded, so a
 * plate is the image darkened by exactly HERO_BRIGHTNESS -- the same value the
 * DOM plate's CSS filter applies, which is what keeps the page-transition
 * handover from flashing. When nothing is moving, nothing is redrawn.
 */
export function SliderCanvas({ sources, motion, initialIndex, onReady, onLost }: Props) {
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
    const geometry = new PlaneGeometry(1, 1);

    const slides = sources.map((source) => {
      const uniforms: SlideUniforms = {
        uTexture: { value: null },
        uPlane: { value: new Vector2(1, 1) },
        uImage: { value: new Vector2(source.width, source.height) },
        uOffset: { value: 0 },
        uVelocity: { value: 0 },
        uHover: { value: 0 },
        uBrightness: { value: HERO_BRIGHTNESS },
        uZoom: { value: HERO_ZOOM },
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
      for (const slide of slides) {
        slide.mesh.scale.set(width, height, 1);
        slide.uniforms.uPlane.value.set(width, height);
      }
      dirty = true;
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    // Textures are sized to the display once, at mount; refetching on every
    // resize would download the same images for a few pixels' difference.
    let cancelled = false;
    const loader = new TextureLoader();
    slides.forEach((slide, i) => {
      const source = sources[i];
      if (!source) return;
      loader.load(optimizedUrl(source.src, width, renderer.getPixelRatio()), (texture) => {
        if (cancelled) {
          texture.dispose();
          return;
        }
        texture.colorSpace = NoColorSpace;
        texture.minFilter = LinearFilter;
        texture.magFilter = LinearFilter;
        texture.generateMipmaps = false;
        slide.uniforms.uTexture.value = texture;
        dirty = true;
      });
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
        slide.mesh.position.x = offset * width * SLIDE_SPACING;
        slide.mesh.visible = Math.abs(offset) < 1.25;
        const u = slide.uniforms;
        u.uOffset.value = offset;
        u.uVelocity.value = smoothedVelocity;
        u.uHover.value = state.hover;
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
  }, [sources, motion, initialIndex]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 [&>canvas]:block [&>canvas]:size-full"
    />
  );
}
