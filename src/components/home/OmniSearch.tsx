"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import styles from "./OmniSearch.module.css";
import { Course } from "@/lib/courses";
import InstitutionLogo from "@/components/ui/InstitutionLogo";
import { ALL_INSTITUTIONS, getLogoUrl } from "@/lib/institutions";

const featuredTags = [
  { label: "Free Certificates", href: "/subjects/free" },
  { label: "AI & Career", href: "/department/technology/artificial-intelligence" },
  { label: "Computer Science", href: "/department/technology" },
  { label: "Finance", href: "/department/business-finance/finance" },
];

export default function OmniSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Course[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    
    if (query.trim().length > 1) {
      setShowDropdown(true);
      setIsSearching(true);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          const data = await res.json();
          setResults(data.results || []);
        } catch (e) {
          console.error(e);
        } finally {
          setIsSearching(false);
        }
      }, 300);
    } else {
      setResults([]);
      setShowDropdown(false);
      setIsSearching(false);
    }

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [query]);

  const handleTagClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    setQuery(label);
  };

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/courses?query=${encodeURIComponent(query)}`);
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getInitials = (name: string) => name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchBar}>
        <span className={styles.icon}><Search size={20} /></span>
        <input
          type="text"
          placeholder="Generative AI Specialist|"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if(query.length > 1) setShowDropdown(true); }}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          onKeyDown={handleKeyDown}
          className={styles.input}
        />
        <button 
          onClick={handleSearch}
          className={`${styles.searchBtn} ${styles.activeBtn}`}
        >
          Search Hub
        </button>
      </div>
      
      {showDropdown && (
        <div className={styles.suggestions}>
          {isSearching ? (
            <div className={styles.emptyState}>Searching...</div>
          ) : results.length > 0 ? (
            results.map((course) => {
              const institution = ALL_INSTITUTIONS.find(i => i.name === course.provider || i.name === course.university);
              const logoSrc = institution ? getLogoUrl(institution.domain, institution.slug) : "";
              
              return (
                <div key={course.id} className={styles.suggestionItem} onClick={() => router.push(`/career-impact/${course.id}`)}>
                  <div className={styles.resultLogo}>
                    {logoSrc ? (
                      <InstitutionLogo src={logoSrc} alt={course.provider} fallbackInitials={getInitials(course.provider)} />
                    ) : (
                      <div className={styles.logoFallback}>{getInitials(course.provider)}</div>
                    )}
                  </div>
                  <div className={styles.resultContent}>
                    <div className={styles.resultTitle}>{course.title}</div>
                    <div className={styles.resultProvider}>{course.provider}</div>
                  </div>
                  <div className={styles.resultRoi}>
                    {course.isFree && <span className={styles.freeBadge}>FREE</span>}
                    ROI: +{course.roi}
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.emptyState}>
              No courses found. Try searching for 'Python' or 'Harvard'.
            </div>
          )}
        </div>
      )}

      <div className={styles.pillContainer}>
        <span className={styles.pillLabel}>Popular:</span>
        <div className={styles.pillScroll}>
          {featuredTags.map(tag => (
            <button key={tag.label} onClick={(e) => handleTagClick(e, tag.label)} className={styles.pillBtn}>
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
