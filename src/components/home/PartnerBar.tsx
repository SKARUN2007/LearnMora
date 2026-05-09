"use client";

import React from "react";
import styles from "./PartnerBar.module.css";
import { motion } from "framer-motion";
import { ALL_INSTITUTIONS, getLogoUrl } from "@/lib/institutions";
import InstitutionLogo from "@/components/ui/InstitutionLogo";

export const PartnerBar = () => {
  // Select diverse partners for the scrolling tracks
  const universities = ALL_INSTITUTIONS.filter(i => i.type === "university").slice(0, 15);
  const corporate = ALL_INSTITUTIONS.filter(i => i.type === "corporate").slice(0, 15);
  const platforms = ALL_INSTITUTIONS.filter(i => i.type === "platform").slice(0, 12);

  const getInitials = (name: string) => name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();

  const Track = ({ items, reverse = false, duration = 40 }: { items: any[], reverse?: boolean, duration?: number }) => (
    <div className={styles.logoTrack}>
      <motion.div 
        className={styles.track}
        animate={{ x: reverse ? [-2000, 0] : [0, -2000] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items].map((partner, idx) => (
          <div key={idx} className={styles.partnerLogo}>
            <div className={styles.logoWrapper}>
              <InstitutionLogo 
                src={getLogoUrl(partner.domain, partner.slug)} 
                alt={partner.name} 
                fallbackInitials={getInitials(partner.name)}
                size={32}
              />
            </div>
            <span className={styles.logoName}>{partner.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section className={styles.partnerBar}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>TRUSTED AUTHORITY</span>
          <p className={styles.label}>POWERING 2026 CAREERS WITH THE WORLD'S ELITE ENTITIES</p>
        </div>
        
        <div className={styles.tracksContainer}>
          <Track items={universities} duration={50} />
          <Track items={corporate} reverse duration={45} />
          <Track items={platforms} duration={60} />
        </div>
      </div>
    </section>
  );
};
