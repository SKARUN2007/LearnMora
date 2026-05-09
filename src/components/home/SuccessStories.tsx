"use client";

import React from "react";
import styles from "./SuccessStories.module.css";
import { motion } from "framer-motion";

const STORIES = [
  {
    name: "Alex Rivera",
    role: "Senior AI Engineer",
    company: "Google",
    quote: "LearnMora Ai identified exactly which MIT certifications I needed to bridge my architecture gaps. My salary jumped 45% in 6 months.",
    image: "https://i.pravatar.cc/150?u=alex",
    uplift: "+$45,000"
  },
  {
    name: "Sarah Chen",
    role: "Product Lead",
    company: "Meta",
    quote: "The Interactive ROI Engine was the decider. Seeing the long-term value of a Wharton certification helped me commit to my transition.",
    image: "https://i.pravatar.cc/150?u=sarah",
    uplift: "+$32,000"
  },
  {
    name: "Marcus Thorne",
    role: "Data Architect",
    company: "Amazon",
    quote: "The global authority of the indexed courses is unmatched. I found a specialized Stanford track that wasn't on standard aggregators.",
    image: "https://i.pravatar.cc/150?u=marcus",
    uplift: "+$28,000"
  }
];

export const SuccessStories = () => {
  return (
    <section className={styles.successSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>SOCIAL PROOF</span>
          <h2>Global Success Stories</h2>
          <p>Join over 250,000 professionals who have upskilled using LearnMora Ai insights.</p>
        </div>

        <div className={styles.storyGrid}>
          {STORIES.map((story, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className={styles.storyCard}
            >
              <div className={styles.cardHeader}>
                <img src={story.image} alt={story.name} className={styles.avatar} />
                <div className={styles.meta}>
                  <strong>{story.name}</strong>
                  <span>{story.role} @ {story.company}</span>
                </div>
              </div>
              <p className={styles.quote}>"{story.quote}"</p>
              <div className={styles.upliftBadge}>
                <span className={styles.upliftLabel}>Verified Salary Uplift:</span>
                <span className={styles.upliftValue}>{story.uplift}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
