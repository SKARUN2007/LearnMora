import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.info}>
            <Link href="/" className={styles.logo}>
              LEARN<span>MORA</span>
              <small className={styles.tagline}>Innovative EdTech Accelerator</small>
            </Link>
            <p className={styles.description}>
              The global ecosystem for professional excellence. Indexing top-tier courses, university degrees, and AI-driven career roadmaps.
            </p>
          </div>
          
          <div className={styles.navGroup}>
            <h3>Platform</h3>
            <Link href="/courses">Course Index</Link>
            <Link href="/universities">Provider Hubs</Link>
            <Link href="/roadmap">AI Roadmap</Link>
            <Link href="/deals">Price Tracker</Link>
          </div>

          <div className={styles.navGroup}>
            <h3>Resources</h3>
            <Link href="/blog">Best Free Certificates</Link>
            <Link href="/reviews">Course Reviews</Link>
            <Link href="/faq">Help Center</Link>
          </div>

          <div className={styles.navGroup}>
            <h3>Legal</h3>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/about">About Us</Link>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {currentYear} Learnmora Omni-Platform. All rights reserved.</p>
          <div className={styles.socials}>
            <a href="https://linkedin.com/company/learnmora" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com/learnmora" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
