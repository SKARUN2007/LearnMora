"use client";

import { useState, useEffect, useCallback } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import CourseCard from "@/components/courses/CourseCard";
import { TAGGED_COURSES } from "@/lib/dynamicTaxonomy";
import SmartSidebar from "@/components/courses/SmartSidebar";
import styles from "./courses.module.css";

export default function CourseDirectory() {
  const [isFreeOnly, setIsFreeOnly] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [filteredCourses, setFilteredCourses] = useState(TAGGED_COURSES);
  const [search, setSearch] = useState("");

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }, []);

  useEffect(() => {
    let result = TAGGED_COURSES;
    if (isFreeOnly) {
      result = result.filter(c => c.isFree);
    }
    if (selectedTags.size > 0) {
      result = result.filter(c => {
        // Match if course matches ANY selected tag (OR logic)
        return Array.from(selectedTags).some(tag => 
          c.tier1 === tag || c.tier2 === tag || c.tier3Tags.includes(tag)
        );
      });
    }
    if (search) {
      result = result.filter(c => 
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.provider.toLowerCase().includes(search.toLowerCase()) ||
        c.university?.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredCourses(result);
  }, [isFreeOnly, selectedTags, search]);

  return (
    <div className={styles.coursesPage}>
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
                placeholder="Search courses, providers, or universities..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.resultsCount}>
            Found {filteredCourses.length} professional paths matching your criteria.
          </div>

          <div style={{ minHeight: '1000px' }}>
            <VirtuosoGrid
              useWindowScroll
              totalCount={filteredCourses.length}
              listClassName={styles.grid}
              itemContent={(index) => {
                const course = filteredCourses[index];
                return <CourseCard key={course.id} {...course} />;
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
