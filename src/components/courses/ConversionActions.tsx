"use client";

import { useState, useEffect } from "react";
import { Course } from "@/lib/courses";
import { useUser } from "@/context/UserContext";
import styles from "./ConversionActions.module.css";
import AuthOverlay from "@/components/ui/AuthOverlay";
import LeavingModal from "@/components/ui/LeavingModal";

interface ConversionActionsProps {
  course: Course;
}

export default function ConversionActions({ course }: ConversionActionsProps) {
  const { user, library, updateStatus } = useUser();
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);
  const [showDidEnrollPrompt, setShowDidEnrollPrompt] = useState(false);

  const isTracked = library[course.id] === "interested";

  useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden && hasRedirected && !isTracked) {
        // User came back from the affiliate link!
        setShowDidEnrollPrompt(true);
        setHasRedirected(false); // Reset to prevent infinite loops
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [hasRedirected, isTracked]);

  const getProviderBrand = (provider: string) => {
    const slug = provider.toLowerCase();
    if (slug.includes("microsoft") || slug.includes("coursera") || slug.includes("ibm") || slug.includes("linkedin")) return { bg: "#0056D2", color: "#FFF" }; 
    if (slug.includes("harvard") || slug.includes("mit")) return { bg: "#A51C30", color: "#FFF" }; 
    if (slug.includes("google")) return { bg: "#4285F4", color: "#FFF" }; 
    if (slug.includes("aws")) return { bg: "#FF9900", color: "#232F3E" }; 
    if (slug.includes("nvidia")) return { bg: "#76B900", color: "#000" }; 
    return { bg: "var(--primary)", color: "#FFF" }; 
  };

  const currentBrand = getProviderBrand(course.provider);

  const handleEnrollClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let the default href target="_blank" work so mobile pop-up blockers don't trigger.
    console.info(`[Analytics] Referral Pass-through: ${course.provider}, ID: ${course.id}`);
    
    setIsLeaving(true);
    setHasRedirected(true);

    // Automatic Progress Capture:
    // "Once user clicks Enroll, trigger a background event that marks the course as 'Interested' in their dashboard"
    if (!isTracked) {
      await updateStatus(course.id, "interested");
    }

    // Hide transition modal after 2 seconds
    setTimeout(() => {
      setIsLeaving(false);
    }, 2000);
  };

  const handleTrackClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDidEnrollPrompt(false);
    await updateStatus(course.id, "interested");
    
    if (!user) {
      setShowAuthOverlay(true);
    }
  };

  const affiliateUrl = `/api/out?course=${course.id}&provider=${encodeURIComponent(course.provider)}&title=${encodeURIComponent(course.title)}&ref=learnmora_main`;

  return (
    <>
      <div className={styles.conversionAction}>
        <h3>Ready to lock in this trajectory?</h3>
        <p>Enroll directly with {course.provider} or track it securely in your personal roadmap.</p>
        
        {showDidEnrollPrompt && (
          <div className={styles.didEnrollPrompt}>
            <p>Welcome back! Did you start the <strong>{course.title}</strong> module?</p>
            <button className={styles.quickTrackBtn} onClick={handleTrackClick}>
              Yes, track my progress!
            </button>
            <button className={styles.dismissBtn} onClick={() => setShowDidEnrollPrompt(false)}>
              Not yet
            </button>
          </div>
        )}

        <div className={styles.btnGroup} style={{ display: showDidEnrollPrompt ? 'none' : 'flex' }}>
          <a 
            href={affiliateUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.primaryBtn}
            style={{ backgroundColor: currentBrand.bg, color: currentBrand.color }}
            onClick={handleEnrollClick}
          >
            {isLeaving ? (
              <span className={styles.loadingText}>Loading Secure Link...</span>
            ) : (
              <>Enroll via {course.provider} <span className={styles.externalIcon}>🔗</span></>
            )}
          </a>
          
          <button 
            className={`${styles.secondaryBtn} ${isTracked ? styles.trackedState : ""}`}
            onClick={handleTrackClick}
            disabled={isTracked}
          >
            {isTracked ? "Successfully Tracked ✅" : "Track in Dashboard"}
          </button>
        </div>
      </div>

      {isLeaving && <LeavingModal provider={course.provider} courseTitle={course.title} />}
      {showAuthOverlay && <AuthOverlay onClose={() => setShowAuthOverlay(false)} />}
    </>
  );
}
