"use client";

import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCourseById, Course } from "@/lib/courses";
import CourseCard from "@/components/courses/CourseCard";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const { user, library } = useUser();
  const router = useRouter();
  
  const [courses, setCourses] = useState<{ interested: Course[], inProgress: Course[], completed: Course[] }>({
    interested: [],
    inProgress: [],
    completed: []
  });
  
  const [activeTab, setActiveTab] = useState<"interested" | "inProgress" | "completed">("interested");

  useEffect(() => {
    // Basic auth check/mock. In real app with middleware, router handles this.
    // Allow seeing local state if not logged in for demo purposes.
    
    async function loadLibrary() {
      const interested: Course[] = [];
      const inProgress: Course[] = [];
      const completed: Course[] = [];

      for (const [id, status] of Object.entries(library)) {
        const course = await getCourseById(id);
        if (course) {
          if (status === "interested") interested.push(course);
          else if (status === "in-progress") inProgress.push(course);
          else if (status === "completed") completed.push(course);
        }
      }

      setCourses({ interested, inProgress, completed });
    }

    loadLibrary();
  }, [library]);

  return (
    <div className={styles.dashboardPage}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1>My Learnmora</h1>
          <p>Manage your saved courses, track your progress, and build your professional portfolio.</p>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === "interested" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("interested")}
          >
            Saved Courses ({courses.interested.length})
          </button>
          <button 
            className={`${styles.tab} ${activeTab === "inProgress" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("inProgress")}
          >
            My Progress ({courses.inProgress.length})
          </button>
          <button 
            className={`${styles.tab} ${activeTab === "completed" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed Credentials ({courses.completed.length})
          </button>
        </div>

        <div className={styles.grid}>
          {courses[activeTab].length > 0 ? (
            courses[activeTab].map(course => (
              <CourseCard key={course.id} {...course} />
            ))
          ) : (
            <div className={styles.emptyState}>
              No courses found in this category. Go explore the hub to add some!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
