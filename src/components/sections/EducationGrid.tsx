"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { EducationCard } from "@/components/cards/EducationCard";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import {
  QuickDetailsModal,
  type QuickDetailsData,
} from "@/components/effects/QuickDetailsModal";
import type { Education } from "@/types/content";

interface EducationGridProps {
  education: Education[];
  activeLabel: string;
}

export function EducationGrid({ education, activeLabel }: EducationGridProps) {
  const tEdu = useTranslations("education");
  const tInspect = useTranslations("inspect");
  const [active, setActive] = useState<QuickDetailsData | null>(null);
  const isSingle = education.length === 1;

  const buildPayload = (item: Education): QuickDetailsData => {
    const slug = item.degree
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const cleanSchool = item.school.replace(/^\/+\s*/, "");
    return {
      slug,
      title: item.degree,
      category: cleanSchool,
      statusGlyph: item.status ? "●" : undefined,
      statusLabel: item.status,
      description: item.description,
      fields: [
        { label: tEdu("fieldPeriod"), value: item.period },
        ...(item.focus
          ? [{ label: tEdu("fieldFocus"), value: item.focus }]
          : []),
      ],
      lists: item.coursework?.length
        ? [{ label: tEdu("listCoursework"), items: item.coursework }]
        : [],
    };
  };

  return (
    <>
      <div
        className={
          isSingle
            ? "max-w-[640px]"
            : "grid grid-cols-1 md:grid-cols-2 gap-6"
        }
      >
        {education.map((item, index) => (
          <ScrollReveal key={index} delay={index * 0.05}>
            <EducationCard
              education={item}
              activeLabel={activeLabel}
              onInspect={() => setActive(buildPayload(item))}
              inspectLabel={tInspect("ariaInspect")}
            />
          </ScrollReveal>
        ))}
      </div>

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
    </>
  );
}
