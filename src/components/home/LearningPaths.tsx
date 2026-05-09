"use client";

import React from "react";
import styles from "./LearningPaths.module.css";
import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, TrendingUp, Palette, Code, Zap } from "lucide-react";

const PATHS = [
  { id: "ai", title: "Artificial Intelligence", icon: <Brain size={24} />, count: "1,200+ Courses", color: "#8b5cf6" },
  { id: "business", title: "Business Strategy", icon: <TrendingUp size={24} />, count: "850+ Courses", color: "#10b981" },
  { id: "design", title: "Experience Design", icon: <Palette size={24} />, count: "600+ Courses", color: "#f59e0b" },
  { id: "engineering", title: "Software Engineering", icon: <Code size={24} />, count: "1,500+ Courses", color: "#3b82f6" },
  { id: "eee", title: "Electrical Engineering", icon: <Zap size={24} />, count: "450+ Courses", color: "#f43f5e" },
];

export const LearningPaths = () => {
  return (
    <section className={styles.pathsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>CURATED VERTICALS</span>
          <h2>Top Learning Paths</h2>
          <p>Highly specialized tracks curated for the 2026 professional landscape.</p>
        </div>

        <div className={styles.pathGrid}>
          {PATHS.map((path, idx) => (
            <motion.div 
              key={path.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className={styles.pathCard}
            >
              <div className={styles.iconBox} style={{ background: `${path.color}15` }}>
                <span className={styles.icon} style={{ color: path.color }}>{path.icon}</span>
              </div>
              <h3>{path.title}</h3>
              <span>{path.count}</span>
              <Link href={`/courses?category=${path.id}`} className={styles.exploreLink}>
                Explore Path →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
