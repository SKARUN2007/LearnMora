"use client";

import { useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 14253,
    linkedInSyncRate: "82%",
    totalEnrollments: 45092,
    projectedSalaryGrowth: "$245,000,000",
    topCourses: [
      { name: "Google Data Analytics", count: 8421 },
      { name: "Meta Front-End Developer", count: 7109 },
      { name: "IBM AI Engineering", count: 6254 }
    ]
  });

  return (
    <div style={{ padding: "4rem", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <header style={{ marginBottom: "3rem" }}>
          <span style={{ background: "#0f172a", color: "white", padding: "0.2rem 0.6rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 800 }}>ADMIN ONLY</span>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#0f172a", marginTop: "0.5rem" }}>Command Center</h1>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginBottom: "3rem" }}>
          {[
            { label: "Total Professionals", value: stats.totalUsers.toLocaleString() },
            { label: "LinkedIn Sync Rate", value: stats.linkedInSyncRate },
            { label: "Global Enrollments", value: stats.totalEnrollments.toLocaleString() },
            { label: "Salary Growth Impact", value: stats.projectedSalaryGrowth }
          ].map((stat, i) => (
            <div key={i} style={{ background: "white", padding: "2rem", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", marginBottom: "0.5rem" }}>{stat.label}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a" }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
          <div style={{ background: "white", padding: "2rem", borderRadius: "24px", border: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "2rem" }}>Top Certification Tracks</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {stats.topCourses.map((course, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <div style={{ fontWeight: 700 }}>{course.name}</div>
                   <div style={{ background: "#f1f5f9", padding: "0.4rem 1rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 700 }}>{course.count.toLocaleString()} Students</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#0f172a", padding: "2rem", borderRadius: "24px", color: "white" }}>
             <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1rem" }}>System Integrity</h2>
             <div style={{ fontSize: "0.9rem", opacity: 0.8, marginBottom: "2rem" }}>All 5,006 records are active and being served via global CDN edge.</div>
             
             <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                   <span>API Latency</span>
                   <span style={{ color: "#4ade80", fontWeight: 700 }}>12ms</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                   <span>Indexing Status</span>
                   <span style={{ color: "#4ade80", fontWeight: 700 }}>100%</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
