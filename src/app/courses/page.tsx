"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import CourseCard from "@/components/courses/CourseCard";
import { TAGGED_COURSES } from "@/lib/dynamicTaxonomy";
import SmartSidebar from "@/components/courses/SmartSidebar";
import ComparisonPanel from "@/components/courses/ComparisonPanel";
import styles from "./courses.module.css";

const ADS = [
  { university: "Harvard University", title: "Master of Liberal Arts, Data Science", link: "#" },
  { university: "Stanford Online", title: "Professional Certificate in AI Strategy", link: "#" },
  { university: "MIT xPro", title: "Executive Program in Digital Transformation", link: "#" }
];

export default function CourseDirectory() {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAdIndex(prev => (prev + 1) % ADS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const [isFreeOnly, setIsFreeOnly] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  
  // ... (keep useMemo and other logic same, just adding ComparisonPanel at the bottom)
  const sortedBase = useMemo(() => {
    const topProviders = ["Google", "Meta", "Harvard University", "MIT", "Stanford University", "IBM"];
    return [...TAGGED_COURSES].sort((a, b) => {
      const aIsTop = topProviders.includes(a.provider);
      const bIsTop = topProviders.includes(b.provider);
      if (aIsTop && !bIsTop) return -1;
      if (!aIsTop && bIsTop) return 1;
      return 0;
    });
  }, []);

  // Filter logic across the full dataset
  const filteredCourses = useMemo(() => {
    let result = sortedBase;
    
    if (isFreeOnly) {
      result = result.filter(c => c.isFree);
    }
    
    if (selectedTags.size > 0) {
      result = result.filter(c => 
        Array.from(selectedTags).some(tag => 
          c.tier1 === tag || c.tier2 === tag || c.tier3Tags.includes(tag)
        )
      );
    }
    
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) ||
        c.provider.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
      );
    }
    
    return result;
  }, [sortedBase, isFreeOnly, selectedTags, search]);

  // Infinite Scroll Simulation: Start with 20, add 20 as user scrolls
  const [visibleCount, setVisibleCount] = useState(20);
  
  const loadMore = useCallback(() => {
    if (visibleCount < filteredCourses.length) {
      setVisibleCount(prev => Math.min(prev + 20, filteredCourses.length));
    }
  }, [visibleCount, filteredCourses.length]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(20);
  }, [isFreeOnly, selectedTags, search]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }, []);

  return (
    <div className={styles.coursesPage}>
      <div className={styles.leaderboardSlot}>
        <div className={styles.adLabel}>FEATURED ACADEMIC PATHWAY</div>
        <div className={styles.adContent}>
           <strong>{ADS[currentAdIndex].university}</strong>: {ADS[currentAdIndex].title}{' '}
           <a href={ADS[currentAdIndex].link} className={styles.adCta}>Learn More →</a>
        </div>
      </div>

      <div className={styles.container}>
        
        <SmartSidebar 
          selectedTags={selectedTags} 
          onTagToggle={toggleTag} 
          isFreeOnly={isFreeOnly} 
          setIsFreeOnly={setIsFreeOnly} 
        />

        <main className={styles.mainContent}>
          <div className={styles.header}>
            <h1>Professional Course Index</h1>
            <div className={styles.searchBar}>
              <input 
                type="text" 
                placeholder="Search 5,000+ courses, providers, or skills..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.resultsCount}>
            Found {filteredCourses.length.toLocaleString()} professional paths matching your criteria.
          </div>

          <div className={styles.gridWrapper}>
            <VirtuosoGrid
              useWindowScroll
              totalCount={Math.min(visibleCount, filteredCourses.length)}
              endReached={loadMore}
              listClassName={styles.grid}
              itemContent={(index) => {
                const course = filteredCourses[index];
                if (!course) return null;
                return <CourseCard key={course.id} {...course} />;
              }}
            />
          </div>
        </main>
        <ComparisonPanel />
      </div>
    </div>
  );
}
