"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface DetailField {
  label: string;
  value: string;
}

export interface DetailList {
  label: string;
  items: string[];
}

export interface QuickDetailsData {
  slug: string;
  title: string;
  category?: string;
  description?: string;
  fields?: DetailField[];
  lists?: DetailList[];
  statusGlyph?: string;
  statusLabel?: string;
}

interface QuickDetailsModalProps {
  data: QuickDetailsData | null;
  onClose: () => void;
  labels: {
    descriptionHeading: string;
    closeHint: string;
    closeButton: string;
    terminalSuffix: string;
    statCommand: string;
  };
}

export function QuickDetailsModal({ data, onClose, labels }: QuickDetailsModalProps) {
  const open = data !== null;
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-bg/85 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`inspect-${data.slug}-title`}
            initial={{ opacity: 0, y: 28, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="relative w-full max-w-[680px] max-h-[88vh] flex flex-col"
          >
            <div
              aria-hidden
              className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,var(--color-glow-c)_0%,transparent_65%)] opacity-45 blur-2xl pointer-events-none"
            />

            <div className="relative bg-[oklch(9%_0.025_240/0.94)] border border-border/80 rounded-[10px] overflow-hidden backdrop-blur-md shadow-[0_40px_120px_-40px_oklch(0%_0_0/0.9),_0_0_0_1px_oklch(82%_0.22_195/0.1)_inset] flex flex-col max-h-[88vh]">
              <div className="relative flex items-center h-10 px-4 bg-[oklch(13%_0.03_235/0.95)] border-b border-border/60 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    ref={closeBtnRef}
                    type="button"
                    aria-label={labels.closeButton}
                    onClick={onClose}
                    className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] hover:brightness-110 active:brightness-90 transition shadow-[inset_0_0_0_0.5px_oklch(0%_0_0/0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  />
                  <span
                    aria-hidden
                    className="w-3.5 h-3.5 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_oklch(0%_0_0/0.3)]"
                  />
                  <span
                    aria-hidden
                    className="w-3.5 h-3.5 rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_oklch(0%_0_0/0.3)]"
                  />
                </div>
                <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[0.78rem] text-muted/85 tracking-[0.14em] truncate max-w-[60%]">
                  inspect: {data.slug} — {labels.terminalSuffix}
                </span>
              </div>

              <div className="relative font-mono text-[clamp(0.88rem,1vw,1rem)] leading-[1.85] text-fg/95 px-6 md:px-9 py-7 md:py-8 overflow-y-auto">
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent_0,transparent_3px,oklch(82%_0.22_195/0.025)_3px,oklch(82%_0.22_195/0.025)_4px)]"
                />

                <div className="relative flex flex-col gap-5">
                  <div className="text-muted/70 truncate">
                    <span className="text-accent">$</span>{" "}
                    <span className="text-fg/80">{labels.statCommand}</span>{" "}
                    <span className="text-accent-2">{data.slug}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3
                      id={`inspect-${data.slug}-title`}
                      className="font-mono text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.05] tracking-[0.02em] text-fg drop-shadow-[0_0_18px_var(--color-glow-c)]"
                    >
                      {data.title}
                    </h3>
                    {(data.category || data.statusLabel) && (
                      <div className="flex items-center flex-wrap gap-3 text-[0.92rem] tracking-[0.04em]">
                        {data.category && (
                          <>
                            <span className="text-accent-2/60">▸</span>
                            <span className="text-muted">{data.category}</span>
                          </>
                        )}
                        {data.statusLabel && (
                          <>
                            {data.category && (
                              <span className="text-border/60">·</span>
                            )}
                            <span className="text-accent inline-flex items-center gap-1.5">
                              {data.statusGlyph && (
                                <span aria-hidden>{data.statusGlyph}</span>
                              )}
                              {data.statusLabel}
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {data.description && (
                    <div className="flex flex-col gap-2 pt-1">
                      <div className="font-mono text-[0.62rem] tracking-[0.28em] text-accent-2/80 uppercase">
                        // {labels.descriptionHeading}
                      </div>
                      <p className="font-body text-fg/85 text-[1rem] md:text-[1.05rem] leading-[1.65] max-w-[580px]">
                        {data.description}
                      </p>
                    </div>
                  )}

                  {data.fields && data.fields.length > 0 && (
                    <div className="flex flex-col gap-1.5 pt-1">
                      {data.fields.map((f) => (
                        <div
                          key={f.label}
                          className="flex items-baseline gap-3 text-[0.95rem]"
                        >
                          <span className="text-accent-2/60">▸</span>
                          <span className="text-muted uppercase tracking-[0.2em] text-[0.7rem] w-[9rem] flex-shrink-0">
                            {f.label}
                          </span>
                          <span className="text-fg/95">{f.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {data.lists &&
                    data.lists.map(
                      (list) =>
                        list.items.length > 0 && (
                          <div
                            key={list.label}
                            className="flex flex-col gap-2 pt-1"
                          >
                            <div className="font-mono text-[0.62rem] tracking-[0.28em] text-accent-2/80 uppercase">
                              // {list.label}
                            </div>
                            <ul className="flex flex-col gap-1.5">
                              {list.items.map((item, i) => (
                                <li
                                  key={i}
                                  className="text-fg/85 text-[0.95rem] flex gap-2.5"
                                >
                                  <span
                                    aria-hidden
                                    className="text-accent/60 flex-shrink-0 mt-px"
                                  >
                                    ─
                                  </span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ),
                    )}

                  <div className="mt-3 pt-3 border-t border-border/30 flex items-center justify-between flex-wrap gap-3">
                    <span className="font-mono text-[0.7rem] tracking-[0.22em] text-muted/55 uppercase">
                      [ESC] {labels.closeHint}
                    </span>
                    <button
                      type="button"
                      onClick={onClose}
                      className="font-mono text-[0.7rem] tracking-[0.22em] uppercase py-1.5 px-3 border border-border/70 text-muted hover:text-bg hover:bg-accent hover:border-accent transition-colors clip-btn"
                    >
                      {labels.closeButton}
                      <span aria-hidden className="ml-2">
                        [×]
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
