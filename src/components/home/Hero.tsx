"use client";

import styles from "./Hero.module.css";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CommandHub } from "../ui/CommandHub";
import { Linkedin, TrendingUp, Sparkles, Trophy } from "lucide-react";

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(mouseY, [-500, 500], [5, -5]);
  const rotateY = useTransform(mouseX, [-500, 500], [-5, 5]);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      x.set(moveX);
      y.set(moveY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Auto-play timer for slides
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(timer);
    };
  }, [x, y]);

  const slideVariants = {
    enter: { opacity: 0, x: 20, scale: 0.95 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -20, scale: 0.95 }
  };

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
            <div className={styles.sliderContainer}>
              <AnimatePresence mode="wait">
                {currentSlide === 0 && (
                  <motion.div
                    key="illustration"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    className={styles.slideWrapper}
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -15, 0],
                      }}
                      transition={{ 
                        duration: 6, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      <Image 
                        src="/hero-illustration.png" 
                        alt="LearnMora Ai Mastery" 
                        width={700} 
                        height={700}
                        className={styles.heroImg}
                        priority
                        unoptimized
                      />
                    </motion.div>
                  </motion.div>
                )}

                {currentSlide === 1 && (
                  <motion.div
                    key="linkedin"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    className={styles.slideWrapper}
                  >
                    <div className={styles.mockupCard}>
                      <div className={styles.mockupHeader}>
                        <div style={{ background: '#0a66c2', padding: '8px', borderRadius: '8px' }}>
                          <Linkedin color="white" size={24} />
                        </div>
                        <div>
                          <h4>LearnMora Ai</h4>
                          <span>Top EdTech Voice • 2026 Milestone</span>
                        </div>
                      </div>
                      <p className={styles.mockupText}>
                        "We just hit <strong>10,000+ verified Ivy League courses</strong> on the platform! 🚀 Stop searching for scattered content. Start sovereign learning with Global Authority."
                      </p>
                      <div className={styles.mockupImagePlaceholder}>
                        <Image 
                          src="/hero-illustration.png" 
                          alt="LinkedIn Milestone" 
                          width={500} 
                          height={300}
                          style={{ mixBlendMode: 'multiply', opacity: 0.8 }}
                          unoptimized
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentSlide === 2 && (
                  <motion.div
                    key="feature"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    className={styles.slideWrapper}
                  >
                    <div className={styles.mockupCard}>
                      <div className={styles.mockupHeader}>
                        <div style={{ background: 'var(--accent)', padding: '8px', borderRadius: '8px' }}>
                          <TrendingUp color="white" size={24} />
                        </div>
                        <div>
                          <h4>AI ROI Engine™</h4>
                          <span>Proprietary Career Analytics</span>
                        </div>
                      </div>
                      <p className={styles.mockupText}>
                        Predict your future salary before you even enroll. Our Global Agent calculates the exact ROI of every certification in our directory.
                      </p>
                      <div className={styles.mockupStats}>
                        <div className={styles.statBox}>
                          <span>Global Confidence</span>
                          <strong style={{ color: 'var(--primary)' }}>98.4%</strong>
                        </div>
                        <div className={styles.statBox}>
                          <span>Avg Salary Hike</span>
                          <strong>+42%</strong>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
