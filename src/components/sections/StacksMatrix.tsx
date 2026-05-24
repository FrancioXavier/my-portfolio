"use client";

import { useMemo, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { useTranslations } from "next-intl";
import { StackChip } from "@/components/ui/StackChip";
import {
  QuickDetailsModal,
  type QuickDetailsData,
} from "@/components/effects/QuickDetailsModal";
import type { StackCategoryEntry, StackCategoryItem } from "@/data";

type ViewMode = "category" | "experience";

const CATEGORY_CODE: Record<string, string> = {
  backend: "BE",
  frontend: "FE",
  data: "DB",
  infrastructure: "IN",
  observability: "OB",
};

interface StacksMatrixProps {
  stacks: StackCategoryEntry[];
}

export function StacksMatrix({ stacks }: StacksMatrixProps) {
  const t = useTranslations("stacks");
  const tInspect = useTranslations("inspect");
  const [view, setView] = useState<ViewMode>("category");
  const [active, setActive] = useState<QuickDetailsData | null>(null);

  const flatSorted = useMemo(
    () =>
      stacks
        .flatMap((cat) =>
          cat.items.map((item) => ({
            ...item,
            categoryId: cat.id,
            categoryLabel: cat.label,
          })),
        )
        .sort((a, b) => b.years - a.years || a.name.localeCompare(b.name)),
    [stacks],
  );

  const tierFor = (years: number) => {
    if (years >= 4) return { glyph: "●", label: t("tierCore") };
    if (years >= 2) return { glyph: "◐", label: t("tierStrong") };
    return { glyph: "○", label: t("tierFamiliar") };
  };

  const buildPayload = (
    item: StackCategoryItem,
    categoryLabel: string,
  ): QuickDetailsData => {
    const slug = item.name.toLowerCase().replace(/[.\s]+/g, "-");
    const tier = tierFor(item.years);
    return {
      slug,
      title: item.name,
      category: categoryLabel,
      statusGlyph: tier.glyph,
      statusLabel: tier.label,
      description: item.description,
      fields: [
        { label: t("fieldYears"), value: `${item.years.toString().padStart(2, "0")} ${t("yearsSuffix")}` },
        { label: t("fieldCategory"), value: categoryLabel },
        { label: t("fieldTier"), value: tier.label },
      ],
      lists: item.useCases?.length
        ? [{ label: t("listUseCases"), items: item.useCases }]
        : [],
    };
  };

  const handleInspect = (item: StackCategoryItem, categoryLabel: string) => {
    setActive(buildPayload(item, categoryLabel));
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
        <div className="font-mono text-[0.6rem] text-muted/70 tracking-[0.28em] uppercase">
          // {t("viewMode")}
        </div>
        <div
          role="tablist"
          aria-label={t("viewMode")}
          className="inline-flex border border-border/70 bg-surface/40 clip-chip overflow-hidden backdrop-blur-sm"
        >
          <ToggleButton
            active={view === "category"}
            onClick={() => setView("category")}
          >
            {t("viewCategory")}
          </ToggleButton>
          <span className="w-px bg-border/70 self-stretch" aria-hidden />
          <ToggleButton
            active={view === "experience"}
            onClick={() => setView("experience")}
          >
            {t("viewExperience")}
          </ToggleButton>
        </div>
      </div>

      <LayoutGroup>
        {view === "category" ? (
          <div className="space-y-12">
            {stacks.map((category, idx) => (
              <div key={category.id} className="relative">
                <div className="flex items-center gap-4 mb-5">
                  <div className="font-mono text-[0.6rem] py-1 px-2 border border-accent/40 text-accent bg-accent/5 tracking-tight uppercase clip-chip">
                    CAT-{(idx + 1).toString().padStart(2, "0")}
                  </div>
                  <h3 className="font-mono text-xs text-fg tracking-[0.22em] uppercase font-bold">
                    {category.label}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-border/60 to-transparent" />
                  <span className="font-mono text-[0.58rem] text-muted/50 tracking-[0.2em]">
                    {t("modules", { count: category.items.length })}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {category.items.map((item) => (
                    <motion.div
                      key={`${category.id}-${item.name}`}
                      layout
                      layoutId={`${category.id}-${item.name}`}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 32,
                      }}
                    >
                      <StackChip
                        name={item.name}
                        icon={item.icon}
                        years={item.years}
                        onInspect={() => handleInspect(item, category.label)}
                        inspectLabel={tInspect("ariaInspect")}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="font-mono text-[0.6rem] py-1 px-2 border border-accent-2/40 text-accent-2 bg-accent-2/5 tracking-tight uppercase clip-chip">
                SORT::YRS
              </div>
              <h3 className="font-mono text-xs text-fg tracking-[0.22em] uppercase font-bold">
                {t("sortedByExperience")}
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-border/60 to-transparent" />
              <span className="font-mono text-[0.58rem] text-muted/50 tracking-[0.2em]">
                {t("modules", { count: flatSorted.length })}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {flatSorted.map((item) => (
                <motion.div
                  key={`${item.categoryId}-${item.name}`}
                  layout
                  layoutId={`${item.categoryId}-${item.name}`}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 32,
                  }}
                >
                  <StackChip
                    name={item.name}
                    icon={item.icon}
                    years={item.years}
                    categoryCode={CATEGORY_CODE[item.categoryId]}
                    onInspect={() => handleInspect(item, item.categoryLabel)}
                    inspectLabel={tInspect("ariaInspect")}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </LayoutGroup>

      <QuickDetailsModal
        data={active}
        onClose={() => setActive(null)}
        labels={{
          descriptionHeading: tInspect("descriptionHeading"),
          closeHint: tInspect("closeHint"),
          closeButton: tInspect("closeButton"),
          terminalSuffix: tInspect("terminalSuffix"),
          statCommand: tInspect("statCommand"),
        }}
      />
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`relative font-mono text-[0.62rem] tracking-[0.22em] uppercase py-2 px-4 transition-colors duration-300 ${
        active
          ? "text-bg bg-accent shadow-[0_0_25px_var(--color-glow-c)]"
          : "text-muted hover:text-accent"
      }`}
    >
      {children}
    </button>
  );
}
