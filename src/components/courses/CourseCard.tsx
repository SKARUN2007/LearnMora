"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Course } from "@/lib/courses";
import RoiModal from "./RoiModal";
import InstitutionLogo from "@/components/ui/InstitutionLogo";
import styles from "./CourseCard.module.css";

interface CourseCardProps extends Course {
  isComparisonView?: boolean;
}

export default function CourseCard(props: CourseCardProps) {
  const { isComparisonView = false, ...course } = props;
  const { title, provider, rating, duration, price, roi, isFree } = course;
  
  const { library, updateStatus, addToComparison, comparisonList } = useUser();
  const router = useRouter();
  
  const [showRoi, setShowRoi] = useState(false);
  const currentStatus = library[course.id];
  const isInComparison = comparisonList.some(c => c.id === course.id);

  const handleRoiClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isComparisonView) {
      setShowRoi(true);
    } else {
      router.push(`/career-impact/${course.id}`);
    }
  };

  return (
    <>
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.providerGroup}>
          <InstitutionLogo 
            src={`/assets/provider-logos/${provider.toLowerCase().replace(/\s+/g, '-')}.svg`} 
            alt={`Official ${provider} Institution Logo`} 
            fallbackInitials={provider.substring(0, 2).toUpperCase()} 
            size={24} 
          />
          <span className={styles.provider}>{provider}</span>
          {rating >= 4.8 && <span className={styles.topRatedBadge}>TOP RATED</span>}
          {isFree && <span className={styles.freeBadge}>FREE CERT</span>}
        </div>
        
        <button 
          className={`${styles.saveBtn} ${currentStatus === "interested" ? styles.saved : ""}`}
          onClick={(e) => { 
            e.preventDefault(); 
            updateStatus(course.id, currentStatus === "interested" ? "" as any : "interested"); 
          }}
          aria-label="Save Course"
        >
          {currentStatus === "interested" ? "❤️" : "🤍"}
        </button>
      </div>
      
      <h3 className={styles.title}>{title}</h3>
      
      <div className={styles.liveViews}>🔥 1,200+ professionals viewing</div>
      
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
        <a 
          href={`/api/out?course=${course.id}&provider=${encodeURIComponent(course.provider)}&title=${encodeURIComponent(course.title)}&ref=learnmora_elite&aff_id=LM_2026_PRO`}
          target="_blank" 
          rel="noopener noreferrer"
          className={`${styles.trackBtn} ${styles.active}`}
        >
          ENROLL NOW
        </a>
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
        <a 
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://learnmora.com/ai-credentials')}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkedinBtn}
        >
          Add to LinkedIn Profile
        </a>
      )}
      
      <button className={styles.viewBtn} onClick={handleRoiClick}>
        View Professional ROI
      </button>
    </div>
    
    {showRoi && <RoiModal course={course} onClose={() => setShowRoi(false)} />}
    </>
  );
}
