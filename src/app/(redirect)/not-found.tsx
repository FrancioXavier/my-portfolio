"use client";

import { useEffect } from 'react';

export default function RootNotFound() {
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('locale') : null;
    const browser = (typeof navigator !== 'undefined' ? navigator.language : '')?.toLowerCase() ?? '';
    const locale: 'en' | 'pt' =
      stored === 'pt' || stored === 'en'
        ? stored
        : browser.startsWith('pt')
          ? 'pt'
          : 'en';

    window.location.replace(`/${locale}`);
  }, []);

  return null;
}
