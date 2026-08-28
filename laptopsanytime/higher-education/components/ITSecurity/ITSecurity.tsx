import styles from "./ITSecurity.module.css";

const SUBSECTIONS = [
  {
    title: "Authentication",
    body: "LaptopsAnytime supports multiple authentication approaches, including SSO availability, AD/LDAP credentials and other supported university credential methods depending on the deployment.",
  },
  {
    title: "University Control",
    body: "Your university remains in control of the software image, device policies and supported management tools used on the laptops or tablets being dispensed.",
  },
  {
    title: "Network / Kiosk Security",
    body: "Kiosks run on a Linux-based operating environment with regular security scans. Network exposure is limited to an outgoing-only SSL connection, with temporary VPN access used only when needed for setup or support.",
  },
  {
    title: "Device Management",
    body: "The system can support university device-management and reset workflows so shared equipment can be prepared for the next authorized user.",
  },
];

export function ITSecurity() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        Built to work with your IT environment — not around it.
      </h2>
      <div className={styles.grid}>
        {SUBSECTIONS.map((sub) => (
          <div key={sub.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{sub.title}</h3>
            <p className={styles.cardBody}>{sub.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
