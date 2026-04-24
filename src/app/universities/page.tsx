"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./universities.module.css";
import { getProviders } from "@/lib/courses";

export default function UniversitiesPage() {
  const [providers, setProviders] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  const filteredProviders = providers.filter(p => 
    p.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.univPage}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.badge}>GLOBAL INSTITUTIONS</span>
          <h1>Universities & Providers</h1>
          <p>Explore certifications from the world's leading educational and corporate institutions.</p>
          
          <div className={styles.searchBox}>
            <input 
              type="text" 
              placeholder="Search for Harvard, Google, MIT..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.grid}>
          {filteredProviders.map(provider => {
            // Generating initials for a simple placeholder logo
            const initials = provider.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
            
            return (
              <Link key={provider} href={`/universities/${encodeURIComponent(provider.toLowerCase().replace(/\s+/g, '-'))}`} className={styles.card}>
                <div className={styles.providerLogo}>{initials}</div>
                <div className={styles.cardInfo}>
                  <h2>{provider}</h2>
                  <div className={styles.viewBadge}>View Credentials</div>
                </div>
              </Link>
            );
          })}
          {filteredProviders.length === 0 && (
            <div className={styles.empty}>No institutions found matching "{search}".</div>
          )}
        </div>
      </div>
    </div>
  );
}
