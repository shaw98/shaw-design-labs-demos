"use client";

import { useEffect, useRef } from "react";
import { useVideoModal } from "./VideoModalProvider";
import styles from "./VideoModal.module.css";

const FOCUSABLE_SELECTOR = 'button, a[href], iframe, [tabindex]:not([tabindex="-1"])';

export function VideoModal({ videoId }: { videoId: string }) {
  const { isOpen, close } = useVideoModal();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeButton = dialogRef.current?.querySelector<HTMLElement>(
      '[data-close-button="true"]',
    );
    closeButton?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusables = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} data-testid="video-modal-backdrop" onClick={close}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="See LaptopsAnytime in Action"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          data-close-button="true"
          onClick={close}
        >
          Close video
        </button>
        <h2 className={styles.title}>See LaptopsAnytime in Action</h2>
        <p className={styles.subtitle}>
          See students experience self-service technology lending in a real university
          environment.
        </p>
        <div className={styles.videoWrapper}>
          <iframe
            title="LaptopsAnytime higher education kiosk walkthrough"
            src={`https://www.youtube.com/embed/${videoId}?rel=0`}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className={styles.processSteps}>Authenticate → Check Out → Use → Return</p>
      </div>
    </div>
  );
}
