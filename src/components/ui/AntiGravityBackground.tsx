"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./AntiGravityBackground.module.css";

export const AntiGravityBackground = () => {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const y1 = useTransform(scrollY, [0, 2000], [0, -300]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -500]);
  const y3 = useTransform(scrollY, [0, 2000], [0, -200]);

  if (!mounted) return null;

  return (
    <div className={styles.background}>
      <motion.div style={{ y: y1 }} className={`${styles.shape} ${styles.shape1}`} />
      <motion.div style={{ y: y2 }} className={`${styles.shape} ${styles.shape2}`} />
      <motion.div style={{ y: y3 }} className={`${styles.shape} ${styles.shape3}`} />
      <div className={styles.gradientOverlay} />
    </div>
  );
};
