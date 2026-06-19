# UrsoParvo Studio — Site Overhaul Design Spec

**Date:** 2026-04-18  
**Scope:** Bug fixes + performance (Approach B) + new homepage sections  
**Approved via brainstorming session**

---

## 1. Goals

1. Fix all confirmed bugs — no regressions, no full-page reloads, no broken events.
2. Dramatically improve performance — target ~50–60% reduction in GPU/CPU load on homepage.
3. Add two new homepage sections — "Sobre" (manifesto) + CTA horizontal.
4. Polish existing interactions without breaking the bold, daring visual identity.

---

## 2. Homepage Structure (approved)

```
HERO         — Bear 3D + "hello there" (unchanged visually)
GALERIA      — Circular work gallery (bug fixes + perf)
SOBRE        — Short manifesto (NEW)
CTA          — Horizontal contact row (NEW)
FOOTER       — Unchanged
```

---

## 3. Bug Fixes

### 3.1 Gallery — full-page reload on tap (`circular-gallery-2.tsx:469`)
**Problem:** `window.location.assign(href)` causes a full page reload on tap.  
**Fix:** Replace with Next.js router (`useRouter().push(href)`) or emit an event the parent handles with `<Link>`. Since the OGL canvas is class-based, the cleanest fix is to pass a `onNavigate` callback prop to `CircularGallery` and call it from `onTouchUp`.

### 3.2 Gallery — deprecated `mousewheel` event (`circular-gallery-2.tsx:541`)
**Problem:** `mousewheel` is non-standard and removed in some Blink versions. Double-fires with the `wheel` listener already present.  
**Fix:** Remove the `window.addEventListener("mousewheel", ...)` line entirely. Keep only `wheel`.

### 3.3 Gallery — `fontClassName` in useEffect deps (`circular-gallery-2.tsx:626`)
**Problem:** `fontClassName` is in the `useEffect` dependency array but never used inside the OGL context. Any parent re-render that changes this prop destroys and recreates the entire WebGL context.  
**Fix:** Remove `fontClassName` from the dependency array.

### 3.4 Bear3DScene — `onReady` fires before first render (`Bear3DScene.tsx:350`)
**Problem:** `onReady` (which makes the nav visible) is called at the top of the first `animate()` invocation, before `renderer.render()` has drawn anything. The nav can flash in over a black canvas.  
**Fix:** Move the `onReady` call to after the first `renderer.render()` call.

### 3.5 SiteBackground — hydration flash
**Problem:** `SiteBackground` initialises with `useStatic === null`, renders `<GradientBackground>`, then after the `useEffect` fires replaces it with `<FlowGradientBackground>`. This unmounts and remounts the Three.js renderer on every load.  
**Fix:** Use `suppressHydrationWarning` on the wrapper and render the animated background unconditionally on the client, deferring only for `prefers-reduced-motion`. Alternatively, skip the null state and always render `<GradientBackground>` on the server, then hydrate without remounting by wrapping in a `useState` initialised from a server-safe value.

---

## 4. Performance — Approach B

### 4.1 OGL gallery geometry reduction
**Problem:** Each gallery image uses `Plane(gl, { heightSegments: 50, widthSegments: 100 })` — 5,000 faces per tile × 12 tiles = 60,000 triangles for a carousel.  
**Fix:** Reduce to `{ heightSegments: 10, widthSegments: 20 }` — 200 faces per tile. The wave distortion shader still works; the fidelity difference is imperceptible on curved cards.

### 4.2 Replace `framer-motion` with CSS + IntersectionObserver
**Problem:** `framer-motion` (~100 KB gzipped) is used solely in `SectionReveal.tsx` for a simple fade-up animation.  
**Fix:** Rewrite `SectionReveal` to use native `IntersectionObserver` + CSS transitions (`opacity`, `transform`). Remove the `framer-motion` dependency entirely.  
**Savings:** ~100 KB JS, eliminates the JS-driven animation frame cost for reveal animations.

### 4.3 FlowGradient — pause on inactivity and background tab
**Problem:** `FlowGradientApp.tick()` runs `requestAnimationFrame` at 60 fps unconditionally, even when the user has been idle for minutes or the tab is in background.  
**Fix:**
- The `visibilitychange` handler already exists for `backgroundOnly` mode — extend it to always run.
- Add pointer/scroll activity tracking: if no user interaction for >30s, drop to 10 fps (via `setTimeout` fallback instead of rAF). Resume full rate on next interaction.

### 4.4 Bear3DScene — pixel ratio cap on mobile
Already present (`Math.min(dpr, 2)`) but should also cap to 1.5 on screens narrower than 768px. The OGL gallery already does this — apply same logic to Bear3DScene.  
(Note: this may already be partially correct; confirm during implementation.)

---

## 5. New Sections

### 5.1 "Sobre" — Short manifesto

**Location:** Between the gallery section and the CTA, inside `Home.tsx`.  
**Component:** New `AboutSection.tsx` (server component, no client JS needed).

**Content:**
```
[eyebrow]  About
[headline] We design meaning
           for brands that matter.
[body]     UrsoParvo is an independent design studio working at the
           intersection of identity, strategy and experience. We take on
           fewer projects so we can go deeper on each one.
```

**Visual spec:**
- White background, full-width section.
- Max content width: `max-w-[1400px]`, same horizontal padding as the rest of the site (`px-6 md:px-10`).
- Eyebrow: `.meta` class (existing uppercase small caps style), `text-ink/40`.
- Headline: `.display` class, `text-[clamp(2.5rem,6vw,4rem)]`, `text-ink`.
- Body: `text-lg md:text-xl leading-relaxed text-ink-muted`, `max-w-2xl`.
- Entrance: fade-up via the new CSS-based `SectionReveal`.
- Vertical rhythm: `py-24 md:py-32`, matches the work page spacing.

### 5.2 CTA — Horizontal contact row

**Location:** After `AboutSection`, before `Footer`, inside `Home.tsx`.  
**Component:** New `ContactCTA.tsx` (server component).

**Visual spec:**
- White background with a top border: `border-t border-border`.
- Layout: `flex items-center justify-between flex-wrap gap-6`, padded `px-6 md:px-10 py-16 md:py-20`.
- Max content width: `max-w-[1400px]`.
- Left: headline in `.display` at `text-[clamp(1.75rem,4vw,2.75rem)]`: *"Ready to start something worth making?"*
- Right: `<a href="mailto:hello@ursoparvo.studio">` styled as the existing pill button (yellow bg, ink text, arrow icon). Reuse `nav-cta-split` pattern or the existing `<Button>` primitive.
- Entrance: `SectionReveal` fade-up.

---

## 6. Gallery — text labels overlay

**Problem:** Each `GalleryItem` has a `text` field and `href` but the OGL canvas never renders text. The names are defined but invisible.  
**Fix:** Add an HTML overlay div positioned over the OGL canvas. Use `pointer-events-none` absolutely-positioned `<div>` children that track the gallery's scroll position to show project names. Alternatively (simpler): render names as a static `<ul>` below the canvas that highlights the centred item. Centred-item detection already exists via `onScrollVelocity` → can be extended to emit `onActiveIndex`.

**Decision for spec:** Render a centred name below the canvas (simpler, more accessible, no WebGL text rendering). The active name fades in/out as the gallery scrolls.

---

## 7. Out of Scope

- Dark mode
- Individual project page redesign  
- Bear `/bear` page changes
- Legal/privacy/cookies pages
- New photography or project assets

---

## 8. File Change Summary

| File | Change |
|------|--------|
| `src/components/ui/circular-gallery-2.tsx` | Fix `mousewheel`, fix `fontClassName` dep, fix tap nav, reduce geometry, add `onNavigate` prop, emit `onActiveIndex` |
| `src/components/bear/Bear3DScene.tsx` | Fix `onReady` timing |
| `src/components/ui/flow-gradient-hero-section.tsx` | Always pause on tab hide; throttle to 10 fps after 30s idle |
| `src/components/ui/site-background.tsx` | Fix hydration flash |
| `src/components/SectionReveal.tsx` | Replace `framer-motion` with CSS + IntersectionObserver |
| `src/components/Home.tsx` | Add `AboutSection` + `ContactCTA` between gallery and footer |
| `src/components/AboutSection.tsx` | New — manifesto short section |
| `src/components/ContactCTA.tsx` | New — horizontal CTA row |
| `package.json` | Remove `framer-motion` dependency |

---

## 9. What Does Not Change

- Color palette: yellow `#f5e642`, electric blue `#5757ff`, ink `#111`
- Typography: Instrument Serif (display) + Inter (sans)
- 3D bear — visual, geometry, interactions
- Circular gallery visual style
- Nav behaviour and mobile menu
- Work pages and project slug pages
- Footer structure
