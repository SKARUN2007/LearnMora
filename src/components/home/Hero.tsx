"use client";

import styles from "./Hero.module.css";
import Image from "next/image";
import { CommandHub } from "../ui/CommandHub";

export default function Hero() {
  return (
    <section className={styles.hero} style={{ border: '10px solid green' }}>
      <div className={`${styles.container} container`}>
        <div className={styles.heroLeft}>
          <div className={styles.illustrationWrapper}>
            <Image 
              src="/hero-illustration.png" 
              alt="LearnMora Ai Mastery" 
              width={700} 
              height={700}
              className={styles.heroImg}
              style={{ display: 'block', opacity: 1, visibility: 'visible' }}
              unoptimized
            />
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.content}>
            <div className={styles.badge}>
              <span>NEW</span> 100% Free Professional Certificates for 2026
            </div>
            
            <div className={styles.triadTagline}>
              Degree for Interviews <span>•</span> Skills for Jobs <span>•</span> Attitude for Growth
            </div>

            <h1 className={styles.title}>
              Master Your Career with <br />
              <span className={styles.accentText}>Global Authority</span>
            </h1>
            
            <p className={styles.subtitle}>
              The global EdTech accelerator for Ivy League degrees, professional certifications, and AI-driven career blueprints. Stop searching. Start sovereign learning.
            </p>

            <div className={styles.searchWrapper}>
              <CommandHub />
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <strong>10,000+</strong>
                <span>Verified Courses</span>
              </div>
              <div className={styles.statLine} />
              <div className={styles.stat}>
                <strong>200+</strong>
                <span>Global Partners</span>
              </div>
              <div className={styles.statLine} />
              <div className={styles.stat}>
                <strong>1M+</strong>
                <span>Professional Blueprints</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
