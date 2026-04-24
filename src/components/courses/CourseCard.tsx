"use client";

import { useUser } from "@/context/UserContext";
import { Course } from "@/lib/courses";
import styles from "./CourseCard.module.css";

export default function CourseCard(course: Course) {
  const { title, provider, rating, duration, price, roi, isFree } = course;
  const { library, updateStatus, addToComparison, comparisonList } = useUser();
  
  const currentStatus = library[course.id];
  const isInComparison = comparisonList.some(c => c.id === course.id);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.provider}>{provider}</span>
        {isFree && <span className={styles.freeBadge}>FREE CERT</span>}
      </div>
      
      <h3 className={styles.title}>{title}</h3>
      
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.icon}>⭐</span>
          <span>{rating.toFixed(1)}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.icon}>⏱️</span>
          <span>{duration}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button 
          className={`${styles.trackBtn} ${currentStatus ? styles.active : ""}`}
          onClick={() => updateStatus(course.id, "interested")}
        >
          {currentStatus ? currentStatus.toUpperCase() : "TRACK"}
        </button>
        <button 
          className={`${styles.compareBtn} ${isInComparison ? styles.active : ""}`}
          onClick={() => addToComparison(course)}
        >
          {isInComparison ? "SELECTED" : "COMPARE"}
        </button>
      </div>

      <div className={styles.footer}>
        <div className={styles.priceContainer}>
          <span className={styles.price}>{price}</span>
          <span className={styles.pace}>Self-Paced</span>
        </div>
        <div className={styles.roiBadge} title="Estimated Salary Growth Impact">
          ROI: +{roi}
        </div>
      </div>
      

      {currentStatus === "completed" && (
        <button 
          className={styles.linkedinBtn}
          onClick={(e) => { e.stopPropagation(); alert("Syncing with LinkedIn Profile API...") }}
        >
          Add to LinkedIn Profile
        </button>
      )}
      
      <button className={styles.viewBtn}>View Professional ROI</button>
    </div>
  );
}
