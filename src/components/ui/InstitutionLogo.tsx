"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "@/app/page.module.css";

interface Props {
  src: string;
  alt: string;
  fallbackInitials: string;
  size?: number;
}

export default function InstitutionLogo({ src, alt, fallbackInitials, size = 32 }: Props) {
  const [errorCount, setErrorCount] = useState(0);

  // Extract domain for fallback if needed
  const domain = src.split('/').pop() || "";

  // Generate deterministic "brand" color for the monogram fallback
  const charCode = fallbackInitials.charCodeAt(0) || 0;
  const colors = ["#001f3f", "#d4af37", "#003366", "#4a5568", "#10b981", "#ef4444"];
  const bgColor = colors[charCode % colors.length];

  const inlineSize = { width: size, height: size };

  // If both external APIs fail, show initials
  if (errorCount >= 2) {
    return (
      <div 
        className={styles.premiumMonogram} 
        style={{ backgroundColor: bgColor, ...inlineSize }}
        aria-label={alt}
      >
        {fallbackInitials}
      </div>
    );
  }

  // Stage 1: Try primary (UpLead)
  // Stage 2: Try secondary (Google Favicon V2)
  const currentSrc = errorCount === 1 
    ? `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${domain}&size=128`
    : src;

  return (
    <Image 
      src={currentSrc} 
      alt={alt} 
      width={size} 
      height={size} 
      style={inlineSize}
      className={styles.dynamicLogo} 
      onError={() => setErrorCount(prev => prev + 1)}
      loading="lazy"
      unoptimized 
    />
  );
}
