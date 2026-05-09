"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./RoiCalculator.module.css";
import Link from "next/link";
import { Star } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const INDUSTRIES = [
  { id: "tech", name: "Software & AI", base: 85000, growth: 0.15 },
  { id: "business", name: "Business & Management", base: 75000, growth: 0.12 },
  { id: "design", name: "Creative & UX Design", base: 65000, growth: 0.10 },
  { id: "data", name: "Data Science & Analytics", base: 80000, growth: 0.14 },
];

export default function RoiCalculator() {
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [experience, setExperience] = useState(2);
  const [intensity, setIntensity] = useState(1); // 1 = Standard, 2 = Aggressive

  const calculateProjection = () => {
    const years = [2026, 2027, 2028, 2029, 2030];
    const baseline = [];
    const projected = [];

    let currentBase = industry.base * (1 + experience * 0.05);
    let currentProj = currentBase;

    for (let i = 0; i < 5; i++) {
      baseline.push(Math.round(currentBase));
      projected.push(Math.round(currentProj));

      currentBase *= 1.04; // 4% standard raise
      currentProj *= 1 + industry.growth * intensity;
    }

    return { years, baseline, projected };
  };

  const { years, baseline, projected } = calculateProjection();

  const data = {
    labels: years,
    datasets: [
      {
        label: "Projected with LearnMora",
        data: projected,
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "#8b5cf6",
      },
      {
        label: "Standard Career Path",
        data: baseline,
        borderColor: "#94a3b8",
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" as const },
      tooltip: {
        callbacks: {
          label: (context: any) => ` $${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value: any) => "$" + (value / 1000) + "k",
        },
      },
    },
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.header}
        >
          <h1>Interactive ROI Engine</h1>
          <p>Project your financial growth through the 2026 certification ecosystem.</p>
        </motion.header>

        <div className={styles.grid}>
          {/* Controls */}
          <aside className={styles.controls}>
            <div className={styles.controlGroup}>
              <label>Current Industry</label>
              <div className={styles.industryGrid}>
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind.id}
                    className={`${styles.indBtn} ${industry.id === ind.id ? styles.active : ""}`}
                    onClick={() => setIndustry(ind)}
                  >
                    {ind.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.controlGroup}>
              <label>Years of Experience: {experience}</label>
              <input 
                type="range" 
                min="0" max="20" 
                value={experience} 
                onChange={(e) => setExperience(parseInt(e.target.value))} 
                className={styles.slider}
              />
            </div>

            <div className={styles.controlGroup}>
              <label>Learning Intensity</label>
              <div className={styles.intensityGrid}>
                <button 
                  className={`${styles.intBtn} ${intensity === 1 ? styles.active : ""}`}
                  onClick={() => setIntensity(1)}
                >
                  Standard (1 Cert/yr)
                </button>
                <button 
                  className={`${styles.intBtn} ${intensity === 1.5 ? styles.active : ""}`}
                  onClick={() => setIntensity(1.5)}
                >
                  Aggressive (3+ Certs/yr)
                </button>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>Total Projected Uplift (5yrs)</div>
              <div className={styles.summaryValue}>
                +${(projected[4] - baseline[4]).toLocaleString()}
              </div>
              <p>By leveraging AI and high-impact certifications, you can significantly outpace the market average.</p>
            </div>
          </aside>

          {/* Chart Display */}
          <main className={styles.chartArea}>
            <div className={styles.chartWrapper}>
              <Line data={data} options={options} />
            </div>

            <div className={styles.recommendations}>
              <h3>Recommended for your path:</h3>
              <div className={styles.recGrid}>
                <div className={styles.recCard}>
                  <strong>Advanced AI Architecture</strong>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    Google Cloud • 4.9 <Star size={14} fill="var(--warning)" stroke="var(--warning)" />
                  </span>
                  <Link href="/courses">Enroll Free</Link>
                </div>
                <div className={styles.recCard}>
                  <strong>Strategic Business Ops</strong>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    Wharton • 4.8 <Star size={14} fill="var(--warning)" stroke="var(--warning)" />
                  </span>
                  <Link href="/courses">Enroll Free</Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
