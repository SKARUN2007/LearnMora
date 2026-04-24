import Hero from "@/components/home/Hero";
import CourseCard from "@/components/courses/CourseCard";
import styles from "./page.module.css";

export default function Home() {
  const trendingCourses = [
    {
      id: "g-genai-1",
      title: "Generative AI for Leaders & Architects",
      provider: "Google Cloud",
      rating: 4.9,
      duration: "12 Hours",
      certificate: true,
      language: "English",
      price: "FREE",
      roi: "22%",
      isFree: true,
      category: "Technology",
      careerPath: ["AI Architect"],
      description: "Premier GenAI certification."
    },
    {
      id: "mit-fin-1",
      title: "Financial Engineering and Risk Management",
      provider: "Columbia University",
      rating: 4.8,
      duration: "6 Months",
      certificate: true,
      language: "English",
      price: "$2,400",
      roi: "35%",
      isFree: false,
      category: "Finance",
      careerPath: ["Risk Manager"],
      description: "Advanced financial engineering."
    },
    {
      id: "dl-llm-1",
      title: "Full Stack LLM Engineering with LangChain",
      provider: "DeepLearning.AI",
      rating: 4.7,
      duration: "4 Weeks",
      certificate: true,
      language: "English",
      price: "$49 / mo",
      roi: "18%",
      isFree: true,
      category: "Technology",
      careerPath: ["LLM Engineer"],
      description: "Practical LLM engineering."
    },
    {
      id: "mit-energy-1",
      title: "Sustainable Energy Solutions for 2030",
      provider: "MIT",
      rating: 4.9,
      duration: "8 Weeks",
      certificate: true,
      language: "English",
      price: "FREE",
      roi: "15%",
      isFree: true,
      category: "Green Energy",
      careerPath: ["Sustainability Consultant"],
      description: "Zero-cost MIT certificate."
    }
  ];

  return (
    <div className={styles.home}>
      <Hero />
      
      <section className={styles.localTrends}>
        <div className={styles.container}>
          <div className={styles.localFlex}>
            <div className={styles.locationTag}>
              <span className={styles.dot}></span>
              Trending Skills in <strong>Bangalore, India</strong>
            </div>
            <div className={styles.skillBubbles}>
              <span>LLM Engineering</span>
              <span>Cloud Security</span>
              <span>FinTech Analytics</span>
              <span>Project Management</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.trending}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Trending Professional Paths</h2>
            <p className={styles.sectionSubtitle}>The most sought-after credentials in the current global market.</p>
          </div>
          
          <div className={styles.courseGrid}>
            {trendingCourses.map((course, idx) => (
              <CourseCard key={idx} {...course} />
            ))}
            
            {/* In-Grid Native Ad */}
            <div className={styles.adCard}>
              <div className={styles.adLabel}>SPONSORED</div>
              <div className={styles.adPlaceholderGrid}>In-Grid Native Ad Slot</div>
              <div className={styles.adTitle}>Boost your career with premium mentorship</div>
              <div className={styles.adButton}>Learn More</div>
            </div>

            {trendingCourses.map((course, idx) => (
              <CourseCard key={`dup-${idx}`} {...course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
