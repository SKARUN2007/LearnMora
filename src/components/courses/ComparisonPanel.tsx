"use client";

import { useUser } from "@/context/UserContext";
import styles from "./ComparisonPanel.module.css";
import { X } from "lucide-react";

export default function ComparisonPanel() {
  const { comparisonList, removeFromComparison } = useUser();

  if (comparisonList.length === 0) return null;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3>Compare Certificates ({comparisonList.length}/3)</h3>
      </div>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Feature</th>
              {comparisonList.map(course => (
                <th key={course.id}>
                  <div className={styles.courseHeader}>
                    <span>{course.title}</span>
                    <button onClick={() => removeFromComparison(course.id)} className={styles.removeBtn}>
                      <X size={14} />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ROI Impact</td>
              {comparisonList.map(c => <td key={c.id} className={styles.roi}>+{c.roi}</td>)}
            </tr>
            <tr>
              <td>Duration</td>
              {comparisonList.map(c => <td key={c.id}>{c.duration}</td>)}
            </tr>
            <tr>
              <td>Provider</td>
              {comparisonList.map(c => <td key={c.id}>{c.provider}</td>)}
            </tr>
            <tr>
              <td>Price</td>
              {comparisonList.map(c => <td key={c.id} className={c.isFree ? styles.free : ""}>{c.price}</td>)}
            </tr>
            <tr>
              <td>Difficulty</td>
              {comparisonList.map(c => <td key={c.id}>Intermediate</td>)}
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <button className={styles.enrollAllBtn}>Enroll in Selection</button>
      </div>
    </div>
  );
}
