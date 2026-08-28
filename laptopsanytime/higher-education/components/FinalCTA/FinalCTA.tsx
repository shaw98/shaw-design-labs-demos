"use client";

import { useVideoModal } from "@/components/video-modal/VideoModalProvider";
import { externalLinks } from "@/lib/content";
import styles from "./FinalCTA.module.css";

export function FinalCTA() {
  const { open } = useVideoModal();

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Give students technology when they need it.</h2>
      <p className={styles.subheading}>
        Let&apos;s talk about how self-service technology lending could work across
        your university.
      </p>
      <div className={styles.ctas}>
        <a
          className={styles.primaryCta}
          href={externalLinks.getQuote}
          target="_blank"
          rel="noopener noreferrer"
        >
          Request a Quote
        </a>
        <button type="button" className={styles.secondaryCta} onClick={open}>
          See How It Works
        </button>
      </div>
    </section>
  );
}
