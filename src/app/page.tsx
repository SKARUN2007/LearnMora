import Hero from "@/components/home/Hero";
import CourseCard from "@/components/courses/CourseCard";
import { GENERATED_COURSES } from "@/lib/generatedCourses";
import { ALL_INSTITUTIONS, getLogoUrl } from "@/lib/institutions";
import InstitutionLogo from "@/components/ui/InstitutionLogo";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const topUniversities = ALL_INSTITUTIONS.filter(i => i.type === "university").slice(0, 8);
  const topProviders = ALL_INSTITUTIONS.filter(i => i.type === "platform").slice(0, 8);
  const topInstitutions = ALL_INSTITUTIONS.filter(i => i.type === "corporate").slice(0, 8);

  const bestCourses = [...GENERATED_COURSES].sort((a, b) => b.rating - a.rating).slice(0, 5);
  // Using enrollmentCount for popularity if exists, else ID
  const popularCourses = [...GENERATED_COURSES].sort((a, b) => (b.enrollmentCount || 0) - (a.enrollmentCount || 0)).slice(0, 5);

  const getInitials = (name: string) => name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();

  return (
    <div className={styles.home}>
      <Hero />
      
      {/* Triple-Column Discovery Hub */}
      <section className={styles.discoverySection}>
        <div className={styles.container}>
          <div className={styles.discoveryHeader}>
            <h2 className={styles.sectionTitle}>Discovery Hub</h2>
            <p className={styles.sectionSubtitle}>Explore verified credentials across the world's most prestigious entities.</p>
          </div>
          <div className={styles.discoveryGrid}>
            {/* Column 1 */}
            <div className={styles.discoveryCol}>
              <div className={styles.colHeader}>
                <h3>🎓 1300+ Universities</h3>
              </div>
              <div className={styles.colList}>
                {topUniversities.map(inst => (
                   <Link key={inst.slug} href={`/universities/${inst.slug}`} className={styles.listItem}>
                     <div className={styles.itemLogoWrapper}>
                       <InstitutionLogo src={getLogoUrl(inst.domain, inst.slug)} alt={inst.name} fallbackInitials={getInitials(inst.name)} />
                     </div>
                     <span>{inst.name}</span>
                   </Link>
                ))}
              </div>
              <Link href="/universities" className={styles.browseBtn}>Browse Universities <span>→</span></Link>
            </div>

            {/* Column 2 */}
            <div className={styles.discoveryCol}>
              <div className={styles.colHeader}>
                <h3>📚 100+ Providers</h3>
              </div>
              <div className={styles.colList}>
                {topProviders.map(inst => (
                   <Link key={inst.slug} href={`/universities/${inst.slug}`} className={styles.listItem}>
                     <div className={styles.itemLogoWrapper}>
                       <InstitutionLogo src={getLogoUrl(inst.domain, inst.slug)} alt={inst.name} fallbackInitials={getInitials(inst.name)} />
                     </div>
                     <span>{inst.name}</span>
                   </Link>
                ))}
              </div>
              <Link href="/universities" className={styles.browseBtn}>Browse Providers <span>→</span></Link>
            </div>

            {/* Column 3 */}
            <div className={styles.discoveryCol}>
              <div className={styles.colHeader}>
                <h3>🏢 1700+ Institutions</h3>
              </div>
              <div className={styles.colList}>
                {topInstitutions.map(inst => (
                   <Link key={inst.slug} href={`/universities/${inst.slug}`} className={styles.listItem}>
                     <div className={styles.itemLogoWrapper}>
                       <InstitutionLogo src={getLogoUrl(inst.domain, inst.slug)} alt={inst.name} fallbackInitials={getInitials(inst.name)} />
                     </div>
                     <span>{inst.name}</span>
                   </Link>
                ))}
              </div>
              <Link href="/universities" className={styles.browseBtn}>Browse Institutions <span>→</span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Rankings Dashboard */}
      <section className={styles.rankingsSection}>
        <div className={styles.container}>
          <div className={styles.rankingsHeader}>
            <div className={styles.blueRibbon}>🏆</div>
            <h2>Over 250,000 reviews written by Learnmora users help you pick the best course.</h2>
          </div>
          
          <div className={styles.rankingsContainer}>
            {/* Card 1: BEST */}
            <div className={`${styles.rankingCard} ${styles.rankingBest}`}>
              <div className={styles.rankingCardHeader}>
                <h3>✨ The BEST Online Courses</h3>
                <p>Top rated by our global community of professionals</p>
              </div>
              <div className={styles.rankingList}>
                {bestCourses.map(c => (
                  <CourseCard key={c.id} {...c} />
                ))}
              </div>
            </div>

            {/* Card 2: POPULAR */}
            <div className={`${styles.rankingCard} ${styles.rankingPopular}`}>
              <div className={styles.rankingCardHeader}>
                <h3>🔥 The MOST POPULAR Online Courses</h3>
                <p>Based on global enrollment trends over the last year</p>
              </div>
              <div className={styles.rankingList}>
                {popularCourses.map(c => (
                  <CourseCard key={c.id} {...c} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
