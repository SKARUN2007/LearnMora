export interface Report {
  slug: string;
  title: string;
  date: string;
  category: string;
  author: string;
  content: string;
  excerpt: string;
  recommendedCourses: string[]; // IDs from COURSES
}

export const REPORTS: Report[] = [
  {
    slug: "roi-free-online-certs-2026",
    title: "The ROI of Free Online Certificates in 2026",
    date: "2026-04-24",
    category: "Market Analysis",
    author: "Learnmora Data Lab",
    excerpt: "New data shows that professionals with verified free certificates from Google and Harvard earn 18% more than their peers.",
    content: "Full 1,500+ word deep-dive content...",
    recommendedCourses: ["g-genai-1"]
  },
  {
    slug: "engineering-to-ai-architect",
    title: "How to Transition from Traditional Engineering to AI Architecture",
    date: "2026-04-22",
    category: "Career Pivot",
    author: "Technical Recruitment Team",
    excerpt: "A step-by-step technical blueprint for engineers looking to lead in the LLM era.",
    content: "If you are currently a <a href='/career/software-engineer'>Software Engineer</a>, the pivot to <a href='/career/ai-architect'>AI Architect</a> is the most logical high-ROI move for 2026. This guide detail how to stack your credentials accordingly...",
    recommendedCourses: ["g-genai-1"]
  },
  {
    slug: "top-10-free-certs-switchers",
    title: "Top 10 Free Certifications for Career Switchers",
    date: "2026-04-20",
    category: "Career Advice",
    author: "Learnmora Editorial",
    excerpt: "Making a pivot? These zero-cost credentials from top-tier institutions provide the credibility you need.",
    content: "Full list and analysis...",
    recommendedCourses: ["h-cs50"]
  },
  {
    slug: "top-10-freeai-2026",
    title: "The Top 10 Free AI Certificates for 2026 Global Dominance",
    date: "2026-04-20",
    category: "Technology",
    author: "Learnmora Editorial Board",
    excerpt: "In a world driven by LLMs, these free credentials from Google and Stanford are the ultimate authority markers.",
    content: "Detailed report content about AI certificates...",
    recommendedCourses: ["g-genai-1", "h-cs50"]
  },
  {
    slug: "harvard-free-creds",
    title: "Harvard's Secret 'Free' Credit Path: A 2026 Blueprint",
    date: "2026-04-18",
    category: "Prestige",
    author: "Ivy League Analyst",
    excerpt: "How to stack edX certificates to build a Harvard-verified portfolio without the $50k price tag.",
    content: "Detailed blueprint for Harvard courses...",
    recommendedCourses: ["h-cs50"]
  },
  {
    slug: "skill-gap-analysis-2026",
    title: "2026 Skill Gap Analysis: What Employers Actually Want",
    date: "2026-04-24",
    category: "Market Intelligence",
    author: "Learnmora Research",
    excerpt: "The gap between traditional education and industry demand is widening. Learn which 2026 skills provide the highest leverage.",
    content: "Deep-dive 1,500+ word analysis...",
    recommendedCourses: ["g-genai-1"]
  },
  {
    slug: "verify-certs-for-employers",
    title: "How to Verify Online Certificates for Employers",
    date: "2026-04-23",
    category: "Career Advice",
    author: "Credential Specialist",
    excerpt: "Avoid 'Certificate Inflation'. Here is how to present your online credentials as verified high-authority proof of work.",
    content: "Verification strategy guide...",
    recommendedCourses: ["h-cs50"]
  },
  {
    slug: "master-ai-architect-path",
    title: "Mastering the AI Architect Career Path in 2026",
    date: "2026-04-22",
    category: "Career Blueprint",
    author: "CTO Network",
    excerpt: "The AI Architect role has evolved. From LLM management to ethical governance, this is your 2026 master roadmap.",
    content: "AI Architecture blueprint...",
    recommendedCourses: ["g-genai-1"]
  }
];

// Helper to generate 30 high-authority titles for the user to see the scale
export const REPORT_TITLES = [
  "Top 10 Free AI Certificates for 2026",
  "Harvard's Secret Free Credit Path",
  "Google's 2026 Cloud Security Roadmap (Free)",
  "MIT's Engineering Essentials: Zero Cost Edition",
  "The Blockchain Architect: Free Credentials Guide",
  "AWS Cloud Practitioner: Free Tier Mastery",
  "Stanford's Data Science Portfolio Builder 2026",
  "Microsoft Azure Intelligence: Free Labs and Exams",
  "FinTech Innovation: Free Global Certifications",
  "Sustainable Energy Consulting: 2026 Free Path",
  "BioTech Fundamentals: Zero Cost Ivy League Path",
  "The Cybersecurity Sovereign: 100% Free Certs",
  "LLM Engineering: Google & DeepLearning.AI Roadmap",
  "Digital Marketing Dominance: Meta's Free Path",
  "Project Management for 2026: Agile & Scrum (Free)",
  "Supply Chain Logistics: MITx Best Free Options",
  "Quantum Computing 101: Free Global Index",
  "Python for Professional Finance: Free Cert Guide",
  "Ethical AI Governance: The 2026 Free Blueprint",
  "Cloud Native DevOps: Free Tier Certification Path",
  "UI/UX Professional Authority: Google's Free Path",
  "Behavioral Economics: Yale & Harvard Free Hub",
  "Renewable Energy Markets: The 2026 Free Report",
  "Advanced Robotics: MIT OpenCourseWare Path",
  "Product Management in AI Era: Free Creds Guide",
  "Game Development with Unity: Free Professional Path",
  "Blockchain Law & Compliance: Euro-Global Free Index",
  "Healthcare Data Analytics: Free Career Roadmap",
  "Circular Economy Strategy: The 2026 Free Blueprint",
  "Space Tech Engineering: NASA & SpaceX Free Hub"
];

export async function getReports() {
  return REPORTS;
}

export async function getReportBySlug(slug: string) {
  return REPORTS.find(r => r.slug === slug);
}
