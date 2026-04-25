export interface Course {
  id: string;
  title: string;
  provider: string;
  university?: string;
  rating: number;
  duration: string;
  certificate: boolean;
  language: string;
  price: string;
  roi: string;
  isFree: boolean;
  category: string;
  careerPath: string[];
  description: string;
  enroll_url?: string;
}

export const CAREERS = [
  "AI Architect", "Cybersecurity Lead", "Data Science Director", "Quantum Computing Lead",
  "Sustainability Auditor", "Fintech Compliance Officer", "Renewable Energy Engineer", "LLM Engineer",
  "Cloud Solutions Architect", "Blockchain Developer", "Ethical AI Specialist", "Bioinformatics Scientist",
  "Metaverse Pathologist", "Space Tech Engineer", "Circular Economy Lead", "Digital Health Strategist",
  "Robotics Integrator", "Autonomous Vehicle Planner", "Smart City Designer", "AR Content Creator",
  "Genetic Counselor (Tech)", "Carbon Credit Trader", "Agritech Specialist", "EdTech Innovation Lead",
  "Product Management (AI)", "UX for Robotics", "Neuro-Interface Designer", "Digital Twin Architect",
  "Remote Work Consultant", "E-Sports Psychologist", "Crypto Economist", "NFT Strategist",
  "Precision Medicine Expert", "Synthetic Media Specialist", "Renewable Grid Analyst", "Ocean Tech Engineer",
  "3D Construction Planner", "Vertical Farming Lead", "Hydrogen Energy Expert", "Nano-Materials Scientist",
  "DeFi Compliance Officer", "Prompt Engineer (Sr)", "Human-AI Teaming Strategist", "Climate Resilience Officer",
  "Waste-to-Energy Lead", "Quantum Security Analyst", "Distributed Cloud Lead", "Privacy Engineering Lead",
  "Bio-Fabrication Manager", "Digital Ethics Auditor", "Algorithmic Bias Mitigator", "Virtual Reality Architect",
  "Cloud Security Ops", "Bio-Digital Data Analyst", "Smart Contract Auditor", "Decentralized Finance Lead",
  "Green Tech Venture Lead", "Ocean Carbon Specialist", "Wildfire Tech Analyst", "Grid Modernization lead",
  "Hydrogen Grid Designer", "Solid State Battery Lead", "Fusion Energy Analyst", "Microgrid Architect",
  "Sustainable Supply Chain Director", "Regenerative Agriculture Lead", "Vertical City Planner", "Bio-Pharma Tech Lead",
  "Telehealth Experience Lead", "Digital Immune System Architect", "Edge Computing Lead", "Post-Quantum Cryptography Lead",
  "Silicon Photonics Engineer", "Satellite Network Manager", "Space Mining Logistician", "Orbital Waste Manager",
  "Neuro-Ethics Consultant", "Synthetic Life Designer", "Organoid Intelligence Lead", "Digital Twin Maintenance Lead",
  "Holographic Display Engineer", "Affective Computing Lead", "Brain-Computer Interface Lead", "Digital Forensics Lead",
  "Cyber-Warfare Strategist", "Autonomous Defense Engineer", "Maritime Robotics Engineer", "Arctic Tech Analyst",
  "Global Literacy Tech Lead", "Personalized Education Lead", "Gamified Learning Architect", "Immersive Journalism Lead",
  "Deep-Sea Resource Lead", "Soil Health Tech Analyst", "Atmospheric Carbon Architect", "Strategic Foresight Lead",
  "Human-Machine Trust Analyst", "Robot Personality Designer", "Digital Estate Executor", "Longevity Tech Strategist"
];

export const COURSES: Course[] = [
  {
    id: "g-genai-1",
    title: "Generative AI for Leaders & Architects",
    provider: "Google Cloud",
    rating: 4.9,
    duration: "12 Hours",
    certificate: true,
    language: "English",
    price: "FREE",
    roi: "115%",
    isFree: true,
    category: "Technology",
    careerPath: ["AI Architect", "CTO"],
    description: "Master the strategy and architecture behind GenAI deployments in enterprise environments."
  },
  {
    id: "h-cs50",
    title: "CS50: Introduction to Computer Science",
    provider: "edX",
    university: "Harvard",
    rating: 4.8,
    duration: "12 Weeks",
    certificate: true,
    language: "English",
    price: "FREE",
    roi: "150%",
    isFree: true,
    category: "Technology",
    careerPath: ["Software Engineer", "Full Stack Developer"],
    description: "The world-famous introduction to computer science and programming."
  },
  {
    id: "mit-fin-1",
    title: "Financial Engineering and Risk Management",
    provider: "Coursera",
    university: "Columbia University",
    rating: 4.8,
    duration: "6 Months",
    certificate: true,
    language: "English",
    price: "$2,400",
    roi: "85%",
    isFree: false,
    category: "Business",
    careerPath: ["FinTech Analyst", "Risk Manager"],
    description: "Advanced mathematical modeling for the financial services industry."
  },
  {
    id: "ms-cloud-arch",
    title: "Azure Solutions Architect Expert",
    provider: "Microsoft",
    rating: 4.7,
    duration: "40 Hours",
    certificate: true,
    language: "English",
    price: "$165 (Exam)",
    roi: "95%",
    isFree: false,
    category: "Technology",
    careerPath: ["Cloud Solutions Architect"],
    description: "Design and implement solutions that run on Microsoft Azure."
  },
  {
    id: "g-python-1",
    title: "Crash Course on Python",
    provider: "Google",
    rating: 4.8,
    duration: "6 Weeks",
    certificate: true,
    language: "English",
    price: "FREE",
    roi: "110%",
    isFree: true,
    category: "Technology",
    careerPath: ["Software Engineer", "Data Analyst"],
    description: "Learn Python from scratch."
  },
  {
    id: "umich-python-1",
    title: "Python for Everybody Specialization",
    provider: "Coursera",
    university: "University of Michigan",
    rating: 4.9,
    duration: "8 Months",
    certificate: true,
    language: "English",
    price: "$39/mo",
    roi: "140%",
    isFree: false,
    category: "Technology",
    careerPath: ["Python Developer", "Data Scientist"],
    description: "Learn to program and analyze data with Python."
  }
];

export async function getCourses() {
  return COURSES;
}

export async function getCourseById(id: string) {
  return COURSES.find(c => c.id === id);
}

export async function getCoursesByCareer(career: string) {
  return COURSES.filter(c => 
    c.careerPath.some(path => path.toLowerCase() === career.toLowerCase())
  );
}

export function calculateValueScore(course: Course) {
  // Logic: (ROI % * 0.6) + (Rating * 10 * 0.4)
  // If FREE, add +10 points prestige bonus
  const roiNum = parseInt(course.roi.replace("%", "")) || 0;
  let score = (roiNum * 0.6) + (course.rating * 10 * 0.4);
  if (course.isFree) score += 10;
  return Math.min(Math.round(score), 100);
}

export async function getSubjectCounts() {
  const counts: Record<string, number> = {};
  COURSES.forEach(course => {
    counts[course.category] = (counts[course.category] || 0) + 1;
  });
  return Object.entries(counts).map(([name, count]) => ({ name, count }));
}

export async function getProviders() {
  const providers = new Set(COURSES.map(c => c.provider));
  return Array.from(providers);
}

export async function getCoursesByProvider(provider: string) {
  return COURSES.filter(c => c.provider.toLowerCase() === provider.toLowerCase());
}
