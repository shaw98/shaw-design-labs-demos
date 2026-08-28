import { benefits } from "@/lib/content";
import styles from "./Benefits.module.css";

export function Benefits() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        More access for students. Less repetitive work for staff.
      </h2>
      <ul className={styles.grid}>
        {benefits.map((benefit) => (
          <li key={benefit.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{benefit.title}</h3>
            <p className={styles.cardBody}>{benefit.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
