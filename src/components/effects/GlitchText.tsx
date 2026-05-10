"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

const SCRAMBLE_CHARS = "01$#%&*<>?/[]{}—=+_";

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const mounted = useRef(false);

  // Character Scrambling Effect
  const scramble = useCallback((targetText: string, speed = 30) => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() => 
        targetText.split("").map((char, index) => {
          if (index < iteration) return targetText[index];
          if (char === " ") return " ";
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join("")
      );
      
      if (iteration >= targetText.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, speed);
    return interval;
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      scramble(text);
      mounted.current = true;
    }
  }, [text, scramble]);

  // Randomized Intermittent Glitch
  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
      
      const nextTime = Math.random() * 8000 + 3000;
      return setTimeout(triggerGlitch, nextTime);
    };

    const timeoutId = setTimeout(triggerGlitch, 4000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div 
      className={`relative inline-block cursor-default group ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        scramble(text, 20);
      }}
      onMouseLeave={() => setIsHovered(false)}
      role="text"
      aria-label={text}
    >
      {/* Base Text with Motion Entry */}
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          x: isGlitching || isHovered ? [0, -1, 1, -1, 0] : 0,
        }}
        transition={{ 
          opacity: { duration: 0.5 },
          x: { duration: 0.2, repeat: isGlitching ? 1 : 0 }
        }}
        className="font-mono text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-[0.04em] text-fg mb-3 relative z-10 will-change-transform"
        style={{ 
          textShadow: isHovered || isGlitching 
            ? '0 0 20px var(--color-glow-c), 0 0 40px var(--color-glow-c)' 
            : '0 0 15px var(--color-glow-c)' 
        }}
      >
        {displayText}
      </motion.h1>

      {/* Glitch Overlay Layers (Aria Hidden) */}
      <div 
        className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 ${isGlitching || isHovered ? 'opacity-70' : 'opacity-0'}`}
        aria-hidden="true"
      >
        <span 
          className="absolute inset-0 text-accent-2 mix-blend-screen animate-glitch-1 will-change-transform" 
          style={{ clipPath: 'inset(45% 0 35% 0)' }}
        >
          {displayText}
        </span>
        <span 
          className="absolute inset-0 text-accent mix-blend-screen animate-glitch-2 will-change-transform"
          style={{ clipPath: 'inset(10% 0 75% 0)' }}
        >
          {displayText}
        </span>
      </div>

      {/* Subtle Scanline Overlay */}
      <div 
        className="absolute inset-0 z-30 pointer-events-none overflow-hidden opacity-10 mix-blend-overlay"
        aria-hidden="true"
      >
        <div className="w-full h-[3px] bg-accent/30 animate-[scanline_4s_linear_infinite]" />
      </div>

      {/* Horizontal Distortion Lines */}
      <AnimatePresence>
        {(isGlitching || isHovered) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 pointer-events-none"
          >
            {[...Array(3)].map((_, i) => {
              // We're using a stable random value generated outside of the immediate return to avoid lint issues
              // though for a glitch effect, inconsistency is usually desired.
              const top = `${(i * 33 + Math.sin(i) * 10) % 100}%`;
              const x = `${(Math.sin(i * 10) * 10)}px`;
              return (
                <div 
                  key={i}
                  className="absolute w-full h-[1px] bg-accent/40"
                  style={{ 
                    top,
                    left: 0,
                    transform: `translateX(${x})`
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

