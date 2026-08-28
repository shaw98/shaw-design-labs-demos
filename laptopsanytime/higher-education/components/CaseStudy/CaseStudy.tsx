import { externalLinks } from "@/lib/content";
import styles from "./CaseStudy.module.css";

export function CaseStudy() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Proven on real campuses</h2>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Texas A&amp;M University–Commerce</p>
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>The Challenge</h3>
          <p>
            The Gee Library&apos;s computer lab couldn&apos;t keep up with student
            demand, and commuter and nontraditional students needed access beyond what
            in-library laptop loans could offer.
          </p>
        </div>
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>The Approach</h3>
          <p>
            In fall 2013, the library piloted a self-service LaptopsAnytime kiosk with
            12 slots and 12 laptops — the first library kiosk of its kind in Texas.
            Demand required adding 12 more laptops almost immediately. In fall 2014, a
            second 12-slot kiosk was installed in the Student Center, chosen for its
            central, high-traffic location near the dorms, and a companion kiosk was
            added back in the library the same year.
          </p>
        </div>
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>The Experience</h3>
          <p>
            Students authenticate by swiping their student ID and agreeing to the terms
            of service. Staff can manage the system remotely, seeing when a location is
            running low and restocking it. &quot;Was the investment worth it? Yes, it
            was,&quot; the library&apos;s case study concludes.
          </p>
        </div>
        <a
          className={styles.cta}
          href={externalLinks.caseStudyPdf}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the Case Study
        </a>
      </div>
    </section>
  );
}
