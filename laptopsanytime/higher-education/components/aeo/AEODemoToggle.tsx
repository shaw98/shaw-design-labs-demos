"use client";

import { useAEO } from "./AEOContext";
import styles from "./AEODemoToggle.module.css";

export function AEODemoToggle() {
  const { enabled, toggle } = useAEO();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label="AEO Demo"
      className={styles.toggle}
      onClick={toggle}
    >
      <span className={styles.label}>AEO Demo</span>
      <span className={styles.state}>{enabled ? "ON" : "OFF"}</span>
    </button>
  );
}
