"use client";

import { useEffect } from "react";
import { useAEO } from "./AEOContext";
import styles from "./AEOAnnotation.module.css";

export function AEOAnnotation({
  id,
  title,
  explanation,
  children,
  markerPosition = "top-left",
}: {
  id: number;
  title: string;
  explanation: string;
  children: React.ReactNode;
  /**
   * "top-right" is for an annotation that wraps a container whose first child
   * is itself annotated (e.g. the page-wide "architecture" annotation around
   * <main>, which otherwise stacks its marker exactly on top of the hero
   * section's "top-left" marker at the same corner).
   */
  markerPosition?: "top-left" | "top-right";
}) {
  const { enabled, activeAnnotationId, activateAnnotation, dismissAnnotation } = useAEO();
  const isActive = activeAnnotationId === id;
  const cardId = `aeo-annotation-card-${id}`;

  useEffect(() => {
    if (!isActive) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") dismissAnnotation();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive, dismissAnnotation]);

  return (
    <div className={styles.wrapper}>
      {children}
      {enabled && (
        <div className={styles.overlay}>
          <button
            type="button"
            className={
              markerPosition === "top-right"
                ? `${styles.marker} ${styles.markerTopRight}`
                : styles.marker
            }
            aria-expanded={isActive}
            aria-controls={cardId}
            aria-label={`AEO annotation ${id}: ${title}`}
            onClick={() => activateAnnotation(id)}
          >
            {id}
          </button>
          {isActive && (
            <div
              id={cardId}
              className={
                markerPosition === "top-right"
                  ? `${styles.card} ${styles.cardTopRight}`
                  : styles.card
              }
              role="group"
              aria-label={title}
            >
              <p className={styles.cardTitle}>
                {id}. {title}
              </p>
              <p className={styles.cardBody}>{explanation}</p>
              <button
                type="button"
                className={styles.closeCard}
                onClick={dismissAnnotation}
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
