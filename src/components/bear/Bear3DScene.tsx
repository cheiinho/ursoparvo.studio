"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";

type Bear3DSceneProps = {
  waveTick?: number;
  className?: string;
  onReady?: () => void;
  carouselVelocityRef?: RefObject<number>;
};

const CAROUSEL_MAX_YAW = 0.28;
const CAROUSEL_MAX_PITCH = 0.2;
const CAROUSEL_VELOCITY_SCALE = 4.2;
const CAROUSEL_MOMENTUM_GAIN = 0.52;
const CAROUSEL_MOMENTUM_FRICTION = 0.88;
const CAROUSEL_VELOCITY_SMOOTH = 0.28;
const GALLERY_BASE_PITCH = 0.22;
const GALLERY_BASE_HEAD_PITCH = 0.42;

const MOTION_LEAN_MAX_YAW = 0.3;
const MOTION_LEAN_MAX_PITCH = 0.16;

type HeroFrame = {
  fov: number;
  camY: number;
  camZ: number;
  lookY: number;
  scale: number;
};

/** Approximate model height at scale 1 (feet to ear tips). */
const BEAR_HEIGHT = 2.05;

function cameraDistance(
  fovDeg: number,
  objectHeight: number,
  viewportFill: number,
): number {
  const halfFov = (fovDeg * Math.PI) / 360;
  return objectHeight / (2 * Math.tan(halfFov) * viewportFill);
}

/** Fit the bear to any viewport from the canvas parent box (aspect + size). */
function computeHeroFrame(w: number, h: number): HeroFrame {
  const width = Math.max(w, 1);
  const height = Math.max(h, 1);
  const aspect = width / height;

  // Desktop / landscape: room for hello · there
  if (aspect >= 1.15) {
    const wide = Math.min(1, (aspect - 1.15) / 1.25);
    const fov = 33;
    const scale = 0.76 - wide * 0.05;
    const fill = 0.36 - wide * 0.05;
    return {
      fov,
      camY: 0.46,
      camZ: cameraDistance(fov, BEAR_HEIGHT * scale, fill) + 0.6,
      lookY: 0.2,
      scale,
    };
  }

  // Portrait: full bear visible, ~40% of stage height
  const fov = 36;
  const scale = 0.68;
  const fill = 0.3;
  return {
    fov,
    camY: 0.4,
    camZ: cameraDistance(fov, BEAR_HEIGHT * scale, fill),
    lookY: 0.18,
    scale,
  };
}

export default function Bear3DScene({
  waveTick = 0,
  className = "",
  onReady,
  carouselVelocityRef,
}: Bear3DSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wavePendingRef = useRef(false);
  const readyRef = useRef(false);
  const onReadyRef = useRef(onReady);
  const carouselVelocityRefRef = useRef(carouselVelocityRef);
  onReadyRef.current = onReady;
  carouselVelocityRefRef.current = carouselVelocityRef;

  useEffect(() => {
    if (waveTick > 0) wavePendingRef.current = true;
  }, [waveTick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const canUseMotion =
      coarsePointer &&
      !reduced &&
      typeof window !== "undefined" &&
      "DeviceOrientationEvent" in window;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, coarsePointer ? 1.5 : 2),
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = false;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100);

    // ---------- Studio environment (procedural softbox PMREM) ----------
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();

    function buildEnv() {
      const c = document.createElement("canvas");
      c.width = 1024;
      c.height = 512;
      const g = c.getContext("2d")!;
      const grd = g.createLinearGradient(0, 0, 0, 512);
      grd.addColorStop(0, "#ffffff");
      grd.addColorStop(0.55, "#fafafa");
      grd.addColorStop(1, "#f0f0f0");
      g.fillStyle = grd;
      g.fillRect(0, 0, 1024, 512);
      const blob = (x: number, y: number, r: number, a: number) => {
        const rg = g.createRadialGradient(x, y, 0, x, y, r);
        rg.addColorStop(0, `rgba(255,255,255,${a})`);
        rg.addColorStop(1, "rgba(255,255,255,0)");
        g.fillStyle = rg;
        g.beginPath();
        g.arc(x, y, r, 0, Math.PI * 2);
        g.fill();
      };
      blob(720, 150, 260, 1.0);
      blob(220, 220, 200, 0.6);
      blob(512, 40, 400, 0.45);
      const tex = new THREE.CanvasTexture(c);
      tex.mapping = THREE.EquirectangularReflectionMapping;
      tex.colorSpace = THREE.SRGBColorSpace;
      const rt = pmrem.fromEquirectangular(tex);
      tex.dispose();
      return rt;
    }

    const envRT = buildEnv();
    scene.environment = envRT.texture;

    // ---------- Lighting ----------
    const hemi = new THREE.HemisphereLight(0xffffff, 0xbfbdb4, 0.4);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(3.4, 6.0, 4.2);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 0.6);
    rim.position.set(-2, 3, -4.5);
    scene.add(rim);

    // ---------- Velvet: micro-fuzz normal map (value-noise -> Sobel) ----------
    function velvetNormal(size: number) {
      const noiseCanvas = (res: number) => {
        const nc = document.createElement("canvas");
        nc.width = nc.height = res;
        const ng = nc.getContext("2d")!;
        const im = ng.createImageData(res, res);
        const d = im.data;
        for (let i = 0; i < res * res; i++) {
          const v = Math.random() * 255;
          d[i * 4] = d[i * 4 + 1] = d[i * 4 + 2] = v;
          d[i * 4 + 3] = 255;
        }
        ng.putImageData(im, 0, 0);
        return nc;
      };
      const hc = document.createElement("canvas");
      hc.width = hc.height = size;
      const hg = hc.getContext("2d")!;
      hg.imageSmoothingEnabled = true;
      hg.drawImage(noiseCanvas(Math.max(8, size >> 2)), 0, 0, size, size);
      hg.globalAlpha = 0.5;
      hg.drawImage(noiseCanvas(Math.max(16, size >> 1)), 0, 0, size, size);
      hg.globalAlpha = 1;
      const h = hg.getImageData(0, 0, size, size).data;
      const nc = document.createElement("canvas");
      nc.width = nc.height = size;
      const ng = nc.getContext("2d")!;
      const nim = ng.createImageData(size, size);
      const nd = nim.data;
      const H = (x: number, y: number) => {
        x = (x + size) % size;
        y = (y + size) % size;
        return h[(y * size + x) * 4] / 255;
      };
      const st = 2.2;
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const dx = (H(x - 1, y) - H(x + 1, y)) * st;
          const dy = (H(x, y - 1) - H(x, y + 1)) * st;
          const nz = 1.0;
          const len = Math.sqrt(dx * dx + dy * dy + nz * nz);
          const k = (y * size + x) * 4;
          nd[k] = ((dx / len) * 0.5 + 0.5) * 255;
          nd[k + 1] = ((dy / len) * 0.5 + 0.5) * 255;
          nd[k + 2] = ((nz / len) * 0.5 + 0.5) * 255;
          nd[k + 3] = 255;
        }
      }
      ng.putImageData(nim, 0, 0);
      const tex = new THREE.CanvasTexture(nc);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(5, 5);
      return tex;
    }
    const fuzz = velvetNormal(256);

    // ---------- Velvet sheen: grazing-angle retroreflection (shader inject) ----------
    function addVelvet(
      mat: THREE.MeshPhysicalMaterial,
      sheenHex: number,
      intensity: number,
      power: number,
    ) {
      const col = new THREE.Color(sheenHex).convertSRGBToLinear();
      mat.onBeforeCompile = (shader) => {
        const inject = [
          "float _nv = 1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0);",
          `float _sheen = pow(_nv, ${power.toFixed(2)});`,
          `outgoingLight += vec3(${col.r.toFixed(4)},${col.g.toFixed(4)},${col.b.toFixed(4)}) * _sheen * ${intensity.toFixed(3)};`,
        ].join("\n");
        // three >= r154 renamed <output_fragment> to <opaque_fragment>.
        const token = shader.fragmentShader.includes("#include <opaque_fragment>")
          ? "#include <opaque_fragment>"
          : "#include <output_fragment>";
        shader.fragmentShader = shader.fragmentShader.replace(
          token,
          `${inject}\n${token}`,
        );
      };
      mat.customProgramCacheKey = () =>
        `velvet_${sheenHex}_${intensity}_${power}`;
      return mat;
    }

    // ---------- Materials ----------
    const physical = (
      color: number,
      opts?: THREE.MeshPhysicalMaterialParameters,
    ) =>
      new THREE.MeshPhysicalMaterial(
        Object.assign(
          { color, roughness: 0.5, metalness: 0.0, clearcoat: 0.0, envMapIntensity: 0.6 },
          opts || {},
        ),
      );

    const matYellow = addVelvet(
      physical(0xf2dc34, {
        roughness: 0.86,
        normalMap: fuzz,
        normalScale: new THREE.Vector2(0.28, 0.28),
      }),
      0xfff2a8,
      0.6,
      2.6,
    );
    const matPad = addVelvet(
      physical(0xf4e79a, {
        roughness: 0.9,
        normalMap: fuzz,
        normalScale: new THREE.Vector2(0.24, 0.24),
      }),
      0xfff7d2,
      0.5,
      2.4,
    );
    const matEarIn = addVelvet(
      physical(0xe6cd2a, {
        roughness: 0.9,
        normalMap: fuzz,
        normalScale: new THREE.Vector2(0.3, 0.3),
        emissive: 0xffcf6a,
        emissiveIntensity: 0.14,
      }),
      0xfff0a0,
      0.55,
      2.6,
    );
    const matEarShell = addVelvet(
      physical(0xeed02e, {
        roughness: 0.82,
        normalMap: fuzz,
        normalScale: new THREE.Vector2(0.28, 0.28),
      }),
      0xffd98a,
      1.15,
      1.7,
    );
    const matDark = physical(0x141414, {
      roughness: 0.26,
      clearcoat: 0.7,
      clearcoatRoughness: 0.16,
      envMapIntensity: 1.0,
    });
    const matGlint = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const allMaterials: THREE.Material[] = [
      matYellow,
      matPad,
      matEarIn,
      matEarShell,
      matDark,
      matGlint,
    ];

    const BALL = new THREE.SphereGeometry(1, 64, 48);
    const extraGeometries: THREE.BufferGeometry[] = [];
    const part = (
      mat: THREE.Material,
      sx: number,
      sy: number,
      sz: number,
      x: number,
      y: number,
      z: number,
      noShadow = false,
    ) => {
      const m = new THREE.Mesh(BALL, mat);
      m.scale.set(sx, sy, sz);
      m.position.set(x, y, z);
      m.castShadow = false;
      m.receiveShadow = false;
      return m;
    };

    // ---------- Build ----------
    const pivot = new THREE.Group();
    const bear = new THREE.Group();
    pivot.add(bear);
    scene.add(pivot);

    const bodyG = new THREE.Group();
    bear.add(bodyG);
    bodyG.add(part(matYellow, 1.0, 1.12, 0.92, 0, -0.55, 0));
    bodyG.add(part(matPad, 0.6, 0.72, 0.5, 0, -0.55, 0.6));
    bodyG.add(part(matYellow, 0.72, 0.52, 0.62, 0, 0.2, 0));

    const leg = (side: number) => {
      const g = new THREE.Group();
      g.add(part(matYellow, 0.42, 0.32, 0.5, side * 0.44, -1.4, 0.16));
      g.add(part(matPad, 0.22, 0.15, 0.12, side * 0.44, -1.46, 0.6));
      return g;
    };
    bodyG.add(leg(-1), leg(1));

    type ArmGroup = THREE.Group & { userData: { base: THREE.Euler } };
    const arm = (side: number, fwd: number): ArmGroup => {
      const g = new THREE.Group() as ArmGroup;
      g.position.set(side * 0.66, -0.1, 0.28 + fwd);
      g.add(part(matYellow, 0.26, 0.46, 0.28, 0, 0, 0));
      g.add(part(matPad, 0.18, 0.16, 0.14, -side * 0.16, -0.4, 0.16));
      g.userData.base = new THREE.Euler(-0.2, 0, side * 0.95);
      g.rotation.copy(g.userData.base);
      return g;
    };
    const armL = arm(-1, 0.0);
    const armR = arm(1, 0.06);
    bodyG.add(armL, armR);

    const headG = new THREE.Group();
    headG.position.set(0, 0.9, 0);
    bear.add(headG);
    headG.add(part(matYellow, 1.06, 1.0, 0.98, 0, 0, 0));
    headG.add(part(matPad, 0.5, 0.4, 0.42, 0, -0.26, 0.74));
    headG.add(part(matDark, 0.17, 0.13, 0.12, 0, -0.14, 1.12, true));

    type EarGroup = THREE.Group & { userData: { flop: number; fvel: number } };
    const ear = (side: number): EarGroup => {
      const g = new THREE.Group() as EarGroup;
      g.position.set(side * 0.72, 0.84, -0.03);
      g.add(part(matEarShell, 0.44, 0.46, 0.34, 0, 0, 0));
      g.add(part(matEarIn, 0.23, 0.25, 0.2, 0, 0, 0.2));
      g.userData.flop = 0;
      g.userData.fvel = 0;
      return g;
    };
    const earL = ear(-1);
    const earR = ear(1);
    headG.add(earL, earR);

    const eye = (side: number) => {
      const g = new THREE.Group();
      g.position.set(side * 0.4, 0.16, 0.8);
      g.add(part(matDark, 0.15, 0.22, 0.12, 0, 0, 0, true));
      g.add(part(matGlint, 0.04, 0.05, 0.03, -side * 0.045, 0.08, 0.1, true));
      g.rotation.z = side * 0.3;
      return g;
    };
    const eyeL = eye(-1);
    const eyeR = eye(1);
    headG.add(eyeL, eyeR);
    const eyeBaseL = eyeL.position.clone();
    const eyeBaseR = eyeR.position.clone();

    bear.position.y = 0.32;

    // ---------- Spring helper (secondary motion) ----------
    type Spring = { x: number; v: number };
    const springStep = (
      o: Spring | { flop: number; fvel: number },
      kx: "x" | "flop",
      kv: "v" | "fvel",
      target: number,
      k: number,
      d: number,
      dt: number,
    ) => {
      const obj = o as Record<string, number>;
      const f = (target - obj[kx]) * k - obj[kv] * d;
      obj[kv] += f * dt;
      obj[kx] += obj[kv] * dt;
    };

    // ---------- Interaction ----------
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let velY = 0;
    let lastInteract = performance.now();
    let lastMove = 0;
    const ptr = { x: 0, y: 0 };
    const motion = {
      gamma: 0,
      beta: 48,
      prevGamma: 0,
      enabled: false,
      listening: false,
      lastEvent: 0,
      lastMag: 9.8,
    };
    let motionLeanYaw = 0;
    let motionLeanPitch = 0;
    let motionLeanRoll = 0;
    let downT = 0;
    let moved = 0;

    let waving = 0;
    let jumpY = 0;
    let jumpV = 0;
    let onGround = true;
    const squash: Spring = { x: 0, v: 0 };
    const armB: Spring = { x: 0, v: 0 };
    let dizzy = 0;
    const triggerJump = () => {
      if (onGround) {
        jumpV = 5.2;
        onGround = false;
        squash.v += 14;
        lastInteract = performance.now();
      }
    };

    const ptOf = (e: PointerEvent) => ({ x: e.clientX, y: e.clientY });

    const mapOrientationToPtr = (gamma: number, beta: number) => {
      ptr.x = Math.max(-1, Math.min(1, gamma / 36));
      ptr.y = Math.max(-1, Math.min(1, (beta - 48) / 36));
      lastMove = performance.now();
    };

    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      const dg = e.gamma - motion.gamma;
      motion.prevGamma = motion.gamma;
      motion.gamma = e.gamma;
      motion.beta = e.beta;
      motion.lastEvent = performance.now();
      motion.enabled = true;
      mapOrientationToPtr(e.gamma, e.beta);

      if (Math.abs(dg) > 2) {
        waving = Math.min(1, waving + 0.28 + Math.abs(dg) * 0.04);
        lastInteract = performance.now();
      }
    };

    const onDeviceMotion = (e: DeviceMotionEvent) => {
      const linear = e.acceleration;
      const gravity = e.accelerationIncludingGravity;
      const src =
        linear && linear.x != null
          ? linear
          : gravity && gravity.x != null
            ? gravity
            : null;
      if (!src || src.x == null || src.y == null || src.z == null) return;

      const mag = Math.sqrt(src.x * src.x + src.y * src.y + src.z * src.z);
      const jerk = Math.abs(mag - motion.lastMag);
      motion.lastMag = mag;
      motion.lastEvent = performance.now();
      motion.enabled = true;

      if (jerk > 2.4) {
        waving = 1;
        lastInteract = performance.now();
      } else if (jerk > 1.1) {
        waving = Math.max(waving, 0.55);
        lastInteract = performance.now();
      }
    };

    const attachMotionListeners = () => {
      if (motion.listening) return;
      window.addEventListener("deviceorientation", onOrientation);
      window.addEventListener("devicemotion", onDeviceMotion, { passive: true });
      motion.listening = true;
      motion.enabled = true;
    };

    const enableMotionSensors = async () => {
      if (!canUseMotion || motion.listening) return;

      try {
        const orientationCtor = DeviceOrientationEvent as unknown as {
          requestPermission?: () => Promise<PermissionState>;
        };
        if (typeof orientationCtor.requestPermission === "function") {
          const state = await orientationCtor.requestPermission();
          if (state !== "granted") return;
        }

        const motionCtor = DeviceMotionEvent as unknown as {
          requestPermission?: () => Promise<PermissionState>;
        };
        if (typeof motionCtor.requestPermission === "function") {
          const state = await motionCtor.requestPermission();
          if (state !== "granted") return;
        }

        attachMotionListeners();
      } catch {
        // Permission denied or unavailable.
      }
    };

    if (canUseMotion) {
      const orientationCtor = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<PermissionState>;
      };
      if (typeof orientationCtor.requestPermission !== "function") {
        attachMotionListeners();
      }
    }

    const onDown = (e: PointerEvent) => {
      dragging = true;
      const p = ptOf(e);
      lastX = p.x;
      lastY = p.y;
      downT = performance.now();
      moved = 0;
      velY = 0;
      lastInteract = performance.now();
      if (canUseMotion && !motion.listening) void enableMotionSensors();
    };
    const onMove = (e: PointerEvent) => {
      const p = ptOf(e);
      ptr.x = (p.x / window.innerWidth) * 2 - 1;
      ptr.y = (p.y / window.innerHeight) * 2 - 1;
      lastMove = performance.now();
      if (dragging) {
        const dx = p.x - lastX;
        const dy = p.y - lastY;
        lastX = p.x;
        lastY = p.y;
        moved += Math.abs(dx) + Math.abs(dy);
        targetRotY += dx * 0.01;
        targetRotX += dy * 0.006;
        targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX));
        velY = dx * 0.01;
        lastInteract = performance.now();
      }
    };
    const onUp = () => {
      if (dragging) {
        const d = performance.now() - downT;
        if (moved < 7 && d < 320) {
          triggerJump();
        } else if (Math.abs(velY) > 0.11) {
          dizzy = Math.min(2.0, dizzy + 0.9 + Math.abs(velY) * 3.0);
        }
      }
      dragging = false;
    };

    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    const resize = () => {
      const parent = canvas.parentElement ?? canvas;
      let w = parent.clientWidth;
      let h = parent.clientHeight;
      if (w < 1) w = window.innerWidth;
      if (h < 1) h = Math.round(window.innerHeight * 0.52);
      renderer.setSize(w, h, false);
      const frame = computeHeroFrame(w, h);
      camera.fov = frame.fov;
      camera.position.set(0, frame.camY, frame.camZ);
      camera.lookAt(0, frame.lookY, 0);
      bear.scale.setScalar(frame.scale);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(() => requestAnimationFrame(resize));
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener("resize", resize);
    resize();

    // ---------- Idle state machine ----------
    type IdleState = "none" | "look" | "headshake" | "sigh" | "earflick";
    let idleState: IdleState = "none";
    let idleStart = 0;
    let idleDur = 0;
    let idleLook = 0;
    let idleAt = performance.now() + 3000 + Math.random() * 3000;
    const pickIdle = () => {
      const r = Math.random();
      if (r < 0.34) {
        idleState = "look";
        idleLook = (Math.random() * 2 - 1) * 0.42;
        idleDur = 1.7;
      } else if (r < 0.6) {
        idleState = "headshake";
        idleDur = 1.0;
      } else if (r < 0.82) {
        idleState = "sigh";
        idleDur = 1.6;
      } else {
        idleState = "earflick";
        idleDur = 0.7;
        earL.userData.fvel += Math.random() < 0.5 ? 6 : -6;
      }
      idleStart = performance.now();
    };

    // ---------- Carousel-driven lean (homepage integration) ----------
    let carouselYaw = 0;
    let carouselPitch = 0;
    let carouselRoll = 0;
    let carouselMomentum = 0;
    let carouselVelocitySmooth = 0;

    // ---------- Loop ----------
    const clock = new THREE.Clock();
    let blinkTimer = 2.5;
    let blinking = 0;
    let prevY = 0.32;
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      const now = performance.now();

      // spin
      const idle = now - lastInteract > 2800;
      if (!dragging) {
        targetRotY += velY;
        velY *= 0.94;
      }
      const prevPivotY = pivot.rotation.y;
      pivot.rotation.y += (targetRotY - pivot.rotation.y) * 0.12;
      pivot.rotation.x += (targetRotX - pivot.rotation.x) * 0.12;
      const spinVel = pivot.rotation.y - prevPivotY;

      // carousel lean (homepage gallery integration)
      const galleryMode = Boolean(carouselVelocityRefRef.current);
      const carouselVelocity =
        !reduced && galleryMode
          ? carouselVelocityRefRef.current!.current
          : 0;
      carouselVelocitySmooth +=
        (carouselVelocity - carouselVelocitySmooth) * CAROUSEL_VELOCITY_SMOOTH;
      const carouselActive = Math.abs(carouselVelocitySmooth) > 0.00035;
      if (carouselActive) {
        carouselMomentum += carouselVelocitySmooth * CAROUSEL_MOMENTUM_GAIN;
      } else {
        carouselMomentum *= CAROUSEL_MOMENTUM_FRICTION;
      }
      carouselMomentum = Math.max(
        -CAROUSEL_MAX_YAW / CAROUSEL_VELOCITY_SCALE,
        Math.min(CAROUSEL_MAX_YAW / CAROUSEL_VELOCITY_SCALE, carouselMomentum),
      );
      const intent = carouselMomentum * CAROUSEL_VELOCITY_SCALE;
      const targetCarouselYaw = Math.max(
        -CAROUSEL_MAX_YAW,
        Math.min(CAROUSEL_MAX_YAW, intent),
      );
      const leanAmount = Math.min(1, Math.abs(intent) / CAROUSEL_MAX_YAW);
      const targetCarouselPitch =
        (galleryMode ? GALLERY_BASE_PITCH : 0) + leanAmount * CAROUSEL_MAX_PITCH;
      const targetCarouselRoll = -targetCarouselYaw * 0.28;
      const yawSpring = carouselActive ? 0.13 : 0.055;
      const pitchSpring = carouselActive ? 0.18 : 0.07;
      const rollSpring = carouselActive ? 0.11 : 0.05;
      carouselYaw += (targetCarouselYaw - carouselYaw) * yawSpring;
      carouselPitch += (targetCarouselPitch - carouselPitch) * pitchSpring;
      carouselRoll += (targetCarouselRoll - carouselRoll) * rollSpring;

      const motionLive =
        canUseMotion &&
        motion.enabled &&
        !reduced &&
        now - motion.lastEvent < 1400;

      if (galleryMode && !reduced) {
        bear.rotation.y = carouselYaw;
        bear.rotation.x = carouselPitch;
        bear.rotation.z = carouselRoll;
      } else if (motionLive) {
        const targetMY = Math.max(
          -MOTION_LEAN_MAX_YAW,
          Math.min(MOTION_LEAN_MAX_YAW, (motion.gamma / 52) * MOTION_LEAN_MAX_YAW),
        );
        const targetMP = Math.max(
          -MOTION_LEAN_MAX_PITCH,
          Math.min(
            MOTION_LEAN_MAX_PITCH,
            ((motion.beta - 48) / 52) * MOTION_LEAN_MAX_PITCH,
          ),
        );
        const targetMR = -targetMY * 0.22;
        motionLeanYaw += (targetMY - motionLeanYaw) * 0.11;
        motionLeanPitch += (targetMP - motionLeanPitch) * 0.11;
        motionLeanRoll += (targetMR - motionLeanRoll) * 0.09;
        bear.rotation.y = motionLeanYaw;
        bear.rotation.x = motionLeanPitch;
        bear.rotation.z = motionLeanRoll;
      } else {
        motionLeanYaw *= 0.9;
        motionLeanPitch *= 0.9;
        motionLeanRoll *= 0.9;
        bear.rotation.y = motionLeanYaw;
        bear.rotation.x = motionLeanPitch;
        bear.rotation.z = motionLeanRoll;
      }

      // jump physics
      if (!onGround) {
        jumpV -= 16 * dt;
        jumpY += jumpV * dt;
        if (jumpY <= 0) {
          jumpY = 0;
          if (jumpV < -1.2) {
            squash.v -= 18;
            jumpV = -jumpV * 0.34;
          } else {
            jumpV = 0;
            onGround = true;
          }
        }
      }

      // dizzy decay + idle state machine
      if (dizzy > 0) dizzy = Math.max(0, dizzy - dt * 0.9);
      const busy = dragging || waving > 0 || dizzy > 0 || !onGround;
      if (!busy && now - lastInteract > 3000) {
        if (idleState === "none" && now > idleAt) pickIdle();
      } else if (idleState !== "none") {
        idleState = "none";
        idleAt = now + 2500 + Math.random() * 3000;
      }
      let idleEnv = 0;
      let idleElapsed = 0;
      if (idleState !== "none") {
        idleElapsed = (now - idleStart) / 1000;
        idleEnv = Math.sin(Math.PI * Math.min(idleElapsed / idleDur, 1));
        if (idleElapsed >= idleDur) {
          idleState = "none";
          idleAt = now + 2600 + Math.random() * 3200;
        }
      }

      // glance: follow pointer or phone tilt, else idle look
      const motionTracking =
        canUseMotion && motion.enabled && now - motion.lastEvent < 1400;
      const pointerActive = motionTracking || now - lastMove < 2500;
      let glY = pointerActive
        ? -ptr.x * 0.32 - pivot.rotation.y
        : idleState === "look"
          ? idleLook * idleEnv
          : 0;
      const glX = pointerActive
        ? ptr.y * 0.22
        : galleryMode
          ? GALLERY_BASE_HEAD_PITCH + leanAmount * 0.08
          : 0;
      glY = Math.max(-0.5, Math.min(0.5, glY));
      const swayZ = reduced ? 0 : Math.sin(t * 0.8) * 0.035;
      headG.rotation.y += (glY - headG.rotation.y) * 0.08;
      headG.rotation.x += (glX - headG.rotation.x) * 0.08;
      headG.rotation.z = swayZ;
      if (idleState === "headshake")
        headG.rotation.y += Math.sin(idleElapsed * 18) * 0.13 * idleEnv;

      // breathing + sigh + body height (bob + jump)
      const breath = reduced ? 0 : Math.sin(t * 1.5) * 0.016;
      const sighBoost = idleState === "sigh" ? idleEnv * 0.05 : 0;
      const sink = idleState === "sigh" ? idleEnv * 0.05 : 0;
      const curY =
        0.32 + (reduced ? 0 : Math.sin(t * 1.5) * 0.03) - sink + jumpY * 0.42;
      bear.position.y = curY;
      headG.position.y = 0.9 + (reduced ? 0 : Math.sin(t * 1.5) * 0.018);

      // squash & stretch (volume-preserving-ish)
      springStep(squash, "x", "v", 0, 160, 13, dt);
      const sy = 1 + squash.x * 0.12 + breath + sighBoost;
      const sxz = 1 - squash.x * 0.06;
      bodyG.scale.set(sxz, sy, sxz);

      // ears: idle wiggle + secondary-motion flop from vertical & spin velocity
      const vy = (curY - prevY) / Math.max(dt, 0.001);
      prevY = curY;
      const flopTarget = -vy * 0.35;
      springStep(earL.userData, "flop", "fvel", flopTarget, 90, 9, dt);
      springStep(earR.userData, "flop", "fvel", flopTarget, 90, 9, dt);
      const eW = reduced ? 0 : Math.sin(t * 2.2) * 0.05;
      earL.rotation.x = earL.userData.flop;
      earR.rotation.x = earR.userData.flop;
      earL.rotation.z =
        eW - spinVel * 1.2 + (idleState === "sigh" ? idleEnv * 0.18 : 0);
      earR.rotation.z =
        -eW - spinVel * 1.2 + (idleState === "sigh" ? idleEnv * 0.18 : 0);

      // arms: settle to base + bounce on vertical velocity + wave
      springStep(armB, "x", "v", -vy * 0.4, 80, 10, dt);
      [armL, armR].forEach((a, i) => {
        const b = a.userData.base;
        a.rotation.x +=
          (b.x + armB.x * 0.5 + (reduced ? 0 : Math.sin(t * 1.2 + i) * 0.03) -
            a.rotation.x) *
          0.1;
        a.rotation.z += (b.z - a.rotation.z) * 0.1;
        a.rotation.y += (0 - a.rotation.y) * 0.1;
      });

      if (wavePendingRef.current) {
        waving = 1;
        wavePendingRef.current = false;
        lastInteract = performance.now();
      }
      if (
        canUseMotion &&
        motion.enabled &&
        !reduced &&
        now - motion.lastEvent < 1400 &&
        Math.abs(motion.gamma - motion.prevGamma) > 0.6
      ) {
        waving = Math.max(
          waving,
          Math.min(1, 0.5 + Math.abs(motion.gamma - motion.prevGamma) * 0.06),
        );
      }
      if (waving > 0) {
        waving = Math.max(0, waving - dt * 0.5);
        const s = waving;
        armR.rotation.z = armR.userData.base.z * (1 - s) + -2.4 * s;
        armR.rotation.x = armR.userData.base.x * (1 - s) + -0.5 * s;
        armR.rotation.y = Math.sin(t * 15) * 0.55 * s;
        headG.rotation.z += Math.sin(t * 15) * 0.05 * s;
      }

      // dizzy: googly eyes + head wobble
      if (dizzy > 0) {
        const dz = Math.min(1, dizzy);
        eyeL.position.set(
          eyeBaseL.x + Math.cos(t * 16) * 0.05 * dz,
          eyeBaseL.y + Math.sin(t * 16) * 0.05 * dz,
          eyeBaseL.z,
        );
        eyeR.position.set(
          eyeBaseR.x + Math.cos(t * 16 + 1.1) * 0.05 * dz,
          eyeBaseR.y + Math.sin(t * 16 + 1.1) * 0.05 * dz,
          eyeBaseR.z,
        );
        headG.rotation.z += Math.sin(t * 20) * 0.09 * dz;
        headG.rotation.x += Math.sin(t * 15) * 0.05 * dz;
      } else {
        eyeL.position.copy(eyeBaseL);
        eyeR.position.copy(eyeBaseR);
      }

      // blink (suppressed while dizzy so the googly reads)
      blinkTimer -= dt;
      if (blinkTimer <= 0 && blinking === 0 && dizzy <= 0) {
        blinking = 0.0001;
        blinkTimer = 3.4 + Math.random() * 2.5;
      }
      if (blinking > 0) {
        blinking += dt * 9;
        const bk = Math.sin(Math.min(blinking, Math.PI));
        const open = 1 - bk;
        eyeL.scale.y = Math.max(0.08, open);
        eyeR.scale.y = Math.max(0.08, open);
        if (blinking >= Math.PI) {
          blinking = 0;
          eyeL.scale.y = 1;
          eyeR.scale.y = 1;
        }
      }

      renderer.render(scene, camera);

      if (!readyRef.current) {
        readyRef.current = true;
        onReadyRef.current?.();
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("deviceorientation", onOrientation);
      window.removeEventListener("devicemotion", onDeviceMotion);
      window.removeEventListener("resize", resize);
      ro.disconnect();
      BALL.dispose();
      fuzz.dispose();
      allMaterials.forEach((m) => m.dispose());
      envRT.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block h-full w-full cursor-grab touch-none active:cursor-grabbing ${className}`}
      aria-label="Urso Parvo 3D. Drag to rotate. On mobile, tilt or move your phone to wave."
    />
  );
}
