"use client";

import React from "react";
import styles from "./PartnerBar.module.css";
import { motion } from "framer-motion";

const PARTNERS = [
  { name: "Harvard University", logo: "/logos/harvard.svg" },
  { name: "Stanford University", logo: "/logos/stanford.svg" },
  { name: "MIT", logo: "/logos/mit.svg" },
  { name: "Google", logo: "/logos/google.svg" },
  { name: "Meta", logo: "/logos/meta.svg" },
  { name: "Microsoft", logo: "/logos/microsoft.svg" },
  { name: "IBM", logo: "/logos/ibm.svg" },
  { name: "Amazon", logo: "/logos/amazon.svg" },
];

export const PartnerBar = () => {
  return (
    <div className={styles.partnerBar}>
      <div className={styles.container}>
        <p className={styles.label}>TRUSTED BY PROFESSIONALS FROM 2,000+ GLOBAL ENTITIES</p>
        <div className={styles.logoTrack}>
          <motion.div 
            className={styles.track}
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...PARTNERS, ...PARTNERS].map((partner, idx) => (
              <div key={idx} className={styles.partnerLogo}>
                {/* Simulated SVG logo as text for now, in production use real SVGs */}
                <span className={styles.logoText}>{partner.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
