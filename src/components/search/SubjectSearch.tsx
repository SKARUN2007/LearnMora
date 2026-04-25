"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./SubjectSearch.module.css";
// We need to import ALL_DEPARTMENTS from taxonomy, but since taxonomy is mostly data, we can import it.
import { ALL_DEPARTMENTS } from "@/lib/taxonomy";

export default function SubjectSearch() {
  const [query, setQuery] = useState("");

  const filtered = query.length > 1 
    ? ALL_DEPARTMENTS.filter(d => 
        d.name.toLowerCase().includes(query.toLowerCase()) || 
        d.pillar.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className={styles.searchContainer}>
      <input 
        type="text" 
        className={styles.searchInput}
        placeholder="Search for a department, skill, or niche... (e.g. Artificial Intelligence, Marketing)"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {filtered.length > 0 && (
        <div className={styles.searchResults}>
          {filtered.map(dept => (
            <Link 
              key={dept.slug} 
              href={`/department/${dept.pillarSlug}/${dept.slug}`}
              className={styles.resultItem}
            >
              <span className={styles.resultName}>{dept.name}</span>
              <span className={styles.resultPillar}>in {dept.pillar}</span>
            </Link>
          ))}
        </div>
      )}
      {query.length > 1 && filtered.length === 0 && (
        <div className={styles.searchResults}>
          <div className={styles.noResult}>No departments found matching "{query}"</div>
        </div>
      )}
    </div>
  );
}
