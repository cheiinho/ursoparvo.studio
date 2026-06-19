"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import {
  addPartWithOutline,
  createBrandMaterials,
  disposeBrandMaterials,
} from "@/lib/bear3d/brandMaterials";
import {
  addInkMesh,
  createLogoFaceGeometries,
  disposeLogoFaceGeometries,
  getLogoFaceAnchors,
} from "@/lib/bear3d/faceShapes";

export type Bear3DVariant = "hero" | "full";

type Bear3DSceneProps = {
  waveTick?: number;
  variant?: Bear3DVariant;
  className?: string;
  onReady?: () => void;
  carouselVelocityRef?: RefObject<number>;
};

const CAROUSEL_MAX_YAW = 0.22;
const CAROUSEL_MAX_PITCH = 0.16;
const CAROUSEL_VELOCITY_SCALE = 3.4;
const CAROUSEL_MOMENTUM_GAIN = 0.42;
const CAROUSEL_MOMENTUM_FRICTION = 0.9;
const CAROUSEL_VELOCITY_SMOOTH = 0.22;

const VARIANTS = {
  hero: {
    fov: 36,
    camera: [0, 0.38, 9.2] as const,
    lookAt: [0, 0.26, 0] as const,
    bearY: 0.26,
    bearScale: 0.8,
    autoRotate: 0,
    outlineScale: 1.04,
    editorial: true,
  },
  full: {
    fov: 34,
    camera: [0, 0.45, 7.2] as const,
    lookAt: [0, 0.15, 0] as const,
    bearY: 0.35,
    bearScale: 1,
    autoRotate: 0.0032,
    outlineScale: 1.06,
    editorial: false,
  },
} as const;

export default function Bear3DScene({
  waveTick = 0,
  variant = "hero",
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

    const config = VARIANTS[variant];
    const isEditorial = config.editorial;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    const isMobile = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.shadowMap.enabled = !isEditorial;
    if (!isEditorial) {
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(config.fov, 1, 0.1, 100);
    camera.position.set(config.camera[0], config.camera[1], config.camera[2]);
    camera.lookAt(config.lookAt[0], config.lookAt[1], config.lookAt[2]);

    if (isEditorial) {
      scene.add(new THREE.HemisphereLight(0xffffff, 0xe8ecff, 1.05));

      const key = new THREE.DirectionalLight(0xffffff, 0.62);
      key.position.set(2.2, 5.5, 4.5);
      scene.add(key);

      const fill = new THREE.DirectionalLight(0xfff5b0, 0.32);
      fill.position.set(-3.5, 1.2, 3);
      scene.add(fill);

      const rim = new THREE.DirectionalLight(0x6366f1, 0.4);
      rim.position.set(0.4, 2, -5);
      scene.add(rim);
    } else {
      scene.add(new THREE.HemisphereLight(0xffffff, 0xf5f2ea, 1.12));

      const key = new THREE.DirectionalLight(0xffffff, 0.95);
      key.position.set(2.8, 6, 4.8);
      key.castShadow = true;
      key.shadow.mapSize.set(2048, 2048);
      key.shadow.camera.near = 1;
      key.shadow.camera.far = 20;
      key.shadow.camera.left = -6;
      key.shadow.camera.right = 6;
      key.shadow.camera.top = 6;
      key.shadow.camera.bottom = -6;
      key.shadow.radius = 4;
      key.shadow.bias = -0.0004;
      scene.add(key);

      const fill = new THREE.DirectionalLight(0xfff8d0, 0.58);
      fill.position.set(-4.5, 1.4, 3);
      scene.add(fill);

      const rim = new THREE.DirectionalLight(0xffffff, 0.28);
      rim.position.set(-0.5, 2.5, -4.5);
      scene.add(rim);
    }

    const brand = createBrandMaterials({
      style: isEditorial ? "editorial" : "expressive",
    });
    const { yellow, muzzle, earIn, ink, outline } = brand;

    const ball = new THREE.SphereGeometry(1, 48, 36);
    const disposables: THREE.BufferGeometry[] = [ball];
    const shadowMat = isEditorial
      ? null
      : new THREE.ShadowMaterial({ opacity: 0.08 });

    const partShadows = {
      castShadow: !isEditorial,
      receiveShadow: !isEditorial,
    };

    function part(
      mat: THREE.Material,
      sx: number,
      sy: number,
      sz: number,
      x: number,
      y: number,
      z: number,
      parent: THREE.Object3D,
      withOutline = false,
    ) {
      if (withOutline) {
        return addPartWithOutline(
          ball,
          mat,
          outline,
          sx,
          sy,
          sz,
          x,
          y,
          z,
          parent,
          config.outlineScale,
          partShadows,
        );
      }
      const mesh = new THREE.Mesh(ball, mat);
      mesh.scale.set(sx, sy, sz);
      mesh.position.set(x, y, z);
      mesh.castShadow = partShadows.castShadow;
      mesh.receiveShadow = partShadows.receiveShadow;
      parent.add(mesh);
      return mesh;
    }

    const pivot = new THREE.Group();
    const bear = new THREE.Group();
    pivot.add(bear);
    scene.add(pivot);
    bear.scale.setScalar(config.bearScale);

    const bodyG = new THREE.Group();
    bear.add(bodyG);

    bodyG.add(part(yellow, 0.9, 0.94, 0.76, 0, -0.68, 0, bodyG, true));
    bodyG.add(part(muzzle, 0.56, 0.58, 0.38, 0, -0.64, 0.52, bodyG, true));

    function leg(side: number) {
      const g = new THREE.Group();
      part(yellow, 0.34, 0.28, 0.38, side * 0.4, -1.38, 0.12, g, true);
      part(muzzle, 0.18, 0.13, 0.1, side * 0.4, -1.46, 0.52, g, true);
      return g;
    }
    bodyG.add(leg(-1), leg(1));

    function arm(side: number) {
      const g = new THREE.Group();
      g.position.set(side * 0.64, -0.24, 0.3);
      part(yellow, 0.28, 0.46, 0.28, 0, 0, 0, g, true);
      part(muzzle, 0.18, 0.16, 0.14, -side * 0.14, -0.38, 0.32, g, true);
      g.rotation.z = side * 0.72;
      g.rotation.x = -0.32;
      return g;
    }
    const armL = arm(-1);
    const armR = arm(1);
    bodyG.add(armL, armR);

    const headG = new THREE.Group();
    headG.position.set(0, 0.74, 0);
    bear.add(headG);

    headG.add(part(yellow, 1.16, 1.22, 0.96, 0, 0, 0, headG, true));

    function ear(side: number) {
      const g = new THREE.Group();
      g.position.set(side * 0.54, 1.1, 0.12);
      part(yellow, 0.31, 0.31, 0.26, 0, 0, 0, g, true);
      part(earIn, 0.17, 0.17, 0.14, 0, 0, 0.1, g, false);
      return g;
    }
    const earL = ear(-1);
    const earR = ear(1);
    headG.add(earL, earR);

    headG.add(part(muzzle, 0.52, 0.40, 0.28, 0, -0.36, 0.68, headG, true));

    const faceGeo = createLogoFaceGeometries();
    const anchors = getLogoFaceAnchors();

    addInkMesh(faceGeo.nose, ink, anchors.nose, headG, 14);

    addInkMesh(faceGeo.mouthStem, ink, anchors.mouthStem, headG, 15);
    addInkMesh(faceGeo.mouthCurveL, ink, anchors.mouthSplit, headG, 15);
    addInkMesh(faceGeo.mouthCurveR, ink, anchors.mouthSplit, headG, 15);

    function faceEye(side: "left" | "right") {
      const g = new THREE.Group();
      const anchor = side === "left" ? anchors.leftEye : anchors.rightEye;
      g.position.copy(anchor);
      const mesh = new THREE.Mesh(faceGeo.eye, ink);
      mesh.renderOrder = 16;
      g.add(mesh);
      headG.add(g);
      return g;
    }
    const eyeL = faceEye("left");
    const eyeR = faceEye("right");

    const groundGeo = new THREE.PlaneGeometry(40, 40);
    disposables.push(groundGeo);
    if (shadowMat) {
      const ground = new THREE.Mesh(groundGeo, shadowMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -2;
      ground.receiveShadow = true;
      scene.add(ground);
    }

    bear.position.y = config.bearY;

    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let velY = 0;
    let lastInteract = performance.now();
    let waving = 0;
    let carouselYaw = 0;
    let carouselPitch = 0;
    let carouselRoll = 0;
    let carouselMomentum = 0;
    let carouselVelocitySmooth = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastInteract = performance.now();
      lastX = e.clientX;
      lastY = e.clientY;
      velY = 0;
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      targetRotY += dx * 0.01;
      targetRotX += dy * 0.006;
      targetRotX = Math.max(-0.45, Math.min(0.45, targetRotX));
      velY = dx * 0.01;
      lastInteract = performance.now();
    };

    const onUp = () => {
      dragging = false;
    };

    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    const resize = () => {
      const parent = canvas.parentElement ?? canvas;
      const w = parent.clientWidth || window.innerWidth;
      const h = parent.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener("resize", resize);
    resize();

    const clock = new THREE.Clock();
    let blinkTimer = 2.5;
    let blinking = 0;
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      const idle = performance.now() - lastInteract > 2600;
      if (!dragging) {
        targetRotY += velY;
        velY *= 0.94;
        if (idle && !reduced) targetRotY += config.autoRotate;
      }
      pivot.rotation.y += (targetRotY - pivot.rotation.y) * 0.12;
      pivot.rotation.x += (targetRotX - pivot.rotation.x) * 0.12;

      const carouselVelocity =
        !reduced && carouselVelocityRefRef.current
          ? carouselVelocityRefRef.current.current
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
        Math.min(
          CAROUSEL_MAX_YAW / CAROUSEL_VELOCITY_SCALE,
          carouselMomentum,
        ),
      );

      const intent = carouselMomentum * CAROUSEL_VELOCITY_SCALE;
      const targetCarouselYaw = Math.max(
        -CAROUSEL_MAX_YAW,
        Math.min(CAROUSEL_MAX_YAW, intent),
      );
      const leanAmount = Math.min(1, Math.abs(intent) / CAROUSEL_MAX_YAW);
      const targetCarouselPitch = leanAmount * CAROUSEL_MAX_PITCH;
      const targetCarouselRoll = -targetCarouselYaw * 0.28;

      const yawSpring = carouselActive ? 0.13 : 0.055;
      const pitchSpring = carouselActive ? 0.18 : 0.07;
      const rollSpring = carouselActive ? 0.11 : 0.05;

      carouselYaw += (targetCarouselYaw - carouselYaw) * yawSpring;
      carouselPitch += (targetCarouselPitch - carouselPitch) * pitchSpring;
      carouselRoll += (targetCarouselRoll - carouselRoll) * rollSpring;

      bear.rotation.y = carouselYaw;
      bear.rotation.x = carouselPitch;
      bear.rotation.z = carouselRoll;

      if (!reduced && !isEditorial) {
        const br = 1 + Math.sin(t * 1.5) * 0.014;
        bodyG.scale.set(1, br, 1);
        bear.position.y = config.bearY + Math.sin(t * 1.5) * 0.028;
        headG.rotation.z = Math.sin(t * 0.8) * 0.035;
        headG.rotation.y = Math.sin(t * 0.5) * 0.04;
        headG.position.y = 0.74 + Math.sin(t * 1.5) * 0.018;
        earL.rotation.z = Math.sin(t * 2.2) * 0.05;
        earR.rotation.z = -Math.sin(t * 2.2) * 0.05;
        armL.rotation.x = -0.32 + Math.sin(t * 1.2) * 0.035;
        armR.rotation.x = -0.32 + Math.sin(t * 1.2 + 0.6) * 0.035;
      } else if (!reduced && isEditorial) {
        bear.position.y = config.bearY;
      }

      if (wavePendingRef.current) {
        waving = 1;
        wavePendingRef.current = false;
        lastInteract = performance.now();
      }

      if (waving > 0) {
        waving = Math.max(0, waving - dt * 0.55);
        const s = waving;
        armR.rotation.z = 0.72 - s * 0.5 - 2.0 * s;
        armR.rotation.x = -0.32 - s * 0.9;
        armR.rotation.y = Math.sin(t * 16) * 0.5 * s;
        headG.rotation.z += Math.sin(t * 16) * 0.04 * s;
      } else {
        armR.rotation.z += (0.72 - armR.rotation.z) * 0.08;
        armR.rotation.y += (0 - armR.rotation.y) * 0.1;
      }

      blinkTimer -= dt;
      if (blinkTimer <= 0 && blinking === 0) {
        blinking = 1;
        blinkTimer = 3.2 + Math.random() * 2.5;
      }
      if (blinking > 0) {
        blinking += dt * 9;
        const k = Math.sin(Math.min(blinking, Math.PI));
        const open = 1 - k;
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
      window.removeEventListener("resize", resize);
      ro.disconnect();
      renderer.dispose();
      disposables.forEach((geo) => geo.dispose());
      disposeLogoFaceGeometries(faceGeo);
      shadowMat?.dispose();
      disposeBrandMaterials(brand);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`block h-full w-full cursor-grab touch-none active:cursor-grabbing ${className}`}
      aria-label="Urso Parvo 3D — drag to rotate"
    />
  );
}
