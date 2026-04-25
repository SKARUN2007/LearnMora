"use client";

import { useState } from "react";
import styles from "./LoadMore.module.css";

interface LoadMoreProps {
  children: React.ReactNode[];
  initialCount?: number;
  increment?: number;
}

export default function LoadMore({ children, initialCount = 12, increment = 12 }: LoadMoreProps) {
  const [visible, setVisible] = useState(initialCount);

  const visibleItems = children.slice(0, visible);
  const remaining = children.length - visible;

  return (
    <>
      {visibleItems}
      {remaining > 0 && (
        <div className={styles.loadMoreWrapper}>
          <button
            className={styles.loadMoreBtn}
            onClick={() => setVisible(prev => prev + increment)}
          >
            Show {Math.min(remaining, increment)} More of {remaining} Programs
          </button>
        </div>
      )}
    </>
  );
}
