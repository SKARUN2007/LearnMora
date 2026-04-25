const fs = require('fs');
const path = require('path');

const departments = [
  { p: "Technology & Computer Science", c: "Artificial Intelligence", niches: ["Generative AI", "LLM Engineering", "Neural Networks", "Computer Vision"] },
  { p: "Technology & Computer Science", c: "Software Development", niches: ["Full-Stack", "Mobile Dev (iOS/Android)", "DevOps", "Game Development"] },
  { p: "Technology & Computer Science", c: "Data Science", niches: ["Big Data", "Data Visualization", "Predictive Analytics", "Statistics"] },
  { p: "Technology & Computer Science", c: "Cybersecurity", niches: ["Ethical Hacking", "Network Security", "Digital Forensics", "Cloud Security"] },
  { p: "Technology & Computer Science", c: "Emerging Tech", niches: ["Quantum Computing", "Blockchain", "IoT (Internet of Things)", "Edge Computing"] },
  { p: "Technology & Computer Science", c: "Cloud Computing", niches: ["AWS", "Azure", "Google Cloud", "Virtualization"] },
  
  { p: "Business, Finance & Management", c: "Finance", niches: ["Fintech", "Investment Banking", "ESG Investing", "Risk Management"] },
  { p: "Business, Finance & Management", c: "Management", niches: ["Project Management (PMP)", "Agile/Scrum", "Product Management", "MBA Core"] },
  { p: "Business, Finance & Management", c: "Marketing", niches: ["Digital Marketing", "SEO/SEM", "Content Strategy", "Growth Hacking"] },
  { p: "Business, Finance & Management", c: "Operations", niches: ["Supply Chain", "Logistics", "Six Sigma", "Lean Management"] },
  { p: "Business, Finance & Management", c: "Human Resources", niches: ["Talent Acquisition", "Employee Relations", "People Analytics"] },
  { p: "Business, Finance & Management", c: "Sales", niches: ["CRM (Salesforce)", "Strategic Negotiation", "B2B Sales"] },
  
  { p: "Engineering & Industry", c: "Mechanical", niches: ["Robotics", "CAD/CAM", "Thermodynamics", "Fluid Mechanics"] },
  { p: "Engineering & Industry", c: "Electrical", niches: ["Power Systems", "Circuit Design", "Embedded Systems"] },
  { p: "Engineering & Industry", c: "Civil", niches: ["Structural Engineering", "Urban Planning", "Construction Management"] },
  { p: "Engineering & Industry", c: "Energy", niches: ["Renewable Energy (Solar/Wind)", "Nuclear Power", "Smart Grids"] },
  { p: "Engineering & Industry", c: "Aerospace", niches: ["Aerodynamics", "Satellite Tech", "Propulsion Systems"] },
  
  { p: "Healthcare & Life Sciences", c: "Medicine", niches: ["Telemedicine", "Medical Coding", "Pharmacology", "Epidemiology"] },
  { p: "Healthcare & Life Sciences", c: "Mental Health", niches: ["Psychology", "Counseling", "Behavioral Therapy"] },
  { p: "Healthcare & Life Sciences", c: "Bio-Tech", niches: ["Genomics", "Bio-Informatics", "CRISPR Tech"] },
  { p: "Healthcare & Life Sciences", c: "Nursing", niches: ["Clinical Practice", "Healthcare Administration", "Patient Care"] },
  { p: "Healthcare & Life Sciences", c: "Nutrition", niches: ["Dietetics", "Sports Nutrition", "Food Science"] },
  
  { p: "Creative Arts & Design", c: "Visual Design", niches: ["UI/UX Design", "Graphic Design", "Motion Graphics"] },
  { p: "Creative Arts & Design", c: "Media", niches: ["Video Production", "Journalism", "Podcasting", "Digital Photography"] },
  { p: "Creative Arts & Design", c: "Architecture", niches: ["Interior Design", "Sustainable Architecture", "Landscape Design"] },
  { p: "Creative Arts & Design", c: "Fashion", niches: ["Textile Design", "Fashion Merchandising", "Luxury Brand Management"] },
  
  { p: "Humanities, Law & Social Sciences", c: "Law", niches: ["Corporate Law", "Intellectual Property", "Cyber Law", "Human Rights"] },
  { p: "Humanities, Law & Social Sciences", c: "Education", niches: ["Instructional Design", "E-Learning", "Special Education"] },
  { p: "Humanities, Law & Social Sciences", c: "Languages", niches: ["English (TESOL)", "Mandarin", "Spanish", "Linguistics"] },
  { p: "Humanities, Law & Social Sciences", c: "Philosophy", niches: ["Ethics in AI", "Political Science", "Sociology"] }
];

const providers = ["Coursera", "edX", "LinkedIn Learning", "Google", "Microsoft", "IBM", "Meta", "AWS", "Stanford Online", "HarvardX", "MITx"];
const adjectives = ["Advanced", "Professional", "Applied", "Strategic", "Foundations of", "Mastering", "Introduction to", "Executive", "Global"];
const roles = ["Specialist", "Engineer", "Manager", "Architect", "Analyst", "Developer", "Consultant"];

function pseudoRandomDesc(niche) {
  return `Comprehensive professional training in ${niche}. Master the core frameworks and practical tools required to excel in modern industry environments. Verified outcomes include hands-on project completion and industry-standard credentialing.`;
}

let courses = [];
let idCounter = 1;

for (const dep of departments) {
  let subSlug = dep.c.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  for (const niche of dep.niches) {
    // Generate exactly 10 courses per niche
    for(let i=0; i<10; i++) {
        let provider = providers[Math.floor(Math.random() * providers.length)];
        let adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        let title = `${adj} ${niche}`;
        if(i === 2 || i === 5) {
            title = `${niche} Bootcamp`;
        } else if (i === 7) {
            title = `${niche} for ${roles[Math.floor(Math.random() * roles.length)]}s`;
        } else if (i % 3 === 0) {
            title = `Certificate in ${niche}`;
        }
        
        let rating = (4.2 + (Math.random() * 0.7)).toFixed(1);
        let durationM = Math.floor(Math.random() * 20 + 2);
        let roiNum = Math.floor(Math.random() * 80 + 20) + 100;

        courses.push({
            id: `c-${idCounter++}`,
            title,
            provider,
            rating: parseFloat(rating),
            duration: `${durationM} Weeks`,
            certificate: true,
            language: "English",
            price: Math.random() > 0.3 ? "FREE" : `$${Math.floor(Math.random() * 400 + 49)}`,
            roi: `${roiNum}%`,
            isFree: Math.random() > 0.3,
            category: dep.p, // Matches Pillar name
            subCategory: dep.c,
            niche: niche,
            careerPath: [`${niche} ${roles[Math.floor(Math.random() * roles.length)]}`],
            description: pseudoRandomDesc(niche),
            enrollmentCount: Math.floor(Math.random() * 500000 + 1000)
        });
    }
  }
}

const outputPath = path.join(__dirname, '../src/lib/generatedCourses.ts');
const fileContent = `// Auto-generated 1000+ course taxonomy mapping
import { Course } from "./courses";

export interface ExtendedCourse extends Course {
  subCategory?: string;
  niche?: string;
  enrollmentCount?: number;
}

export const GENERATED_COURSES: ExtendedCourse[] = ${JSON.stringify(courses, null, 2)};
`;

fs.writeFileSync(outputPath, fileContent);
console.log(`Successfully generated ${courses.length} courses to ${outputPath}`);
