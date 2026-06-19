"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

type TouchPoint = {
  x: number;
  y: number;
  age: number;
  force: number;
  vx: number;
  vy: number;
};

type TouchSample = { x: number; y: number };

class TouchTexture {
  size = 64;
  width = 64;
  height = 64;
  maxAge = 64;
  radius = 0.1;
  speed = 1 / 64;
  trail: TouchPoint[] = [];
  last: TouchSample | null = null;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  texture: THREE.Texture;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d")!;
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.texture = new THREE.Texture(this.canvas);
  }

  update() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.trail.length - 1; i >= 0; i--) {
      const p = this.trail[i];
      const f = p.force * this.speed * (1 - p.age / this.maxAge);
      p.x += p.vx * f;
      p.y += p.vy * f;
      p.age++;
      if (p.age > this.maxAge) this.trail.splice(i, 1);
      else this.drawPoint(p);
    }

    this.texture.needsUpdate = true;
  }

  addTouch(point: TouchSample) {
    let force = 0;
    let vx = 0;
    let vy = 0;

    if (this.last) {
      const dx = point.x - this.last.x;
      const dy = point.y - this.last.y;
      if (dx === 0 && dy === 0) return;
      const d = Math.sqrt(dx * dx + dy * dy);
      vx = dx / d;
      vy = dy / d;
      force = Math.min((dx * dx + dy * dy) * 20000, 2.0);
    }

    this.last = { x: point.x, y: point.y };
    this.trail.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
  }

  drawPoint(p: TouchPoint) {
    const pos = { x: p.x * this.width, y: (1 - p.y) * this.height };
    const intensity =
      p.age < this.maxAge * 0.3
        ? Math.sin((p.age / (this.maxAge * 0.3)) * (Math.PI / 2))
        : -(
            (1 - (p.age - this.maxAge * 0.3) / (this.maxAge * 0.7)) *
            ((1 - (p.age - this.maxAge * 0.3) / (this.maxAge * 0.7)) - 2)
          );
    const scaled = intensity * p.force;
    const color = `${((p.vx + 1) / 2) * 255}, ${((p.vy + 1) / 2) * 255}, ${scaled * 255}`;
    const radius = this.radius * this.width;

    this.ctx.shadowOffsetX = this.size * 5;
    this.ctx.shadowOffsetY = this.size * 5;
    this.ctx.shadowBlur = radius;
    this.ctx.shadowColor = `rgba(${color},${0.2 * scaled})`;
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(255,0,0,1)";
    this.ctx.arc(pos.x - this.size * 5, pos.y - this.size * 5, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

type FlowSceneManager = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  getViewSize: () => { width: number; height: number };
};

class FlowGradientPlane {
  mesh: THREE.Mesh | null = null;
  uniforms: Record<string, THREE.IUniform>;
  sceneManager: FlowSceneManager;
  isPaused = false;

  constructor(sceneManager: FlowSceneManager) {
    this.sceneManager = sceneManager;
    this.uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uColor1: { value: new THREE.Vector3(0.96, 0.9, 0.26) },
      uColor2: { value: new THREE.Vector3(0.39, 0.4, 0.95) },
      uColor3: { value: new THREE.Vector3(0.96, 0.9, 0.26) },
      uColor4: { value: new THREE.Vector3(0.39, 0.4, 0.95) },
      uColor5: { value: new THREE.Vector3(0.96, 0.9, 0.26) },
      uColor6: { value: new THREE.Vector3(0.39, 0.4, 0.95) },
      uSpeed: { value: 1.2 },
      uIntensity: { value: 1.8 },
      uTouchTexture: { value: null as THREE.Texture | null },
      uGrainIntensity: { value: 0.08 },
      uDarkNavy: { value: new THREE.Vector3(0.98, 0.98, 1.0) },
      uGradientSize: { value: 0.45 },
      uGradientCount: { value: 12.0 },
      uColor1Weight: { value: 0.5 },
      uColor2Weight: { value: 1.8 },
    };
  }

  init() {
    const viewSize = this.sceneManager.getViewSize();
    const geometry = new THREE.PlaneGeometry(
      viewSize.width,
      viewSize.height,
      1,
      1,
    );
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `varying vec2 vUv; void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); vUv = uv; }`,
      fragmentShader: `
        uniform float uTime, uSpeed, uIntensity, uGrainIntensity, uGradientSize, uGradientCount, uColor1Weight, uColor2Weight;
        uniform vec2 uResolution;
        uniform vec3 uColor1, uColor2, uColor3, uColor4, uColor5, uColor6, uDarkNavy;
        uniform sampler2D uTouchTexture;
        varying vec2 vUv;

        float grain(vec2 uv, float t) {
          return fract(sin(dot(uv * uResolution * 0.5 + t, vec2(12.9898, 78.233))) * 43758.5453) * 2.0 - 1.0;
        }

        vec3 getGradientColor(vec2 uv, float time) {
          vec2 c1 = vec2(0.5 + sin(time * uSpeed * 0.4) * 0.4, 0.5 + cos(time * uSpeed * 0.5) * 0.4);
          vec2 c2 = vec2(0.5 + cos(time * uSpeed * 0.6) * 0.5, 0.5 + sin(time * uSpeed * 0.45) * 0.5);
          vec2 c3 = vec2(0.5 + sin(time * uSpeed * 0.35) * 0.45, 0.5 + cos(time * uSpeed * 0.55) * 0.45);
          vec2 c4 = vec2(0.5 + cos(time * uSpeed * 0.5) * 0.4, 0.5 + sin(time * uSpeed * 0.4) * 0.4);
          vec2 c5 = vec2(0.5 + sin(time * uSpeed * 0.7) * 0.35, 0.5 + cos(time * uSpeed * 0.6) * 0.35);
          vec2 c6 = vec2(0.5 + cos(time * uSpeed * 0.45) * 0.5, 0.5 + sin(time * uSpeed * 0.65) * 0.5);

          float i1 = 1.0 - smoothstep(0.0, uGradientSize, length(uv - c1));
          float i2 = 1.0 - smoothstep(0.0, uGradientSize, length(uv - c2));
          float i3 = 1.0 - smoothstep(0.0, uGradientSize, length(uv - c3));
          float i4 = 1.0 - smoothstep(0.0, uGradientSize, length(uv - c4));
          float i5 = 1.0 - smoothstep(0.0, uGradientSize, length(uv - c5));
          float i6 = 1.0 - smoothstep(0.0, uGradientSize, length(uv - c6));

          vec3 color = vec3(0.0);
          color += uColor1 * i1 * (0.55 + 0.45 * sin(time * uSpeed)) * uColor1Weight;
          color += uColor2 * i2 * (0.55 + 0.45 * cos(time * uSpeed * 1.2)) * uColor2Weight;
          color += uColor3 * i3 * (0.55 + 0.45 * sin(time * uSpeed * 0.8)) * uColor1Weight;
          color += uColor4 * i4 * (0.55 + 0.45 * cos(time * uSpeed * 1.3)) * uColor2Weight;
          color += uColor5 * i5 * (0.55 + 0.45 * sin(time * uSpeed * 1.1)) * uColor1Weight;
          color += uColor6 * i6 * (0.55 + 0.45 * cos(time * uSpeed * 0.9)) * uColor2Weight;

          color = clamp(color, vec3(0.0), vec3(1.0)) * uIntensity;
          float lum = dot(color, vec3(0.299, 0.587, 0.114));
          color = mix(vec3(lum), color, 1.35);
          color = pow(color, vec3(0.92));
          float brightness = length(color);
          color = mix(uDarkNavy, color, max(brightness * 1.2, 0.15));
          return color;
        }

        void main() {
          vec2 uv = vUv;
          vec4 touchTex = texture2D(uTouchTexture, uv);
          uv.x -= (touchTex.r * 2.0 - 1.0) * 0.8 * touchTex.b;
          uv.y -= (touchTex.g * 2.0 - 1.0) * 0.8 * touchTex.b;
          vec2 center = vec2(0.5);
          float dist = length(uv - center);
          float ripple = sin(dist * 20.0 - uTime * 3.0) * 0.04 * touchTex.b;
          uv += vec2(ripple);
          vec3 color = getGradientColor(uv, uTime);
          color += grain(uv, uTime) * uGrainIntensity;
          color = clamp(color, vec3(0.0), vec3(1.0));
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.sceneManager.scene.add(this.mesh);
  }

  update(delta: number) {
    if (!this.isPaused) this.uniforms.uTime.value += delta;
  }

  onResize(w: number, h: number) {
    const viewSize = this.sceneManager.getViewSize();
    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.mesh.geometry = new THREE.PlaneGeometry(
        viewSize.width,
        viewSize.height,
        1,
        1,
      );
    }
    this.uniforms.uResolution.value.set(w, h);
  }
}

class FlowGradientApp {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  clock: THREE.Clock;
  touchTexture: TouchTexture;
  gradientPlane: FlowGradientPlane;
  animationId: number | null = null;
  isPaused = false;
  container: HTMLElement;
  private onMouseMove: (e: MouseEvent) => void;
  private onTouchMove: (e: TouchEvent) => void;
  private onResize: () => void;
  private _idleTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private _idleTickTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private _idleFps = false;

  constructor(container: HTMLElement) {
    this.container = container;
    const dpr =
      typeof window !== "undefined" && window.innerWidth < 768
        ? Math.min(window.devicePixelRatio || 1, 1.5)
        : Math.min(window.devicePixelRatio || 1, 2);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(dpr);
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      10000,
    );
    this.camera.position.z = 50;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf5f7ff);
    this.clock = new THREE.Clock();
    this.touchTexture = new TouchTexture();
    this.gradientPlane = new FlowGradientPlane(this);
    this.gradientPlane.uniforms.uTouchTexture.value = this.touchTexture.texture;

    const onMove = (x: number, y: number) => {
      this.touchTexture.addTouch({
        x: x / container.clientWidth,
        y: 1 - y / container.clientHeight,
      });
    };

    this.onMouseMove = (e) => onMove(e.offsetX, e.offsetY);
    this.onTouchMove = (e) => {
      const rect = container.getBoundingClientRect();
      onMove(
        e.touches[0].clientX - rect.left,
        e.touches[0].clientY - rect.top,
      );
    };
    this.onResize = () => {
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.gradientPlane.onResize(container.clientWidth, container.clientHeight);
    };

    this.init();
  }

  getViewSize() {
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(this.camera.position.z * Math.tan(fov / 2) * 2);
    return { width: height * this.camera.aspect, height };
  }

  setPaused(paused: boolean) {
    this.gradientPlane.isPaused = paused;
    if (paused !== this.isPaused) {
      this.isPaused = paused;
      if (paused) {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.animationId = null;
      } else {
        if (this._idleTickTimeoutId) { clearTimeout(this._idleTickTimeoutId); this._idleTickTimeoutId = undefined; }
        this.tick(); // restart loop
      }
    }
  }

  init() {
    this.gradientPlane.init();
    this.container.addEventListener("mousemove", this.onMouseMove);
    this.container.addEventListener("touchmove", this.onTouchMove);
    window.addEventListener("resize", this.onResize);
    window.addEventListener("pointermove", this._onActivity);
    window.addEventListener("scroll", this._onActivity, { passive: true });
    this._scheduleIdle();
    this.tick();
  }

  tick() {
    if (this.isPaused) return;
    const delta = Math.min(this.clock.getDelta(), 0.1);
    this.touchTexture.update();
    this.gradientPlane.update(delta);
    this.renderer.render(this.scene, this.camera);

    if (this._idleFps) {
      this.animationId = null;
      this._idleTickTimeoutId = setTimeout(() => {
        if (!this.isPaused && this._idleFps) this.tick();
      }, 100);
    } else {
      this.animationId = requestAnimationFrame(() => this.tick());
    }
  }

  private _onActivity = () => {
    if (this._idleFps) {
      this._idleFps = false;
      // If the loop stopped (was throttled), restart it
      if (!this.isPaused && !this.animationId) {
        if (this._idleTickTimeoutId) { clearTimeout(this._idleTickTimeoutId); this._idleTickTimeoutId = undefined; }
        this.tick();
      }
    }
    this._scheduleIdle();
  };

  private _scheduleIdle() {
    if (this._idleTimeoutId) clearTimeout(this._idleTimeoutId);
    this._idleTimeoutId = setTimeout(() => {
      this._idleFps = true;
    }, 30_000);
  }

  cleanup() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this._idleTimeoutId) clearTimeout(this._idleTimeoutId);
    if (this._idleTickTimeoutId) clearTimeout(this._idleTickTimeoutId);
    window.removeEventListener("pointermove", this._onActivity);
    window.removeEventListener("scroll", this._onActivity);
    this.container.removeEventListener("mousemove", this.onMouseMove);
    this.container.removeEventListener("touchmove", this.onTouchMove);
    window.removeEventListener("resize", this.onResize);
    this.renderer.dispose();
    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

export type FlowGradientHeroSectionProps = {
  title?: string;
  showPauseButton?: boolean;
  ctaText?: string;
  onCtaClick?: () => void;
  /** Site-wide background — no title, CTA, or chrome */
  backgroundOnly?: boolean;
  className?: string;
};

export function FlowGradientHeroSection({
  title = "Liquid Gradient",
  showPauseButton = true,
  ctaText = "Explore More",
  onCtaClick,
  backgroundOnly = false,
  className,
}: FlowGradientHeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<FlowGradientApp | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) setIsPlaying(false);

    appRef.current = new FlowGradientApp(container);

    return () => {
      appRef.current?.cleanup();
      appRef.current = null;
    };
  }, []);

  useEffect(() => {
    appRef.current?.setPaused(!isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    const syncVisibility = () => {
      const hidden = document.visibilityState === "hidden";
      appRef.current?.setPaused(hidden || !isPlaying);
    };

    document.addEventListener("visibilitychange", syncVisibility);
    syncVisibility();

    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, [isPlaying]);

  if (backgroundOnly) {
    return (
      <div
        aria-hidden
        className={cn(
          "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
          className,
        )}
      >
        <div ref={containerRef} className="absolute inset-0" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden",
        className,
      )}
    >
      <div ref={containerRef} className="absolute inset-0" />

      <h1 className="relative z-10 px-6 text-center font-display text-[clamp(2.5rem,8vw,5rem)] text-white">
        {title}
      </h1>

      <button
        type="button"
        className="press relative z-10 mt-8 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-ink"
        onClick={onCtaClick}
      >
        {ctaText}
      </button>

      {showPauseButton && (
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="press absolute right-6 bottom-6 z-10 flex size-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-ink"
          aria-label={isPlaying ? "Pause animation" : "Play animation"}
        >
          {isPlaying ? (
            <Pause className="size-5" aria-hidden />
          ) : (
            <Play className="size-5" aria-hidden />
          )}
        </button>
      )}
    </div>
  );
}

/** Fixed animated background for layout — replaces static CSS gradients */
export function FlowGradientBackground({
  className,
}: {
  className?: string;
}) {
  return <FlowGradientHeroSection backgroundOnly className={className} />;
}

export { FlowGradientHeroSection as Component };
export default FlowGradientHeroSection;
