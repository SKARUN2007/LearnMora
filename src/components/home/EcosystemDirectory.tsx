"use client";

import React, { useState } from "react";
import styles from "./EcosystemDirectory.module.css";
import { ALL_INSTITUTIONS, getLogoUrl, Institution } from "@/lib/institutions";
import InstitutionLogo from "@/components/ui/InstitutionLogo";
import { motion, AnimatePresence } from "framer-motion";

type TabType = "all" | "university" | "corporate" | "platform";

export const EcosystemDirectory = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const filtered = activeTab === "all" 
    ? ALL_INSTITUTIONS 
    : ALL_INSTITUTIONS.filter(i => i.type === activeTab);

  const getInitials = (name: string) => name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();

  return (
    <section className={styles.directorySection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>GLOBAL REACH</span>
          <h2>Our Verified Global Ecosystem v2.1</h2>
          <p>Access curated credentials from the world's most prestigious entities in one unified platform.</p>
        </div>

        <div className={styles.tabs}>
          {(["all", "university", "corporate", "platform"] as TabType[]).map(tab => (
            <button 
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div layoutId="activeTab" className={styles.activeLine} />
              )}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className={styles.grid}
        >
          <AnimatePresence mode="popLayout">
            {filtered.slice(0, 48).map((inst) => (
              <motion.div 
                key={inst.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className={styles.item}
              >
                <div className={styles.logoBox}>
                  <InstitutionLogo 
                    src={getLogoUrl(inst.domain, inst.slug)} 
                    alt={inst.name} 
                    fallbackInitials={getInitials(inst.name)}
                    size={40}
                  />
                </div>
                <div className={styles.info}>
                  <span className={styles.name}>{inst.name}</span>
                  <span className={styles.typeTag}>{inst.type}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length > 48 && (
          <div className={styles.footer}>
            <p>+ {filtered.length - 48} more entities in our directory</p>
            <button className={styles.viewFull}>View Full Directory →</button>
          </div>
        )}
      </div>
    </section>
  );
};
