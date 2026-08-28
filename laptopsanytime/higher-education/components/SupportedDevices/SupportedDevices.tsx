import { devices } from "@/lib/content";
import styles from "./SupportedDevices.module.css";

export function SupportedDevices() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>One system. Multiple campus technology needs.</h2>
      <ul className={styles.grid}>
        {devices.map((device, index) => (
          <li
            key={device.name}
            className={index === 0 ? `${styles.card} ${styles.primary}` : styles.card}
          >
            <h3 className={styles.cardTitle}>{device.name}</h3>
            <p className={styles.cardBody}>{device.description}</p>
          </li>
        ))}
      </ul>
      <p className={styles.qualifier}>
        Device compatibility and system configuration depend on the selected models and
        deployment requirements.
      </p>
    </section>
  );
}
