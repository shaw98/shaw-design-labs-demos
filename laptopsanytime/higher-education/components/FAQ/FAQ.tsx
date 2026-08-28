"use client";

import { useState } from "react";
import { faqItems } from "@/lib/content";
import styles from "./FAQ.module.css";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Questions university technology teams ask</h2>
      <div className={styles.list}>
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          return (
            <div key={item.question} className={styles.item}>
              <button
                type="button"
                className={styles.question}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {item.question}
                <span className={styles.icon}>{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <p id={panelId} className={styles.answer}>
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
