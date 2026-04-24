"use client";

import { useUser } from "@/context/UserContext";
import styles from "./ComparisonEngine.module.css";
import { useState } from "react";

export default function ComparisonEngine() {
  const { comparisonList, removeFromComparison } = useUser();
  const [showModal, setShowModal] = useState(false);

  if (comparisonList.length === 0) return null;

  return (
    <>
      <div className={styles.stickyBar}>
        <div className={styles.barContainer}>
          <div className={styles.selectedCount}>
            <strong>{comparisonList.length}/3</strong> Courses Selected
          </div>
          <div className={styles.thumbs}>
            {comparisonList.map(course => (
              <div key={course.id} className={styles.selectedItem}>
                <span>{course.title}</span>
                <button onClick={() => removeFromComparison(course.id)}>✕</button>
              </div>
            ))}
          </div>
          
          <button className={styles.compareBtn} onClick={() => setShowModal(true)}>
            Compare Professional ROI
          </button>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Side-by-Side Comparison</h2>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>Close</button>
            </div>
            
            <div className={styles.comparisonTable}>
              <div className={styles.tableRow}>
                <div className={styles.label}>Provider</div>
                {comparisonList.map(c => <div key={c.id} className={styles.value}>{c.provider}</div>)}
              </div>
              <div className={styles.tableRow}>
                <div className={styles.label}>Price</div>
                {comparisonList.map(c => <div key={c.id} className={styles.value}>{c.price}</div>)}
              </div>
              <div className={styles.tableRow}>
                <div className={styles.label}>Duration</div>
                {comparisonList.map(c => <div key={c.id} className={styles.value}>{c.duration}</div>)}
              </div>
              <div className={styles.tableRow}>
                <div className={styles.label}>Market ROI</div>
                {comparisonList.map(c => <div key={c.id} className={styles.value}>+{c.roi}</div>)}
              </div>
              <div className={styles.tableRow}>
                <div className={styles.label}>Free Cert</div>
                {comparisonList.map(c => <div key={c.id} className={styles.value}>{c.isFree ? "✅" : "❌"}</div>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
