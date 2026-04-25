import { COURSES as oldCourses } from "../src/lib/courses";
import { GENERATED_COURSES } from "../src/lib/generatedCourses";
import { TAXONOMY } from "../src/lib/taxonomy";

const ALL = [...oldCourses, ...GENERATED_COURSES];
let errors = 0;

console.log(`Starting Data Integrity Audit on ${ALL.length} items...`);

for (const c of ALL) {
  if (!c.provider) { 
    console.error(`Missing provider for ${c.id}`); 
    errors++; 
  }
  if (typeof c.rating !== "number" || c.rating < 0 || c.rating > 5) { 
    console.error(`Invalid rating for ${c.id}`); 
    errors++; 
  }
  if (!c.roi || !c.roi.endsWith("%") || isNaN(parseInt(c.roi))) { 
    console.error(`Invalid ROI for ${c.id}: ${c.roi}`); 
    errors++; 
  }
  if (c.isFree && c.price !== "FREE" && c.price !== "$0") { 
    console.error(`Price discrepancy for free course ${c.id}: ${c.price}`); 
    errors++; 
  }
  if (!c.isFree && (c.price === "FREE" || c.price === "$0")) { 
    console.error(`Price discrepancy for paid course ${c.id}: ${c.price}`); 
    errors++; 
  }
}

console.log(`Checked metrics for ${ALL.length} objects.`);
console.log("Checking route generation mappings...");

let routeErrs = 0;

for (const p of TAXONOMY) {
  for (const s of p.subCategories) {
    const hits = ALL.filter((c: any) => c.subCategory === s.name || c.category === s.name);
    // At scale, aiming for ~30 elements per department subset given 1000 items
    if (hits.length < 10) {
      console.warn(`Warning: Department route ${p.slug}/${s.slug} (${s.name}) only has ${hits.length} courses! Expected at least 10.`);
      routeErrs++;
    }
  }
}

if (errors > 0 || routeErrs > 0) {
    console.log(`\nAudit finished with issues: Failed. ${errors} item errors, ${routeErrs} routes lacking enough courses.`);
    process.exit(1);
}

console.log("\n✅ Audit passed successfully. No broken prices, invalid KPIs, or empty departments found.");
