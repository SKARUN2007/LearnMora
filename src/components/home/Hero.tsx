"use client";

import styles from "./Hero.module.css";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { CommandHub } from "../ui/CommandHub";

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(mouseY, [-500, 500], [5, -5]);
  const rotateY = useTransform(mouseX, [-500, 500], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      x.set(moveX);
      y.set(moveY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <section className={styles.hero}>
      <div className={`${styles.container} container`}>
        
        {/* Left Pane - Illustration */}
        <motion.div 
          style={{ rotateX, rotateY }}
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
                 src="/hero-illustration.png" 
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
          <div className={styles.triadTagline}>
            <span>Degree for Interviews</span> • <span>Skills for Jobs</span> • <span>Attitude for Growth</span>
          </div>
          <h1 className="hero-title">
            Master Your Career with <br /> <span className={styles.accentText}>Global Authority</span>
          </h1>
          <p className={styles.subtitle}>
            The global EdTech accelerator for Ivy League degrees, professional certifications, and AI-driven career blueprints. 
            Stop searching. Start sovereign learning.
          </p>
          
          <CommandHub />

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
