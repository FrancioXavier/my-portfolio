"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export function BootSequence() {
  const t = useTranslations("boot");
  const [text, setText] = useState("");

  useEffect(() => {
    const lines = t.raw("lines") as string[];

    let currentLine = 0;
    let currentChar = 0;
    let currentText = "";
    let timeoutId: NodeJS.Timeout;

    const typeWriter = () => {
      if (currentLine < lines.length) {
        if (currentChar < lines[currentLine].length) {
          currentText += lines[currentLine].charAt(currentChar);
          setText(currentText + "█");
          currentChar++;
          timeoutId = setTimeout(typeWriter, 15 + Math.random() * 20);
        } else {
          currentText += "\n";
          setText(currentText + "█");
          currentLine++;
          currentChar = 0;
          timeoutId = setTimeout(typeWriter, 200 + Math.random() * 200);
        }
      } else {
        setText(currentText);
      }
    };

    timeoutId = setTimeout(typeWriter, 200);

    return () => clearTimeout(timeoutId);
  }, [t]);

  return (
    <pre className="font-mono text-[0.7rem] text-muted leading-[1.9] mb-10 whitespace-pre min-h-[5.6em] animate-fade-up opacity-0" style={{ animationDelay: "0.1s" }}>
      {text}
    </pre>
  );
}
