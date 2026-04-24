"use client";

import { useState, useEffect } from "react";
import CourseCard from "@/components/courses/CourseCard";
import { COURSES, Course } from "@/lib/courses";
import styles from "./courses.module.css";

export default function CourseDirectory() {
  const [isFreeOnly, setIsFreeOnly] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(COURSES);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let result = COURSES;
    if (isFreeOnly) {
      result = result.filter(c => c.isFree);
    }
    if (search) {
      result = result.filter(c => 
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.provider.toLowerCase().includes(search.toLowerCase()) ||
        c.university?.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredCourses(result);
  }, [isFreeOnly, search]);

  return (
    <div className={styles.coursesPage}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>The Gold Filter</h3>
            <label className={styles.toggleLabel}>
              <input 
                type="checkbox" 
                checked={isFreeOnly} 
                onChange={(e) => setIsFreeOnly(e.target.checked)} 
              />
              <span className={styles.toggleSlider}></span>
              <span className={styles.labelTitle}>100% Free Professional Certificates</span>
            </label>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Subjects</h3>
            <div className={styles.subjectList}>
              <label><input type="checkbox" defaultChecked /> Technology</label>
              <label><input type="checkbox" /> Business</label>
              <label><input type="checkbox" /> Health & Biotech</label>
              <label><input type="checkbox" /> Humanities</label>
            </div>
          </div>
          
          <div className={styles.sidebarAd}>
            <div className={styles.adLabel}>SPONSORED</div>
            <div className={styles.adPlaceholderSidebar}>Sidebar Sticky Ad</div>
          </div>
        </aside>

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

          <div className={styles.grid}>
            {filteredCourses.map(course => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
