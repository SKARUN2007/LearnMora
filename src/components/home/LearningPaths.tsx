"use client";

import React from "react";
import styles from "./LearningPaths.module.css";
import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, TrendingUp, Palette, Code, Zap, BarChart, Cloud, Shield, Share2, Stethoscope, Landmark, Rocket } from "lucide-react";

const PATHS = [
  { id: "ai", title: "Artificial Intelligence", icon: <Brain size={24} />, count: "1,200+ Courses", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" },
  { id: "business", title: "Business Strategy", icon: <TrendingUp size={24} />, count: "850+ Courses", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
  { id: "design", title: "Experience Design", icon: <Palette size={24} />, count: "600+ Courses", image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&q=80&w=800" },
  { id: "engineering", title: "Software Engineering", icon: <Code size={24} />, count: "1,500+ Courses", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" },
  { id: "data-science", title: "Data Science & ML", icon: <BarChart size={24} />, count: "950+ Courses", image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&q=80&w=800" },
  { id: "cloud", title: "Cloud Computing", icon: <Cloud size={24} />, count: "400+ Courses", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" },
  { id: "cybersecurity", title: "Cybersecurity", icon: <Shield size={24} />, count: "350+ Courses", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" },
  { id: "marketing", title: "Digital Marketing", icon: <Share2 size={24} />, count: "700+ Courses", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
  { id: "health", title: "Health & Medicine", icon: <Stethoscope size={24} />, count: "550+ Courses", image: "https://images.unsplash.com/photo-1505751172107-5739a00723a5?auto=format&fit=crop&q=80&w=800" },
  { id: "finance", title: "Finance & Fintech", icon: <Landmark size={24} />, count: "480+ Courses", image: "https://images.unsplash.com/photo-1611974714024-4607a50d424b?auto=format&fit=crop&q=80&w=800" },
  { id: "eee", title: "Electrical Engineering", icon: <Zap size={24} />, count: "450+ Courses", image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800" },
  { id: "career", title: "Career Acceleration", icon: <Rocket size={24} />, count: "300+ Blueprints", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800" },
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={styles.pathCard}
              style={{ backgroundImage: `url(${path.image})` }}
            >
              <div className={styles.iconOverlay}>
                {path.icon}
              </div>
              <div className={styles.cardContent}>
                <h3>{path.title}</h3>
                <span className={styles.courseCount}>{path.count}</span>
                <Link href={`/courses?category=${path.id}`} className={styles.exploreLink}>
                  Explore Path →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
