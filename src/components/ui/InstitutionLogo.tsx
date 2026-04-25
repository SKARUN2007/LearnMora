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
  const [failed, setFailed] = useState(false);

  // Generate deterministic "brand" color for the monogram fallback
  const charCode = fallbackInitials.charCodeAt(0) || 0;
  const colors = ["#001f3f", "#d4af37", "#003366", "#4a5568", "#10b981", "#ef4444"];
  const bgColor = colors[charCode % colors.length];

  const inlineSize = { width: size, height: size };

  if (failed) {
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

  return (
    <Image 
      src={src} 
      alt={alt} 
      width={size} 
      height={size} 
      style={inlineSize}
      className={styles.dynamicLogo} 
      onError={() => setFailed(true)}
      loading="lazy"
      unoptimized 
    />
  );
}
