"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./universities.module.css";
import { ALL_INSTITUTIONS, getLogoUrl, Institution } from "@/lib/institutions";

const INITIAL_COUNT = 24;
const INCREMENT = 24;

type FilterType = "all" | "university" | "corporate" | "platform";

export default function UniversitiesPage() {
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(INITIAL_COUNT);
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [failedLogos, setFailedLogos] = useState<Set<string>>(new Set());

  const filtered = ALL_INSTITUTIONS.filter(inst => {
    const matchesSearch = search.length < 2 || 
      inst.name.toLowerCase().includes(search.toLowerCase()) ||
      inst.country.toLowerCase().includes(search.toLowerCase()) ||
      inst.region.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || inst.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const visibleInstitutions = filtered.slice(0, visible);
  const remaining = filtered.length - visible;

  const handleLogoError = useCallback((slug: string) => {
    setFailedLogos(prev => new Set(prev).add(slug));
  }, []);

  return (
    <div className={styles.univPage}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.badge}>GLOBAL DIRECTORY</span>
          <h1>Universities & Providers</h1>
          <p>The world&apos;s most comprehensive index of {ALL_INSTITUTIONS.length}+ educational institutions and corporate providers.</p>
          
          <div className={styles.searchBox}>
            <input 
              type="text" 
              placeholder="Search for Harvard, Google, MIT, Oxford..." 
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisible(INITIAL_COUNT); }}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterBar}>
            {(["all", "university", "corporate", "platform"] as FilterType[]).map(t => (
              <button
                key={t}
                className={`${styles.filterBtn} ${typeFilter === t ? styles.filterActive : ""}`}
                onClick={() => { setTypeFilter(t); setVisible(INITIAL_COUNT); }}
              >
                {t === "all" ? `All (${ALL_INSTITUTIONS.length})` : 
                 `${t.charAt(0).toUpperCase() + t.slice(1)}s (${ALL_INSTITUTIONS.filter(i => i.type === t).length})`}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.resultCount}>
          Showing {Math.min(visible, filtered.length)} of {filtered.length} institutions
        </div>

        <div className={styles.grid}>
          {visibleInstitutions.map(inst => (
            <InstitutionCard
              key={inst.slug}
              inst={inst}
              logoFailed={failedLogos.has(inst.slug)}
              onLogoError={() => handleLogoError(inst.slug)}
            />
          ))}
          {filtered.length === 0 && (
            <div className={styles.empty}>No institutions found matching &quot;{search}&quot;.</div>
          )}
        </div>

        {remaining > 0 && (
          <div className={styles.loadMoreWrapper}>
            <button
              className={styles.loadMoreBtn}
              onClick={() => setVisible(prev => prev + INCREMENT)}
            >
              Load {Math.min(remaining, INCREMENT)} More of {remaining} Institutions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function InstitutionCard({ inst, logoFailed, onLogoError }: { inst: Institution; logoFailed: boolean; onLogoError: () => void }) {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`learnmora_follow_${inst.slug}`);
    if (saved === "true") setIsFollowing(true);
  }, [inst.slug]);

  const toggleFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    const newState = !isFollowing;
    setIsFollowing(newState);
    localStorage.setItem(`learnmora_follow_${inst.slug}`, String(newState));
  };

  const initials = inst.name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
  const typeLabel = inst.type === "university" ? "🎓" : inst.type === "corporate" ? "🏢" : "📚";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": inst.name,
    "url": `https://${inst.domain}`,
  };

  return (
    <div className={styles.card}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href={`/universities/${inst.slug}`} className={styles.cardLink}>
        <div className={styles.logoWrapper}>
          {!logoFailed ? (
            <Image
              src={getLogoUrl(inst.domain, inst.slug)}
              alt={`${inst.name} logo`}
              width={56}
              height={56}
              className={styles.logo}
              onError={onLogoError}
              loading="lazy"
              unoptimized
            />
          ) : (
            <div className={styles.logoFallback}>{initials}</div>
          )}
        </div>
        <div className={styles.cardInfo}>
          <h2>{inst.name}</h2>
          <div className={styles.cardMeta}>
            <span>{typeLabel} {inst.type.charAt(0).toUpperCase() + inst.type.slice(1)}</span>
            <span>📍 {inst.country}</span>
          </div>
          {inst.ranking && <div className={styles.rankBadge}>QS #{inst.ranking}</div>}
          <div className={styles.browseAction}>Browse →</div>
        </div>
      </Link>
      <button 
        className={`${styles.followBtn} ${isFollowing ? styles.followActive : ""}`}
        onClick={toggleFollow}
      >
        {isFollowing ? "✓ Following" : "+ Follow"}
      </button>
    </div>
  );
}
