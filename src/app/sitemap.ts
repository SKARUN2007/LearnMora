import { MetadataRoute } from "next";
import { CAREERS } from "@/lib/courses";
import { REPORTS } from "@/lib/reports";
import { REVIEWS } from "@/lib/reviews";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://learnmora.com";

  // Base routes
  const routes = ["", "/courses", "/roadmap", "/deals", "/about", "/privacy", "/blog", "/annual-report"].map(
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

  return [...routes, ...careerRoutes, ...blogRoutes, ...reviewRoutes];
}
