"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type VideoModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
};

const VideoModalContext = createContext<VideoModalContextValue | null>(null);

export function VideoModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    triggerRef.current = (document.activeElement as HTMLElement) ?? triggerRef.current;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  const value = useMemo(
    () => ({ isOpen, open, close, triggerRef }),
    [isOpen, open, close],
  );

  return (
    <VideoModalContext.Provider value={value}>{children}</VideoModalContext.Provider>
  );
}

export function useVideoModal() {
  const ctx = useContext(VideoModalContext);
  if (!ctx) {
    throw new Error("useVideoModal must be used within a VideoModalProvider");
  }
  return ctx;
}
