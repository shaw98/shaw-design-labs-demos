import Image from "next/image";
import { universities } from "@/lib/content";
import styles from "./TrustStrip.module.css";

export function TrustStrip() {
  return (
    <section className={styles.section} aria-label="Supporting higher education">
      <h2 className={styles.heading}>
        Supporting technology access across higher education
      </h2>
      <ul className={styles.grid}>
        {universities.map((uni) => (
          <li key={uni.name} className={styles.item}>
            <Image src={uni.imageSrc} alt={uni.alt} width={160} height={130} />
            <p className={styles.caption}>{uni.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
