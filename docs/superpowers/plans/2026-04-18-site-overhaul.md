# UrsoParvo Studio — Site Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 5 confirmed bugs, cut homepage GPU/CPU load ~50%, and add two new homepage sections (About + CTA).

**Architecture:** Purely frontend — no backend or API changes. All fixes are in React/TypeScript components. New sections are server components with CSS-only animations. The WebGL stack (Three.js Bear, Three.js FlowGradient, OGL Gallery) stays structurally intact; only rendering config and event handling change.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, Three.js 0.184, OGL 1.0, Tailwind CSS 4, TypeScript 5

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `src/components/SectionReveal.tsx` | Replace framer-motion with CSS + IntersectionObserver |
| Modify | `src/app/globals.css` | Add `.reveal-root` / `.reveal-visible` CSS classes |
| Modify | `src/components/ui/circular-gallery-2.tsx` | Fix mousewheel, fontClassName dep, geometry, tap nav, active index |
| Modify | `src/components/Index.tsx` | Pass router.push + receive active index, display project name |
| Modify | `src/components/bear/Bear3DScene.tsx` | Move onReady to after first render |
| Modify | `src/components/ui/flow-gradient-hero-section.tsx` | True tab pause, 10fps idle throttle |
| Modify | `src/components/ui/site-background.tsx` | Fix hydration flash |
| Modify | `src/components/Home.tsx` | Add AboutSection + ContactCTA |
| Create | `src/components/AboutSection.tsx` | Manifesto short section |
| Create | `src/components/ContactCTA.tsx` | Horizontal mailto CTA row |
| Remove dep | `package.json` | Remove framer-motion |

---

## Task 1: Replace SectionReveal — remove framer-motion, use CSS + IntersectionObserver

**Files:**
- Modify: `src/components/SectionReveal.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add reveal CSS classes to globals.css**

Append at the end of `src/app/globals.css`:

```css
.reveal-root {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 320ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal-root.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal-root {
    transform: none;
  }
}
```

The global `prefers-reduced-motion` rule already in globals.css sets `transition-duration: 0.01ms !important`, so reduced-motion users get instant reveals with no movement.

- [ ] **Step 2: Rewrite SectionReveal.tsx**

Replace the entire file:

```tsx
"use client";

import { useEffect, useRef, type ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
};

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: SectionRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) el.style.transitionDelay = `${delay}s`;
          el.classList.add("reveal-visible");
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "-80px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal-root ${className}`}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/sorryimleite/Documents/GitHub/ursoparvo.studio
npx tsc --noEmit
```

Expected: zero errors (no more framer-motion types needed).

- [ ] **Step 4: Spot-check in browser**

Open http://localhost:3000/work — scroll down and verify project rows fade up as they enter the viewport.
Open http://localhost:3000/work/nordhaven — verify heading, image, and paragraphs all reveal on scroll.

- [ ] **Step 5: Commit**

```bash
git add src/components/SectionReveal.tsx src/app/globals.css
git commit -m "perf: replace framer-motion SectionReveal with CSS + IntersectionObserver"
```

---

## Task 2: Fix gallery — mousewheel event, fontClassName dep, geometry resolution

**Files:**
- Modify: `src/components/ui/circular-gallery-2.tsx`

- [ ] **Step 1: Remove deprecated mousewheel listener**

In `addEventListeners()` (~line 534), remove this line:

```ts
window.addEventListener("mousewheel", this.boundOnWheel);
```

In `destroy()` (~line 560), remove this line:

```ts
window.removeEventListener("mousewheel", this.boundOnWheel);
```

The `wheel` listener already covers all modern browsers. Keeping both caused double-firing on scroll.

- [ ] **Step 2: Remove fontClassName from useEffect dependency array**

In the `CircularGallery` component `useEffect` (~line 590), change the dep array:

```ts
// BEFORE:
}, [items, bend, borderRadius, scrollSpeed, scrollEase, fontClassName]);

// AFTER:
}, [items, bend, borderRadius, scrollSpeed, scrollEase]);
```

`fontClassName` is applied as a Tailwind class to the wrapper div, not used inside the OGL context. It was causing the entire WebGL renderer to be destroyed and recreated on any parent re-render that passed a new string reference.

- [ ] **Step 3: Reduce plane geometry resolution**

In `createGeometry()` (~line 399):

```ts
// BEFORE:
createGeometry() {
  this.planeGeometry = new Plane(this.gl, {
    heightSegments: 50,
    widthSegments: 100,
  });
}

// AFTER:
createGeometry() {
  this.planeGeometry = new Plane(this.gl, {
    heightSegments: 10,
    widthSegments: 20,
  });
}
```

This reduces geometry from 5,000 faces/tile × 12 tiles = 60,000 triangles to 200 faces/tile × 12 = 2,400 triangles. The wave shader still looks smooth at this resolution.

- [ ] **Step 4: Verify TypeScript + visual check**

```bash
npx tsc --noEmit
```

Open http://localhost:3000 — drag/scroll the gallery. Verify:
- Cards still curve and warp with scroll (wave distortion intact)
- No console errors about `mousewheel`
- Scroll behaviour identical to before

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/circular-gallery-2.tsx
git commit -m "fix: remove deprecated mousewheel, drop stale fontClassName dep, reduce OGL geometry 96%"
```

---

## Task 3: Fix gallery tap — SPA navigation instead of full page reload

**Files:**
- Modify: `src/components/ui/circular-gallery-2.tsx`
- Modify: `src/components/Index.tsx`

- [ ] **Step 1: Add onNavigate to CircularGalleryProps interface**

In `circular-gallery-2.tsx`, add to the `CircularGalleryProps` interface (~line 22):

```ts
interface CircularGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: GalleryItem[];
  bend?: number;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
  fontClassName?: string;
  onScrollVelocity?: (velocity: number) => void;
  onNavigate?: (href: string) => void;  // ADD
}
```

- [ ] **Step 2: Add onNavigate property and constructor param to App class**

Add the property to the `App` class body (near `onScrollVelocity`, ~line 320):

```ts
onNavigate?: (href: string) => void;
```

Add to the constructor's parameter object type:

```ts
constructor(
  container: HTMLElement,
  {
    items,
    bend,
    borderRadius,
    scrollSpeed,
    scrollEase,
    reducedMotion,
    onScrollVelocity,
    onNavigate,  // ADD
  }: {
    items?: GalleryItem[];
    bend: number;
    borderRadius: number;
    scrollSpeed: number;
    scrollEase: number;
    reducedMotion: boolean;
    onScrollVelocity?: (velocity: number) => void;
    onNavigate?: (href: string) => void;  // ADD
  },
)
```

In the constructor body, after `this.onScrollVelocity = onScrollVelocity;`:

```ts
this.onNavigate = onNavigate;
```

- [ ] **Step 3: Replace window.location.assign with onNavigate callback**

In `onTouchUp()` (~line 459):

```ts
// BEFORE:
if (tap && this.sourceItems.length > 0 && this.medias?.[0]) {
  const width = this.medias[0].width;
  const rawIndex = Math.round(Math.abs(this.scroll.target) / width);
  const itemIndex = rawIndex % this.sourceItems.length;
  const href = this.sourceItems[itemIndex]?.href;
  if (href) window.location.assign(href);
}

// AFTER:
if (tap && this.sourceItems.length > 0 && this.medias?.[0]) {
  const width = this.medias[0].width;
  const rawIndex = Math.round(Math.abs(this.scroll.target) / width);
  const itemIndex = rawIndex % this.sourceItems.length;
  const href = this.sourceItems[itemIndex]?.href;
  if (href) this.onNavigate?.(href);
}
```

- [ ] **Step 4: Add onNavigateRef in CircularGallery component and thread to App**

In the `CircularGallery` function (~line 575), add a ref alongside `onScrollVelocityRef`:

```ts
const onScrollVelocityRef = useRef(onScrollVelocity);
onScrollVelocityRef.current = onScrollVelocity;
const onNavigateRef = useRef(onNavigate);   // ADD
onNavigateRef.current = onNavigate;          // ADD
```

In the `App` constructor call inside `useEffect`:

```ts
const app = new App(container, {
  items,
  bend,
  borderRadius,
  scrollSpeed,
  scrollEase: reducedMotion ? 1 : scrollEase,
  reducedMotion,
  onScrollVelocity: (velocity) => onScrollVelocityRef.current?.(velocity),
  onNavigate: (href) => onNavigateRef.current?.(href),  // ADD
});
```

Update the `CircularGallery` function signature to destructure `onNavigate`:

```tsx
const CircularGallery = ({
  items,
  bend = 3,
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05,
  className,
  fontClassName,
  onScrollVelocity,
  onNavigate,   // ADD
  ...props
}: CircularGalleryProps) => {
```

- [ ] **Step 5: Pass router.push as onNavigate in Index.tsx**

In `src/components/Index.tsx`, add the router import and pass the callback:

```tsx
"use client";

import { useRouter } from "next/navigation";   // ADD
import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";
// ... rest of imports unchanged

export default function Index({ onCarouselVelocity }: IndexProps) {
  const router = useRouter();   // ADD
  const galleryItems = useMemo<GalleryItem[]>(...);  // unchanged

  return (
    <section id="index" ...>
      <CircularGallery
        items={galleryItems}
        bend={3}
        borderRadius={0.05}
        scrollEase={0.02}
        fontClassName="font-display"
        className="h-full w-full"
        aria-label="Project gallery"
        onScrollVelocity={onCarouselVelocity}
        onNavigate={(href) => router.push(href)}   // ADD
      />
      {/* existing bottom overlay unchanged */}
    </section>
  );
}
```

- [ ] **Step 6: Verify TypeScript + test navigation**

```bash
npx tsc --noEmit
```

Open http://localhost:3000 — tap/click a gallery card without dragging. Verify:
- Address bar updates to `/work/nordhaven` (or whichever card) without a full page flash
- Browser back button returns to homepage
- No Next.js dev error overlay

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/circular-gallery-2.tsx src/components/Index.tsx
git commit -m "fix: gallery tap navigates via Next.js router, no more full page reload"
```

---

## Task 4: Gallery active index — show current project name below canvas

**Files:**
- Modify: `src/components/ui/circular-gallery-2.tsx`
- Modify: `src/components/Index.tsx`

- [ ] **Step 1: Add onActiveIndex to CircularGalleryProps and App class**

In `CircularGalleryProps`:

```ts
interface CircularGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  // ... existing ...
  onNavigate?: (href: string) => void;
  onActiveIndex?: (index: number) => void;  // ADD
}
```

In the `App` class body:

```ts
onActiveIndex?: (index: number) => void;
private _lastActiveIndex = -1;
```

In the `App` constructor parameter type:

```ts
onActiveIndex?: (index: number) => void;  // ADD
```

In the constructor body:

```ts
this.onActiveIndex = onActiveIndex;
```

- [ ] **Step 2: Emit onActiveIndex in App.update()**

In `update()`, after `this.scroll.last = this.scroll.current;`:

```ts
if (this.medias?.[0] && this.sourceItems.length > 0) {
  const width = this.medias[0].width;
  const rawIndex = Math.round(Math.abs(this.scroll.current) / width);
  const activeIndex = rawIndex % this.sourceItems.length;
  if (activeIndex !== this._lastActiveIndex) {
    this._lastActiveIndex = activeIndex;
    this.onActiveIndex?.(activeIndex);
  }
}
```

- [ ] **Step 3: Thread onActiveIndex through CircularGallery component**

In the `CircularGallery` function, add a ref:

```ts
const onActiveIndexRef = useRef(onActiveIndex);
onActiveIndexRef.current = onActiveIndex;
```

In the `App` constructor call:

```ts
const app = new App(container, {
  // ... existing ...
  onNavigate: (href) => onNavigateRef.current?.(href),
  onActiveIndex: (index) => onActiveIndexRef.current?.(index),  // ADD
});
```

Update the `CircularGallery` function signature to destructure `onActiveIndex`:

```tsx
const CircularGallery = ({
  // ... existing ...
  onNavigate,
  onActiveIndex,  // ADD
  ...props
}: CircularGalleryProps) => {
```

- [ ] **Step 4: Display active project name in Index.tsx**

In `src/components/Index.tsx`, add `useState` and wire up the name display:

```tsx
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";   // ADD useState
// ... rest unchanged

export default function Index({ onCarouselVelocity }: IndexProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);   // ADD
  const galleryItems = useMemo<GalleryItem[]>(...);

  return (
    <section id="index" className="relative z-[2] -mt-[6vh] h-[52dvh] min-h-[360px] w-full scroll-mt-20" aria-label="Selected work">
      <CircularGallery
        items={galleryItems}
        bend={3}
        borderRadius={0.05}
        scrollEase={0.02}
        fontClassName="font-display"
        className="h-full w-full"
        aria-label="Project gallery"
        onScrollVelocity={onCarouselVelocity}
        onNavigate={(href) => router.push(href)}
        onActiveIndex={setActiveIndex}   // ADD
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-8 md:px-10 md:pb-10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-3">
          <p
            key={activeIndex}
            className="display text-sm text-ink/50 transition-opacity duration-300 md:text-base"
          >
            {galleryItems[activeIndex]?.text ?? ""}
          </p>
          <Link
            href="/work"
            className="pointer-events-auto press text-sm font-normal text-ink/60 transition-colors duration-200 hover:text-ink md:text-base"
          >
            View all work →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Verify TypeScript + visual check**

```bash
npx tsc --noEmit
```

Open http://localhost:3000 — scroll the gallery left/right and verify the project name below updates to match the centred card.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/circular-gallery-2.tsx src/components/Index.tsx
git commit -m "feat: show active project name below gallery as carousel scrolls"
```

---

## Task 5: Fix Bear3DScene — onReady fires after first render, not before

**Files:**
- Modify: `src/components/bear/Bear3DScene.tsx`

- [ ] **Step 1: Move onReady call to after renderer.render()**

In the `animate()` function (~line 345), the current structure is:

```ts
const animate = () => {
  frameId = requestAnimationFrame(animate);
  const dt = ...;
  const t = ...;

  // THIS BLOCK IS IN THE WRONG PLACE:
  if (!readyRef.current) {
    readyRef.current = true;
    onReadyRef.current?.();
  }

  // ... animation logic ...

  renderer.render(scene, camera);
};
```

Move the `onReady` block to after `renderer.render()`:

```ts
const animate = () => {
  frameId = requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;

  // ... all existing animation logic (idle, carousel, blink, wave) unchanged ...

  renderer.render(scene, camera);

  // NOW fire onReady — canvas has been drawn
  if (!readyRef.current) {
    readyRef.current = true;
    onReadyRef.current?.();
  }
};
```

- [ ] **Step 2: Verify Bear pixel ratio on mobile (spec section 4.4)**

Check the existing `renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))` line (~line 91). The OGL gallery already does `Math.min(dpr, 1.5)` on mobile. Add the same guard to Bear3DScene:

```ts
// BEFORE:
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

// AFTER:
const dpr = window.innerWidth < 768
  ? Math.min(window.devicePixelRatio || 1, 1.5)
  : Math.min(window.devicePixelRatio || 1, 2);
renderer.setPixelRatio(dpr);
```

- [ ] **Step 3: Verify TypeScript + visual check**

```bash
npx tsc --noEmit
```

Open http://localhost:3000 on a hard refresh. Watch the nav: it should appear only after the bear canvas draws its first frame. There should be no flash of the nav bar over a black or empty canvas.

- [ ] **Step 4: Commit**

```bash
git add src/components/bear/Bear3DScene.tsx
git commit -m "fix: onReady fires after first WebGL render; cap mobile pixel ratio to 1.5"
```

---

## Task 6: Fix FlowGradient — true tab pause + 10fps idle throttle

**Files:**
- Modify: `src/components/ui/flow-gradient-hero-section.tsx`

- [ ] **Step 1: Replace the FlowGradientApp class**

Replace the entire `FlowGradientApp` class (from `class FlowGradientApp {` to its closing `}`) with:

```ts
class FlowGradientApp {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  clock: THREE.Clock;
  touchTexture: TouchTexture;
  gradientPlane: FlowGradientPlane;
  animationId: number | null = null;
  container: HTMLElement;
  private _paused = false;
  private _lastActivity = Date.now();
  private _onMouseMove: (e: MouseEvent) => void;
  private _onTouchMove: (e: TouchEvent) => void;
  private _onResize: () => void;
  private _onVisibility: () => void;
  private _onActivity: () => void;

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

    this._onMouseMove = (e) => {
      onMove(e.offsetX, e.offsetY);
      this._trackActivity();
    };
    this._onTouchMove = (e) => {
      const rect = container.getBoundingClientRect();
      onMove(
        e.touches[0].clientX - rect.left,
        e.touches[0].clientY - rect.top,
      );
      this._trackActivity();
    };
    this._onResize = () => {
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.gradientPlane.onResize(container.clientWidth, container.clientHeight);
    };
    this._onVisibility = () => {
      if (document.visibilityState === "hidden") {
        this.setPaused(true);
      } else {
        this._trackActivity();
        this.setPaused(false);
      }
    };
    this._onActivity = () => this._trackActivity();

    this.init();
  }

  private _trackActivity() {
    const wasIdle = Date.now() - this._lastActivity > 30000;
    this._lastActivity = Date.now();
    if (wasIdle && !this._paused && this.animationId !== null) {
      // Was in idle setTimeout loop — cancel it and resume rAF
      clearTimeout(this.animationId);
      this.animationId = null;
      this.tick();
    }
  }

  getViewSize() {
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(this.camera.position.z * Math.tan(fov / 2) * 2);
    return { width: height * this.camera.aspect, height };
  }

  setPaused(paused: boolean) {
    const wasPaused = this._paused;
    this._paused = paused;
    this.gradientPlane.isPaused = paused;
    if (!wasPaused && paused && this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      clearTimeout(this.animationId); // safe no-op if it's a rAF id
      this.animationId = null;
    }
    if (wasPaused && !paused && this.animationId === null) {
      this.tick();
    }
  }

  init() {
    this.gradientPlane.init();
    this.container.addEventListener("mousemove", this._onMouseMove);
    this.container.addEventListener("touchmove", this._onTouchMove);
    window.addEventListener("resize", this._onResize);
    document.addEventListener("visibilitychange", this._onVisibility);
    window.addEventListener("scroll", this._onActivity, { passive: true });
    window.addEventListener("keydown", this._onActivity, { passive: true });
    window.addEventListener("pointerdown", this._onActivity, { passive: true });
    this.tick();
  }

  tick() {
    if (this._paused) return;

    const isIdle = Date.now() - this._lastActivity > 30000;
    const delta = Math.min(this.clock.getDelta(), 0.1);
    this.touchTexture.update();
    this.gradientPlane.update(delta);
    this.renderer.render(this.scene, this.camera);

    if (isIdle) {
      // Throttle to ~10 fps when user has been idle for 30s
      this.animationId = setTimeout(() => {
        this.animationId = null;
        this.tick();
      }, 100) as unknown as number;
    } else {
      this.animationId = requestAnimationFrame(() => this.tick());
    }
  }

  cleanup() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      clearTimeout(this.animationId);
      this.animationId = null;
    }
    this.container.removeEventListener("mousemove", this._onMouseMove);
    this.container.removeEventListener("touchmove", this._onTouchMove);
    window.removeEventListener("resize", this._onResize);
    document.removeEventListener("visibilitychange", this._onVisibility);
    window.removeEventListener("scroll", this._onActivity);
    window.removeEventListener("keydown", this._onActivity);
    window.removeEventListener("pointerdown", this._onActivity);
    this.renderer.dispose();
    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
```

- [ ] **Step 2: Remove the now-redundant backgroundOnly visibilitychange useEffect**

In `FlowGradientHeroSection`, remove this entire `useEffect` block (visibilitychange is now handled inside `FlowGradientApp.init()`):

```tsx
// REMOVE THIS ENTIRE BLOCK:
useEffect(() => {
  if (!backgroundOnly) return;

  const syncVisibility = () => {
    const hidden = document.visibilityState === "hidden";
    appRef.current?.setPaused(hidden || !isPlaying);
  };

  document.addEventListener("visibilitychange", syncVisibility);
  syncVisibility();

  return () => document.removeEventListener("visibilitychange", syncVisibility);
}, [backgroundOnly, isPlaying]);
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Test pause and idle behaviour**

Open http://localhost:3000. Switch to another browser tab for 3s, switch back — verify the gradient animation is still running (not frozen).

Leave the page with no interaction for 30s — in Activity Monitor / Task Manager, CPU usage from the browser process should drop noticeably compared to constant 60fps rendering.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/flow-gradient-hero-section.tsx
git commit -m "perf: FlowGradient stops rAF on hidden tab, throttles to 10fps after 30s idle"
```

---

## Task 7: Fix SiteBackground — eliminate hydration flash

**Files:**
- Modify: `src/components/ui/site-background.tsx`

- [ ] **Step 1: Replace null initial state with false**

Replace the entire file:

```tsx
"use client";

import { useEffect, useState } from "react";
import { FlowGradientBackground } from "@/components/ui/flow-gradient-hero-section";
import { GradientBackground } from "@/components/ui/gradient-backgrounds";

export function SiteBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (reducedMotion) {
    return <GradientBackground variant="indigo" />;
  }

  return <FlowGradientBackground />;
}
```

The old code used `useState<boolean | null>(null)`, which rendered `<GradientBackground>` initially, then replaced it with `<FlowGradientBackground>` after the first effect — unmounting and remounting the Three.js renderer on every page load. The new code starts with `false`, so the component renders `<FlowGradientBackground>` identically on server and client, avoiding any remount.

- [ ] **Step 2: Verify TypeScript + visual check**

```bash
npx tsc --noEmit
```

Open http://localhost:3000 on a hard refresh. The background should animate immediately without a visible switch from static to animated gradient.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/site-background.tsx
git commit -m "fix: eliminate SiteBackground hydration flash — useState(false) not null"
```

---

## Task 8: Create AboutSection component

**Files:**
- Create: `src/components/AboutSection.tsx`

- [ ] **Step 1: Create the component**

```tsx
import SectionReveal from "@/components/SectionReveal";

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About the studio"
      className="bg-background px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionReveal>
          <p className="meta mb-5">About</p>
          <h2 className="display text-[clamp(2.5rem,6vw,4rem)] text-ink">
            We design meaning
            <br />
            for brands that matter.
          </h2>
        </SectionReveal>
        <SectionReveal delay={0.08} className="mt-6 max-w-2xl">
          <p className="text-lg leading-relaxed text-ink-muted md:text-xl">
            UrsoParvo is an independent design studio working at the
            intersection of identity, strategy and experience. We take on fewer
            projects so we can go deeper on each one.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
```

This is a server component (no `"use client"` needed — no hooks, no browser APIs). `SectionReveal` is a client component and can be imported by server components in Next.js App Router.

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/AboutSection.tsx
git commit -m "feat: add AboutSection — short manifesto with fade-up reveal"
```

---

## Task 9: Create ContactCTA component

**Files:**
- Create: `src/components/ContactCTA.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { ArrowUpRight } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

export default function ContactCTA() {
  return (
    <section
      aria-label="Start a project"
      className="border-t border-border bg-background px-6 py-16 md:px-10 md:py-20"
    >
      <SectionReveal>
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-8">
          <h2 className="display text-[clamp(1.75rem,4vw,2.75rem)] text-ink">
            Ready to start something
            <br className="hidden md:block" />
            worth making?
          </h2>
          <a
            href="mailto:hello@ursoparvo.studio"
            className="press nav-cta-split group inline-flex h-auto items-stretch gap-0.5 rounded-full p-0 text-sm font-normal md:text-base"
          >
            <span className="nav-cta-split__label rounded-full bg-primary px-5 py-2.5 text-primary-foreground md:px-6 md:py-3">
              hello@ursoparvo.studio
            </span>
            <span className="nav-cta-split__arrow relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground md:size-11">
              <ArrowUpRight
                className="nav-cta-split__icon nav-cta-split__icon--out size-4 md:size-[18px]"
                aria-hidden
              />
              <ArrowUpRight
                className="nav-cta-split__icon nav-cta-split__icon--in absolute size-4 md:size-[18px]"
                aria-hidden
              />
            </span>
          </a>
        </div>
      </SectionReveal>
    </section>
  );
}
```

This reuses the existing `nav-cta-split` CSS classes (already defined in `globals.css`) so the arrow slide animation on hover works out of the box with zero new CSS.

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ContactCTA.tsx
git commit -m "feat: add ContactCTA — horizontal mailto row reusing nav-cta-split pill style"
```

---

## Task 10: Wire new sections into Home.tsx + remove framer-motion

**Files:**
- Modify: `src/components/Home.tsx`
- Modify: `package.json` (via npm uninstall)

- [ ] **Step 1: Add AboutSection and ContactCTA to Home.tsx**

Replace the entire file:

```tsx
"use client";

import { useRef, useState } from "react";
import AboutSection from "@/components/AboutSection";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Index from "@/components/Index";
import Nav from "@/components/Nav";

export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const carouselVelocityRef = useRef(0);

  return (
    <>
      <Nav visible={headerVisible} />
      <main>
        <section id="landing" className="relative isolate overflow-visible pb-32 md:pb-48">
          <Hero
            onReady={() => setHeaderVisible(true)}
            carouselVelocityRef={carouselVelocityRef}
          />
          <Index
            onCarouselVelocity={(velocity) => {
              carouselVelocityRef.current = velocity;
            }}
          />
        </section>
        <AboutSection />
        <ContactCTA />
        <section id="end" aria-label="Site footer">
          <Footer />
        </section>
      </main>
    </>
  );
}
```

- [ ] **Step 2: Verify framer-motion is no longer imported anywhere**

```bash
grep -r "framer-motion" /Users/sorryimleite/Documents/GitHub/ursoparvo.studio/src/
```

Expected: no output. If any file still imports framer-motion, fix it before continuing.

- [ ] **Step 3: Remove framer-motion from package.json**

```bash
cd /Users/sorryimleite/Documents/GitHub/ursoparvo.studio
npm uninstall framer-motion
```

Expected output ends with something like `removed 1 package`.

- [ ] **Step 4: Full TypeScript check + production build**

```bash
npx tsc --noEmit
npm run build
```

Expected: clean build, zero TypeScript errors, no missing module errors.

- [ ] **Step 5: Final visual walkthrough on http://localhost:3000**

Check all of the following in order:

1. **Background** — gradient animates from first load, no static→animated flash
2. **Bear + nav** — 3D bear appears, then nav fades in (not before)
3. **Gallery scroll** — drag/scroll gallery, active project name below updates
4. **Gallery tap** — tap a card without dragging, navigates SPA-style (no reload)
5. **Scroll past gallery** — "We design meaning for brands that matter." fades in with delay
6. **Scroll further** — CTA row fades in, yellow pill button visible
7. **CTA hover** — arrow icon slides out/in on the pill button
8. **CTA click** — opens mail client to hello@ursoparvo.studio
9. **Mobile menu** — "About" link in mobile nav (href `/#end`) still reaches footer
10. **Work page** — http://localhost:3000/work — project rows still reveal on scroll

- [ ] **Step 6: Commit**

```bash
git add src/components/Home.tsx package.json package-lock.json
git commit -m "feat: wire AboutSection + ContactCTA into homepage; remove framer-motion"
```
