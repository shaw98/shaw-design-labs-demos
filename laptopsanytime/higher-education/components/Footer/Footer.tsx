import { externalLinks } from "@/lib/content";
import styles from "./Footer.module.css";

const QUICK_LINKS = [
  { label: "Overview", href: "https://www.laptopsanytime.com" },
  { label: "BRAINY AI Suite", href: externalLinks.brainyAi },
  { label: "Architects Corner", href: externalLinks.architectsCorner },
  { label: "How It Works", href: externalLinks.howItWorks },
  { label: "Get Quote", href: externalLinks.getQuote },
];

const SYSTEMS_FOR = [
  "Laptops",
  "Chromebooks",
  "Tablets",
  "110V Power Chargers",
  "Repair Depot",
  "Smart Vending",
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div>
          <h2 className={styles.heading}>Quick Links</h2>
          <ul className={styles.list}>
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={styles.heading}>Systems For</h2>
          <ul className={styles.list}>
            {SYSTEMS_FOR.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className={styles.company}>Java Connections LLC dba LaptopsAnytime</p>
          <p>17304 Preston Road, Suite 800, Dallas, TX 75252</p>
          <p>
            TEL: <a href="tel:1-877-836-3727">877-836-3727</a> | INFO@LAPTOPSANYTIME.COM
          </p>
        </div>
      </div>
      <p className={styles.copyright}>© 2025 by LaptopsAnytime, All Rights Reserved</p>
    </footer>
  );
}
