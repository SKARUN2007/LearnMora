"use client";

import OmniSearch from "./OmniSearch";
import styles from "./Hero.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.container} container`}>
        
        {/* Left Pane - Illustration */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.heroLeft}
        >
          <div className={styles.illustrationWrapper}>
             <motion.div
               animate={{ 
                 y: [0, -20, 0],
                 rotate: [0, 1, 0]
               }}
               transition={{ 
                 duration: 6, 
                 repeat: Infinity, 
                 ease: "easeInOut" 
               }}
             >
               <Image 
                 src="/hero-learner.png" 
                 alt="Professional Learner" 
                 width={800} 
                 height={800}
                 className={styles.heroImg}
                 priority
                 unoptimized
               />
             </motion.div>
          </div>
        </motion.div>

        {/* Right Pane - Content & Search */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className={styles.heroRight}
        >
          <div className={styles.badge}>
            <span>NEW</span> 100% Free Professional Certificates for 2026
          </div>
          <h1 className="hero-title">
            Master Your Career with <br /> <span className={styles.accentText}>Global Authority</span>
          </h1>
          <p className={styles.subtitle}>
            The world's premier index for Ivy League degrees, professional certifications, and AI-driven career blueprints. 
            Stop searching. Start sovereign learning.
          </p>
          
          <OmniSearch />

          <div className={styles.stats}>
            <div className={styles.stat}>
              <strong>10,000+</strong>
              <span>Verified Courses</span>
            </div>
            <div className={styles.statLine}></div>
            <div className={styles.stat}>
              <strong>200+</strong>
              <span>Global Partners</span>
            </div>
            <div className={styles.statLine}></div>
            <div className={styles.stat}>
              <strong>1M+</strong>
              <span>Professional Blueprints</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
