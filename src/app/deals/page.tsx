import CourseCard from "@/components/courses/CourseCard";
import styles from "./deals.module.css";

export default function DealsPage() {
  const deals = [
    {
      id: "udemy-ds-deal-1",
      title: "Data Science Specialization (80% OFF)",
      provider: "Udemy",
      rating: 4.8,
      duration: "40 Hours",
      certificate: true,
      language: "English",
      price: "$12.99",
      roi: "15%",
      isFree: false,
      category: "Data Science",
      careerPath: ["Data Scientist"],
      description: "Comprehensive data science bootcamp with extreme pricing."
    }
  ];

  return (
    <div className={styles.dealsPage}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1>Daily Deals & Price Drops</h1>
          <p>Real-time monitoring of professional certificate price changes.</p>
        </div>
      </header>
      
      <div className={styles.container}>
        <div className={styles.grid}>
          {deals.map((deal, idx) => (
            <CourseCard key={idx} {...deal} />
          ))}
        </div>
      </div>
    </div>
  );
}
