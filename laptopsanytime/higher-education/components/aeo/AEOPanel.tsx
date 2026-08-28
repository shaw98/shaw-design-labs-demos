"use client";

import { useState } from "react";
import { useAEO } from "./AEOContext";
import styles from "./AEOPanel.module.css";

const CHECKLIST = [
  "Clear Higher Education topic",
  "Buyer problem language",
  "Direct answers",
  "Product context",
  "Technical evaluation content",
  "Real-world proof",
  "Natural-language FAQs",
  "Strong conversion path",
];

function isNarrowViewport() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(max-width: 640px)").matches
  );
}

export function AEOPanel() {
  const { enabled } = useAEO();
  // On mobile the panel would otherwise open directly over the hero copy the
  // moment AEO mode turns on, and would fight the active annotation card for
  // the same bottom-sheet space — so it starts collapsed to a small tab there.
  const [collapsed, setCollapsed] = useState(isNarrowViewport);

  if (!enabled) return null;

  if (collapsed) {
    return (
      <button
        type="button"
        className={styles.collapsedTab}
        onClick={() => setCollapsed(false)}
        aria-expanded={false}
      >
        Why this page matters
      </button>
    );
  }

  return (
    <aside className={styles.panel} aria-label="Why this page matters">
      <div className={styles.header}>
        <h2 className={styles.heading}>Why this page matters</h2>
        <button
          type="button"
          className={styles.collapseButton}
          onClick={() => setCollapsed(true)}
          aria-expanded={true}
        >
          Hide
        </button>
      </div>
      <ul className={styles.list}>
        {CHECKLIST.map((item) => (
          <li key={item}>✓ {item}</li>
        ))}
      </ul>
      <p className={styles.footer}>
        AEO does not require redesigning the entire website. It adds missing pages and
        clearer information around specific buyer questions.
      </p>
    </aside>
  );
}
