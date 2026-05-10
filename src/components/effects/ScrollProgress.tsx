"use client";

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="absolute bottom-0 left-0 right-0 h-[1px] origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-3 shadow-[0_0_12px_var(--color-glow-c)]"
      style={{ scaleX }}
    />
  );
}
