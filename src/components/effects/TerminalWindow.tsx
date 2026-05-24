"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type SequenceEntry = { cmd: string; out: string[] };
type Line =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string }
  | { kind: "blank" };

const TYPE_MIN = 28;
const TYPE_JITTER = 38;
const PAUSE_AFTER_CMD = 220;
const PAUSE_BETWEEN_OUT = 90;
const PAUSE_BLANK = 200;
const INITIAL_DELAY = 400;

export function TerminalWindow() {
  const t = useTranslations("hero.terminal");
  const sequence = t.raw("sequence") as SequenceEntry[];
  const title = t("title");
  const user = t("user");
  const host = t("host");

  const lines = useMemo<Line[]>(() => {
    const out: Line[] = [];
    sequence.forEach((entry, i) => {
      out.push({ kind: "cmd", text: entry.cmd });
      entry.out.forEach((line) => out.push({ kind: "out", text: line }));
      if (i < sequence.length - 1) out.push({ kind: "blank" });
    });
    return out;
  }, [sequence]);

  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setLineIdx(lines.length);
      setDone(true);
      return;
    }

    let cancelled = false;
    let li = 0;
    let ci = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      if (li >= lines.length) {
        setDone(true);
        return;
      }
      const line = lines[li];
      if (line.kind === "cmd") {
        if (ci < line.text.length) {
          ci += 1;
          setLineIdx(li);
          setCharIdx(ci);
          timer = setTimeout(tick, TYPE_MIN + Math.random() * TYPE_JITTER);
        } else {
          li += 1;
          ci = 0;
          setLineIdx(li);
          setCharIdx(0);
          timer = setTimeout(tick, PAUSE_AFTER_CMD);
        }
      } else {
        li += 1;
        setLineIdx(li);
        setCharIdx(0);
        timer = setTimeout(tick, line.kind === "blank" ? PAUSE_BLANK : PAUSE_BETWEEN_OUT);
      }
    };

    timer = setTimeout(tick, INITIAL_DELAY);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [lines]);

  const completed = lines.slice(0, lineIdx);
  const typing =
    lineIdx < lines.length && lines[lineIdx].kind === "cmd"
      ? (lines[lineIdx] as { kind: "cmd"; text: string }).text.slice(0, charIdx)
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[780px] mx-auto"
    >
      <div
        aria-hidden
        className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,var(--color-glow-c)_0%,transparent_60%)] opacity-40 blur-2xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -inset-px bg-gradient-to-b from-accent/30 via-transparent to-accent-2/25 opacity-50 pointer-events-none rounded-[11px] blur-[2px]"
      />

      <div className="relative bg-[oklch(9%_0.025_240/0.92)] border border-border/80 rounded-[10px] overflow-hidden backdrop-blur-md shadow-[0_30px_80px_-30px_oklch(0%_0_0/0.9),_0_0_0_1px_oklch(82%_0.22_195/0.08)_inset]">
        <div className="relative flex items-center h-10 px-4 bg-[oklch(13%_0.03_235/0.95)] border-b border-border/60">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_oklch(0%_0_0/0.3)]" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_oklch(0%_0_0/0.3)]" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_oklch(0%_0_0/0.3)]" />
          </div>
          <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[0.78rem] text-muted/85 tracking-[0.14em] truncate max-w-[60%]">
            {title}
          </span>
        </div>

        <div className="relative font-mono text-[clamp(0.72rem,2.2vw,1rem)] leading-[1.85] text-fg/95 px-4 sm:px-5 md:px-8 py-5 md:py-8 min-h-[320px] md:min-h-[380px] text-left">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent_0,transparent_3px,oklch(82%_0.22_195/0.025)_3px,oklch(82%_0.22_195/0.025)_4px)]"
          />

          <div className="relative">
            {completed.map((line, idx) => {
              if (line.kind === "cmd")
                return <CmdRow key={idx} user={user} host={host} text={line.text} />;
              if (line.kind === "out")
                return <OutRow key={idx} text={line.text} />;
              return <div key={idx} className="h-[0.6em]" aria-hidden />;
            })}

            {typing !== null && (
              <CmdRow user={user} host={host} text={typing} caret />
            )}
            {done && <CmdRow user={user} host={host} text="" caret />}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CmdRow({
  user,
  host,
  text,
  caret,
}: {
  user: string;
  host: string;
  text: string;
  caret?: boolean;
}) {
  return (
    <div className="whitespace-pre-wrap break-all">
      <span className="text-green">{user}</span>
      <span className="text-muted/60">@</span>
      <span className="text-accent">{host}</span>
      <span className="text-muted/60"> ~ </span>
      <span className="text-accent-2">$</span>
      <span className="text-fg/95 break-words">{" "}{text}</span>
      {caret && (
        <span className="inline-block w-[0.55em] h-[0.95em] align-[-0.12em] ml-[2px] bg-accent animate-blink shadow-[0_0_8px_var(--color-glow-c)]" />
      )}
    </div>
  );
}

function OutRow({ text }: { text: string }) {
  return (
    <div className="whitespace-pre-wrap break-words text-muted">
      <span className="text-accent/60 select-none mr-2">›</span>
      <span>{text}</span>
    </div>
  );
}
