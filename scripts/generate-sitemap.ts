import fs from "fs";
import path from "path";
import { GENERATED_COURSES } from "../src/lib/generated5000Courses";
import { HIERARCHICAL_TAXONOMY, TaxonomyNode } from "../src/lib/dynamicTaxonomy";

function generateSitemap() {
  console.log("Initializing SEO Mass-Deployment Sitemap generation...");
  
  const BASE_URL = "https://learnmora.com";
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Add Taxonomy Subject Routes
  const subjects: string[] = [];
  function traverse(node: TaxonomyNode) {
    subjects.push(node.name.toLowerCase().replace(/\s+/g, '-'));
    node.children.forEach(traverse);
  }
  HIERARCHICAL_TAXONOMY.forEach(traverse);

  subjects.forEach(subject => {
    sitemap += `  <url>\n    <loc>${BASE_URL}/courses/subject/${subject}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
  });

  // 2. Add 5000+ Course Routes
  GENERATED_COURSES.forEach(course => {
    sitemap += `  <url>\n    <loc>${BASE_URL}/career-impact/${course.id}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  sitemap += `</urlset>`;

  const outPath = path.join(__dirname, "../public/sitemap.xml");
  fs.writeFileSync(outPath, sitemap);

  console.log(`✅ Successfully generated sitemap.xml with ${subjects.length} subjects and ${GENERATED_COURSES.length} courses!`);
}

generateSitemap();
