"use client";

import { useVideoModal } from "@/components/video-modal/VideoModalProvider";
import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    title: "Authenticate",
    description: "Students use approved university credentials to access the system.",
  },
  {
    title: "Check Out",
    description: "After authentication, an available device is securely released.",
  },
  {
    title: "Use",
    description:
      "Students take the technology where they need it for coursework, research or study.",
  },
  {
    title: "Return",
    description:
      "The device is returned to an available bay, secured and prepared for the next checkout.",
  },
];

export function HowItWorks() {
  const { open } = useVideoModal();

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        From student ID to laptop in a few simple steps.
      </h2>
      <ol className={styles.steps}>
        {STEPS.map((step, index) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.stepNumber}>{index + 1}</span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </li>
        ))}
      </ol>
      <button type="button" className={styles.watchButton} onClick={open}>
        Watch it in action
      </button>
    </section>
  );
}
