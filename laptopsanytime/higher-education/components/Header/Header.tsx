import Image from "next/image";
import { externalLinks, logoImage } from "@/lib/content";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { label: "Solutions+", href: externalLinks.solutions },
  { label: "Popular Products+", href: externalLinks.productLines },
  { label: "How It Works", href: externalLinks.howItWorks },
  { label: "Architects Corner", href: externalLinks.architectsCorner },
  { label: "BRAINY", href: externalLinks.brainyAi },
  { label: "Get Quote", href: externalLinks.getQuote },
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <a
          href="https://www.laptopsanytime.com"
          className={styles.logoLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={logoImage.src} alt={logoImage.alt} width={220} height={30} />
        </a>
        <div className={styles.utility}>
          <a className={styles.phone} href="tel:1-877-836-3727">
            877-836-3727
          </a>
          <a
            className={styles.loginButton}
            href={externalLinks.login}
            target="_blank"
            rel="noopener noreferrer"
          >
            Login
          </a>
        </div>
      </div>
      <nav className={styles.nav} aria-label="LaptopsAnytime site navigation">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
