"use client";

import React from "react";
import styles from "./BentoGrid.module.css";
import { motion } from "framer-motion";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid = ({ children, className }: BentoGridProps) => {
  return (
    <div className={`${styles.bentoGrid} ${className || ""}`}>
      {children}
    </div>
  );
};

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large" | "tall" | "wide";
  delay?: number;
}

export const BentoItem = ({ children, className, size = "small", delay = 0 }: BentoItemProps) => {
  const sizeClass = styles[size] || "";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.01 }}
      className={`${styles.bentoItem} ${sizeClass} ${className || ""}`}
    >
      {children}
    </motion.div>
  );
};
