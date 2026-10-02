"use client";

import { useEffect } from "react";

// Share of the remaining distance covered each frame: lower glides for longer.
const EASING = 0.12;
// Under half a pixel the glide is over; smaller steps would never settle.
const SETTLED = 0.5;
// Firefox reports notches in lines or pages instead of pixels.
const LINE = 16;

function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let current = window.scrollY;
    let target = current;
    let frame: number | null = null;

    const step = () => {
      const distance = target - current;

      if (Math.abs(distance) < SETTLED) {
        current = target;
        frame = null;
      } else {
        current += distance * EASING;
        frame = requestAnimationFrame(step);
      }

      window.scrollTo(0, current);
    };

    const pixels = (event: WheelEvent) => {
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
        return event.deltaY * LINE;
      }

      if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
        return event.deltaY * window.innerHeight;
      }

      return event.deltaY;
    };

    const onWheel = (event: WheelEvent) => {
      // A wheel with ctrl held is a zoom, which is the browser's to handle.
      if (event.ctrlKey) {
        return;
      }

      event.preventDefault();
      const furthest = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
      target = Math.min(Math.max(target + pixels(event), 0), furthest);
      frame ??= requestAnimationFrame(step);
    };

    // Keyboard, scrollbar, anchors and find-in-page move the page themselves, so
    // between glides the next one has to start from wherever they left it.
    const onScroll = () => {
      if (frame === null) {
        current = window.scrollY;
        target = current;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return null;
}

export default SmoothScroll;
