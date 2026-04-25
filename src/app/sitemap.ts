import { MetadataRoute } from "next";
import { CAREERS } from "@/lib/courses";
import { REPORTS } from "@/lib/reports";
import { REVIEWS } from "@/lib/reviews";
import { TAXONOMY, ALL_DEPARTMENTS } from "@/lib/taxonomy";
import { ALL_INSTITUTIONS } from "@/lib/institutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://learnmora.com";

  // Base routes
  const routes = ["", "/courses", "/roadmap", "/deals", "/about", "/privacy", "/blog", "/annual-report", "/subjects", "/universities", "/universities/rankings"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })
  );

  // Dynamic Career routes
  const careerRoutes = CAREERS.map((career) => ({
    url: `${baseUrl}/career/${career.toLowerCase().replace(/ /g, "-")}`,
    lastModified: new Date(),
  }));

  // Dynamic Blog routes
  const blogRoutes = REPORTS.map((report) => ({
    url: `${baseUrl}/blog/${report.slug}`,
    lastModified: new Date(),
  }));

  // Dynamic Review routes
  const reviewRoutes = REVIEWS.map((review) => ({
    url: `${baseUrl}/reviews/${review.slug}`,
    lastModified: new Date(),
  }));

  // Pillar routes
  const pillarRoutes = TAXONOMY.map((pillar) => ({
    url: `${baseUrl}/department/${pillar.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  // Department routes (all 30 sub-categories)
  const departmentRoutes = ALL_DEPARTMENTS.map((dept) => ({
    url: `${baseUrl}/department/${dept.pillarSlug}/${dept.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  // University/Provider routes (195+)
  const universityRoutes = ALL_INSTITUTIONS.map((inst) => ({
    url: `${baseUrl}/universities/${inst.slug}`,
    lastModified: new Date(),
    priority: 0.6,
  }));

  return [...routes, ...careerRoutes, ...blogRoutes, ...reviewRoutes, ...pillarRoutes, ...departmentRoutes, ...universityRoutes];
}
