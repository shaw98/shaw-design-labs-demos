"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type AEOContextValue = {
  enabled: boolean;
  toggle: () => void;
  activeAnnotationId: number | null;
  activateAnnotation: (id: number) => void;
  dismissAnnotation: () => void;
};

const AEOContext = createContext<AEOContextValue | null>(null);

export function AEOProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [activeAnnotationId, setActiveAnnotationId] = useState<number | null>(null);

  const toggle = useCallback(() => {
    setEnabled((prev) => !prev);
    setActiveAnnotationId(null);
  }, []);

  const activateAnnotation = useCallback((id: number) => {
    setActiveAnnotationId((prev) => (prev === id ? null : id));
  }, []);

  const dismissAnnotation = useCallback(() => {
    setActiveAnnotationId(null);
  }, []);

  const value = useMemo(
    () => ({ enabled, toggle, activeAnnotationId, activateAnnotation, dismissAnnotation }),
    [enabled, toggle, activeAnnotationId, activateAnnotation, dismissAnnotation],
  );

  return <AEOContext.Provider value={value}>{children}</AEOContext.Provider>;
}

export function useAEO() {
  const ctx = useContext(AEOContext);
  if (!ctx) {
    throw new Error("useAEO must be used within an AEOProvider");
  }
  return ctx;
}
