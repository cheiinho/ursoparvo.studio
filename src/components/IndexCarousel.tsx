"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { projectPoster } from "@/lib/projectPoster";

export default function IndexCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const rafRef = useRef<number | null>(null);
  const autoRef = useRef<number | null>(null);
  const paused = useRef(false);

  const maxOffset = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    return Math.max(0, track.scrollWidth - window.innerWidth + 96);
  }, []);

  const clamp = useCallback(
    (value: number) => Math.min(Math.max(0, value), maxOffset()),
    [maxOffset],
  );

  useEffect(() => {
    const tick = () => {
      if (!paused.current && !dragging.current) {
        setOffset((prev) => {
          const next = prev + 0.35;
          return next >= maxOffset() ? 0 : next;
        });
      }
      autoRef.current = requestAnimationFrame(tick);
    };
    autoRef.current = requestAnimationFrame(tick);
    return () => {
      if (autoRef.current) cancelAnimationFrame(autoRef.current);
    };
  }, [maxOffset]);

  const onPointerDown = (event: React.PointerEvent) => {
    dragging.current = true;
    startX.current = event.clientX;
    startOffset.current = offset;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!dragging.current) return;
    const delta = startX.current - event.clientX;
    setOffset(clamp(startOffset.current + delta));
  };

  const endDrag = (event: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* ignore */
    }
  };

  const onWheel = (event: React.WheelEvent) => {
    if (Math.abs(event.deltaX) < Math.abs(event.deltaY)) return;
    event.preventDefault();
    setOffset((prev) => clamp(prev + event.deltaX));
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    });
  }, [offset]);

  return (
    <div className="index-shell">
      <div
        className="index-carousel is-ready"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Projectos em destaque"
        tabIndex={0}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={() => {
          paused.current = true;
        }}
        onMouseLeave={() => {
          paused.current = false;
        }}
      >
        <div ref={trackRef} className="index-track">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.id}`}
              className="index-slide"
            >
              <span className="index-slide__title">{project.name}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={projectPoster(project.id, project.name, project.year)}
                alt=""
                className="index-slide__img"
                draggable={false}
              />
              <span className="index-slide__meta">
                {project.disciplines.join(" · ")} · {project.year}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
