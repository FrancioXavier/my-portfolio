"use client";

import { useEffect, useRef } from 'react';

interface TrailElement extends HTMLDivElement {
  trailX: number;
  trailY: number;
}

export function CursorTrail() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<TrailElement[]>([]);

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const coords = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const numElements = 14;

    const container = document.createElement('div');
    container.id = 'cursor-trail-container';
    document.body.appendChild(container);

    const els: TrailElement[] = [];
    for (let i = 0; i < numElements; i++) {
      const el = document.createElement('div') as TrailElement;
      el.className = 'fixed rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2';
      const size = 10 - i * 0.5;
      const opacity = 0.5 - i * 0.03;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.background = `oklch(82% 0.22 195 / ${opacity})`;
      el.trailX = coords.x;
      el.trailY = coords.y;
      container.appendChild(el);
      els.push(el);
    }
    trailRefs.current = els;

    const onMouseMove = (e: MouseEvent) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
      if (dot.current && ring.current) {
        dot.current.style.left = coords.x + 'px';
        dot.current.style.top = coords.y + 'px';
        ring.current.style.left = coords.x + 'px';
        ring.current.style.top = coords.y + 'px';
      }
    };

    const onMouseDown = () => {
      if (ring.current) {
        ring.current.style.width = '18px';
        ring.current.style.height = '18px';
        ring.current.style.borderColor = 'var(--color-accent-2)';
      }
    };

    const onMouseUp = () => {
      if (ring.current) {
        ring.current.style.width = '24px';
        ring.current.style.height = '24px';
        ring.current.style.borderColor = 'var(--color-accent)';
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    let animationFrame: number;
    const animate = () => {
      let x = coords.x;
      let y = coords.y;

      trailRefs.current.forEach((el) => {
        const ex = el.trailX;
        const ey = el.trailY;
        el.trailX = x;
        el.trailY = y;
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        x += (ex - x) * 0.4;
        y += (ey - y) * 0.4;
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrame);
      container.parentNode?.removeChild(container);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="fixed w-6 h-6 border border-accent rounded-full pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color] duration-200"
      />
      <div
        ref={dot}
        className="fixed w-1.5 h-1.5 bg-accent rounded-full pointer-events-none z-[10002] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_var(--color-accent),0_0_20px_var(--color-accent)]"
      />
    </>
  );
}
