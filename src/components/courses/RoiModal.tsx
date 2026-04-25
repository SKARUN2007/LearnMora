"use client";

import { useEffect, useState } from "react";
import { Course } from "@/lib/courses";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./RoiModal.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface RoiModalProps {
  course: Course;
  onClose: () => void;
}

export default function RoiModal({ course, onClose }: RoiModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!mounted) return null;

  // Generate mock realistic comparison points
  const baseSalary = 85000;
  const roiPct = parseInt(course.roi.replace(/\+/g, '').replace('%', '')) || 0;
  const projectedSalary = Math.round(baseSalary * (1 + roiPct / 100));

  const data = {
    labels: ["Current Average", "Projected w/ Certificate"],
    datasets: [
      {
        label: "Expected Global Salary (USD)",
        data: [baseSalary, projectedSalary],
        backgroundColor: ["#9ca3af", "var(--accent)"],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `Salary Impact Analysis: ${course.title}`,
        color: "#001f3f",
        font: { size: 16 }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => "$" + value.toLocaleString()
        }
      }
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <div className={styles.header}>
          <span className={styles.badge}>ROI PROJECTION</span>
          <h2>{course.title}</h2>
          <p>Analyzing salary models across {course.careerPath.join(", ")}</p>
        </div>
        
        <div className={styles.chartContainer}>
          <Bar data={data} options={options} />
        </div>

        <div className={styles.metrics}>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Projected Boost</span>
            <span className={styles.metricValue}>+{roiPct}%</span>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Est. Salary</span>
            <span className={styles.metricValue}>${projectedSalary.toLocaleString()}</span>
          </div>
        </div>

        <button className={styles.ctaBtn} onClick={onClose}>Understood</button>
      </div>
    </div>
  );
}
