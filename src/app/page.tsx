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
import { LearningPaths } from "@/components/home/LearningPaths";
import { SuccessStories } from "@/components/home/SuccessStories";

export default function Home() {
  const topUniversities = ALL_INSTITUTIONS.filter(i => i.type === "university").slice(0, 5);
  const topProviders = ALL_INSTITUTIONS.filter(i => i.type === "platform").slice(0, 4);
  const topInstitutions = ALL_INSTITUTIONS.filter(i => i.type === "corporate").slice(0, 4);

  const bestCourses = [...GENERATED_COURSES].sort((a, b) => b.rating - a.rating).slice(0, 5);

  const getInitials = (name: string) => name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();

  return (
    <div className={styles.home}>
      <Hero />
      
      {/* Establishment of Authority */}
      <PartnerBar />
      
      {/* Premium Bento Discovery Hub */}
      <section className={styles.discoverySection}>
        <div className={styles.container}>
          <div className={styles.discoveryHeader}>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className={styles.eyebrow}
            >
              GLOBAL ECOSYSTEM
            </motion.span>
            <h2 className={styles.sectionTitle}>Discovery Hub</h2>
            <p className={styles.sectionSubtitle}>Explore verified credentials across the world's most prestigious entities.</p>
          </div>

          <BentoGrid>
            {/* Featured University - Large */}
            <BentoItem size="large" delay={0.1}>
              <div className={styles.bentoContent}>
                <div className={styles.bentoHeader}>
                  <span className={styles.bentoIcon}>🎓</span>
                  <h3>Elite Universities</h3>
                </div>
                <div className={styles.bentoList}>
                  {topUniversities.map(inst => (
                    <Link key={inst.slug} href={`/universities/${inst.slug}`} className={styles.listItem}>
                      <div className={styles.itemLogoWrapper}>
                        <InstitutionLogo src={getLogoUrl(inst.domain, inst.slug)} alt={inst.name} fallbackInitials={getInitials(inst.name)} />
                      </div>
                      <div className={styles.itemText}>
                        <strong>{inst.name}</strong>
                        <span>Ivy League Accredited</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </BentoItem>

            {/* AI Power Stats - Tall */}
            <BentoItem size="tall" delay={0.2}>
              <div className={styles.bentoContent}>
                <div className={styles.bentoHeader}>
                  <span className={styles.bentoIcon}>⚡</span>
                  <h3>Ai Insights</h3>
                </div>
                <div className={styles.aiWidget}>
                  <div className={styles.aiStat}>
                    <span className={styles.aiLabel}>Skill Demand 2026</span>
                    <span className={styles.aiValue}>+240%</span>
                  </div>
                  <div className={styles.aiGraph}>
                    <div className={styles.bar} style={{ height: "40%" }}></div>
                    <div className={styles.bar} style={{ height: "60%" }}></div>
                    <div className={styles.bar} style={{ height: "90%" }}></div>
                    <div className={styles.bar} style={{ height: "75%" }}></div>
                  </div>
                  <p>AI Architecture & Ethics remain the highest growth verticals.</p>
                </div>
                <Link href="/roadmap" className={styles.bentoLink}>Analyze My Gap</Link>
              </div>
            </BentoItem>

            {/* Top Providers - Medium */}
            <BentoItem size="medium" delay={0.3}>
              <div className={styles.bentoContent}>
                <div className={styles.bentoHeader}>
                  <span className={styles.bentoIcon}>🏢</span>
                  <h3>Learning Providers</h3>
                </div>
                <div className={styles.horizontalList}>
                  {topProviders.map(inst => (
                    <div key={inst.slug} className={styles.circleItem}>
                      <InstitutionLogo src={getLogoUrl(inst.domain, inst.slug)} alt={inst.name} fallbackInitials={getInitials(inst.name)} size={40} />
                    </div>
                  ))}
                  <div className={styles.moreCircle}>+15</div>
                </div>
                <p>Access Coursera, Udemy, and edX catalogs in one dashboard.</p>
              </div>
            </BentoItem>

            {/* Career Hub - Small */}
            <BentoItem size="small" delay={0.4}>
              <div className={styles.bentoContent}>
                <div className={styles.bentoHeader}>
                  <span className={styles.bentoIcon}>🚀</span>
                  <h3>ROI Engine</h3>
                </div>
                <div className={styles.miniRoi}>
                  <strong>$125k</strong>
                  <span>Avg. Salary Uplift</span>
                </div>
                <Link href="/roi-calculator" className={styles.tinyLink}>Calculate Growth</Link>
              </div>
            </BentoItem>

            {/* Global Partners - Medium */}
            <BentoItem size="medium" delay={0.5}>
              <div className={styles.bentoContent}>
                <div className={styles.bentoHeader}>
                  <span className={styles.bentoIcon}>🌍</span>
                  <h3>Global Partners</h3>
                </div>
                <div className={styles.partnerAvatars}>
                  {topInstitutions.map(inst => (
                    <div key={inst.slug} className={styles.partnerAvatar} title={inst.name}>
                       <InstitutionLogo src={getLogoUrl(inst.domain, inst.slug)} alt={inst.name} fallbackInitials={getInitials(inst.name)} size={32} />
                    </div>
                  ))}
                </div>
                <p>Partnered with the world's leading tech and finance giants.</p>
              </div>
            </BentoItem>
          </BentoGrid>
        </div>
      </section>

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
