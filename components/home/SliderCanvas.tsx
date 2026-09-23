"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import {
  LinearFilter,
  NoColorSpace,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  type Mesh,
  type Texture,
} from "three";
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
  readonly sources: readonly SlideSource[];
  readonly motion: RefObject<SliderMotion>;
  /** The slide on screen at mount; the canvas reports ready once it is. */
  readonly initialIndex: number;
  readonly onReady: () => void;
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

function Slides({ sources, motion, initialIndex, onReady }: Props) {
  const { size, gl } = useThree();
  const meshes = useRef<(Mesh | null)[]>([]);
  const smoothedVelocity = useRef(0);
  const reported = useRef(false);

  const slides = useMemo(
    () =>
      sources.map((source) => {
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
        return { uniforms, material };
      }),
    [sources],
  );

  useEffect(
    () => () => {
      for (const slide of slides) {
        slide.material.dispose();
        slide.uniforms.uTexture.value?.dispose();
      }
    },
    [slides],
  );

  // Textures are sized to the display once, at mount. Reloading them on every
  // resize would refetch the same images for a few pixels' difference.
  const loadWidth = useRef(size.width);
  useEffect(() => {
    const loader = new TextureLoader();
    let cancelled = false;
    slides.forEach((slide, i) => {
      const source = sources[i];
      if (!source) return;
      loader.load(optimizedUrl(source.src, loadWidth.current, gl.getPixelRatio()), (texture) => {
        if (cancelled) {
          texture.dispose();
          return;
        }
        // The shader works in the image's own values -- the same space the DOM
        // image's CSS brightness filter works in -- so no colour conversion.
        texture.colorSpace = NoColorSpace;
        texture.minFilter = LinearFilter;
        texture.magFilter = LinearFilter;
        texture.generateMipmaps = false;
        slide.uniforms.uTexture.value = texture;
      });
    });
    return () => {
      cancelled = true;
    };
  }, [slides, sources, gl]);

  useFrame(() => {
    const state = motion.current;
    const count = sources.length;
    const target = clamp(state.velocity * 18, -1, 1);
    smoothedVelocity.current += (target - smoothedVelocity.current) * 0.18;

    slides.forEach((slide, i) => {
      const offset = slideOffset(i, state.current, count);
      const mesh = meshes.current[i];
      if (mesh) {
        mesh.position.x = offset * size.width * SLIDE_SPACING;
        mesh.visible = Math.abs(offset) < 1.25;
      }
      const u = slide.uniforms;
      u.uPlane.value.set(size.width, size.height);
      u.uOffset.value = offset;
      u.uVelocity.value = smoothedVelocity.current;
      u.uHover.value = state.hover;
      if (u.uTexture.value) u.uReady.value += (1 - u.uReady.value) * 0.12;
    });

    if (!reported.current) {
      const first = slides[wrapIndex(initialIndex, count)];
      if (first && first.uniforms.uReady.value > 0.97) {
        reported.current = true;
        onReady();
      }
    }
  });

  return (
    <>
      {slides.map((slide, i) => (
        <mesh
          key={i}
          ref={(mesh) => {
            meshes.current[i] = mesh;
          }}
          material={slide.material}
        >
          <planeGeometry args={[size.width, size.height]} />
        </mesh>
      ))}
    </>
  );
}

/**
 * The slider's WebGL layer: one plate per project on an orthographic camera
 * where a world unit is a CSS pixel. It only renders; every input and all the
 * physics live in ProjectSlider, which shares its state by reference.
 *
 * `flat` and `linear` keep three.js from tone-mapping or re-encoding colour,
 * so a plate is the image, darkened by exactly HERO_BRIGHTNESS -- matching the
 * DOM image it hands over to when a case study opens.
 */
export function SliderCanvas(props: Props) {
  return (
    <Canvas
      orthographic
      flat
      linear
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 10], near: 0.1, far: 100, zoom: 1 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Slides {...props} />
    </Canvas>
  );
}
