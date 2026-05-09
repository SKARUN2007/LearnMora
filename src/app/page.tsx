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

export default function Home() {
  const topUniversities = ALL_INSTITUTIONS.filter(i => i.type === "university").slice(0, 5);
  const topProviders = ALL_INSTITUTIONS.filter(i => i.type === "platform").slice(0, 4);
  const topInstitutions = ALL_INSTITUTIONS.filter(i => i.type === "corporate").slice(0, 4);

  const bestCourses = [...GENERATED_COURSES].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const popularCourses = [...GENERATED_COURSES].sort((a, b) => (b.enrollmentCount || 0) - (a.enrollmentCount || 0)).slice(0, 5);

  const getInitials = (name: string) => name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();

  return (
    <div className={styles.home}>
      <Hero />
      
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
                      <span>{inst.name}</span>
                    </Link>
                  ))}
                </div>
                <Link href="/universities" className={styles.bentoLink}>View 1300+ Universities →</Link>
              </div>
            </BentoItem>

            {/* AI Insights - Tall */}
            <BentoItem size="tall" delay={0.2} className={styles.aiInsightItem}>
              <div className={styles.bentoContent}>
                <div className={styles.aiBadge}>AI POWERED</div>
                <h3>2026 Skill Gaps</h3>
                <p>Our global agent has indexed 5,000+ courses to identify high-impact tracks for the next decade.</p>
                <div className={styles.insightGraph}>
                  <div className={styles.bar} style={{ height: '80%' }}></div>
                  <div className={styles.bar} style={{ height: '40%' }}></div>
                  <div className={styles.bar} style={{ height: '95%' }}></div>
                  <div className={styles.bar} style={{ height: '60%' }}></div>
                </div>
                <Link href="/roadmap" className={styles.bentoLinkPrimary}>Generate Roadmap</Link>
              </div>
            </BentoItem>

            {/* Providers - Wide */}
            <BentoItem size="wide" delay={0.3}>
              <div className={styles.bentoContentHorizontal}>
                <div className={styles.bentoHeader}>
                  <span className={styles.bentoIcon}>📚</span>
                  <h3>Top Providers</h3>
                </div>
                <div className={styles.bentoRow}>
                  {topProviders.map(inst => (
                    <Link key={inst.slug} href={`/universities/${inst.slug}`} className={styles.rowItem}>
                      <InstitutionLogo src={getLogoUrl(inst.domain, inst.slug)} alt={inst.name} fallbackInitials={getInitials(inst.name)} />
                      <span>{inst.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </BentoItem>

            {/* Corporate Institutions - Medium */}
            <BentoItem size="medium" delay={0.4}>
              <div className={styles.bentoContent}>
                <div className={styles.bentoHeader}>
                  <span className={styles.bentoIcon}>🏢</span>
                  <h3>Corporate Partners</h3>
                </div>
                <div className={styles.bentoList}>
                  {topInstitutions.slice(0, 3).map(inst => (
                    <Link key={inst.slug} href={`/universities/${inst.slug}`} className={styles.listItem}>
                      <div className={styles.itemLogoWrapper}>
                        <InstitutionLogo src={getLogoUrl(inst.domain, inst.slug)} alt={inst.name} fallbackInitials={getInitials(inst.name)} />
                      </div>
                      <span>{inst.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </BentoItem>

            {/* Stats - Small */}
            <BentoItem size="small" delay={0.5} className={styles.statItem}>
              <div className={styles.statContent}>
                <span className={styles.statValue}>12ms</span>
                <span className={styles.statLabel}>Search Latency</span>
              </div>
            </BentoItem>
          </BentoGrid>
        </div>
      </section>

      {/* Trust & Rankings Dashboard */}
      <section className={styles.rankingsSection}>
        <div className={styles.container}>
          <div className={styles.rankingsHeader}>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className={styles.blueRibbon}
            >
              🏆
            </motion.div>
            <h2>Over 250,000 reviews written by LearnMora Ai users help you pick the best course.</h2>
          </div>
          
          <div className={styles.rankingsContainer}>
            {/* Card 1: BEST */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className={`${styles.rankingCard} ${styles.rankingBest}`}
            >
              <div className={styles.rankingCardHeader}>
                <h3>✨ The BEST Online Courses</h3>
                <p>Top rated by our global community of professionals</p>
              </div>
              <div className={styles.rankingList}>
                {bestCourses.map(c => (
                  <CourseCard key={c.id} {...c} />
                ))}
              </div>
            </motion.div>

            {/* Card 2: POPULAR */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className={`${styles.rankingCard} ${styles.rankingPopular}`}
            >
              <div className={styles.rankingCardHeader}>
                <h3>🔥 The MOST POPULAR Online Courses</h3>
                <p>Based on global enrollment trends over the last year</p>
              </div>
              <div className={styles.rankingList}>
                {popularCourses.map(c => (
                  <CourseCard key={c.id} {...c} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
