import { useCases } from "@/lib/content";
import styles from "./UniversityUseCases.module.css";

export function UniversityUseCases() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Built for the places students already learn.</h2>
      <ul className={styles.grid}>
        {useCases.map((useCase) => (
          <li key={useCase.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{useCase.title}</h3>
            <p className={styles.cardBody}>{useCase.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
