import styles from "./BuyerProblem.module.css";

export function BuyerProblem() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          Technology access shouldn&apos;t stop when the service desk closes.
        </h2>
        <p className={styles.paragraph}>
          Students depend on laptops and other technology for coursework, research and
          campus life. Traditional lending programs can require library and IT teams
          to manually manage checkout, return and device availability.
        </p>
        <p className={styles.paragraph}>
          LaptopsAnytime helps automate those repetitive steps while allowing the
          university to maintain control over authentication, devices and program
          policies.
        </p>
      </div>
    </section>
  );
}
