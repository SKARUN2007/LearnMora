"use client";

import Hero from "@/components/home/Hero";
import CourseCard from "@/components/courses/CourseCard";
import { GENERATED_COURSES } from "@/lib/generatedCourses";
import { ALL_INSTITUTIONS, getLogoUrl } from "@/lib/institutions";
import InstitutionLogo from "@/components/ui/InstitutionLogo";
import Link from "next/link";
import styles from "./page.module.css";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { motion } from "framer-motion";
import { PartnerBar } from "@/components/home/PartnerBar";
import { EcosystemDirectory } from "@/components/home/EcosystemDirectory";
import { LearningPaths } from "@/components/home/LearningPaths";
import { SuccessStories } from "@/components/home/SuccessStories";

export default function Home() {
  const bestCourses = [...GENERATED_COURSES].sort((a, b) => b.rating - a.rating).slice(0, 5);

  const getInitials = (name: string) => name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();

  return (
    <div className={styles.home}>
      <Hero />
      
      {/* Establishment of Authority */}
      <PartnerBar />
      
      {/* Structured Ecosystem Directory */}
      <EcosystemDirectory />

      {/* Structured Discovery */}
      <LearningPaths />

      {/* Highlighted Courses */}
      <section className={styles.courseSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLeft}>
              <span className={styles.eyebrow}>CURATED SELECTION</span>
              <h2>Premier Certifications</h2>
            </div>
            <Link href="/courses" className={styles.viewAll}>View All Courses →</Link>
          </div>
          
          <div className={styles.courseGrid}>
            {bestCourses.map(course => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <SuccessStories />

      {/* Professional Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <div className={styles.ctaContent}>
              <h2>Ready to bridge your skill gap?</h2>
              <p>Join the elite tier of professionals using AI-driven blueprints to secure their future.</p>
              <div className={styles.ctaBtns}>
                <Link href="/login?mode=signup" className={styles.primaryCta}>Build My Roadmap</Link>
                <Link href="/courses" className={styles.secondaryCta}>Browse Index</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
