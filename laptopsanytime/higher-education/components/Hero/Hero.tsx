"use client";

import Image from "next/image";
import { useVideoModal } from "@/components/video-modal/VideoModalProvider";
import { externalLinks, heroImage } from "@/lib/content";
import styles from "./Hero.module.css";

export function Hero() {
  const { open } = useVideoModal();

  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Higher Education</p>
        <h1 className={styles.headline}>
          Self-Service Technology Lending for Higher Education
        </h1>
        <p className={styles.valueProp}>
          Give students secure, self-service access to laptops — without adding more
          work for your IT or library staff.
        </p>
        <p className={styles.supporting}>
          Automate checkout, return, charging and accountability for laptops,
          MacBooks, Chromebooks, tablets and portable chargers.
        </p>
        <div className={styles.ctas}>
          <button type="button" className={styles.primaryCta} onClick={open}>
            See How It Works
          </button>
          <a
            className={styles.secondaryCta}
            href={externalLinks.getQuote}
            target="_blank"
            rel="noopener noreferrer"
          >
            Request a Quote
          </a>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          sizes="(max-width: 800px) 100vw, 480px"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    </section>
  );
}
