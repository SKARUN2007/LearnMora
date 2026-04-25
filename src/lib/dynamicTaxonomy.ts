import { Course } from "./courses";
import { GENERATED_COURSES } from "./generatedCourses";
import { COURSES } from "./courses";
import { TAXONOMY, Pillar, SubCategory } from "./taxonomy";

export interface TaxonomyNode {
  id: string; // unique ID e.g. "tier1-technology"
  name: string;
  level: number; // 1, 2, or 3
  parentId?: string; // id of parent
  count: number; // dynamically computed
  children: TaxonomyNode[];
}

// Extended Course type to hold dynamic tags
export interface TaggedCourse extends Course {
  tier1: string;
  tier2: string;
  tier3Tags: string[];
}

// Generic niches for subcategories without specific mapping to easily reach 500+ subjects
const GENERIC_NICHES = [
  "Fundamentals", "Advanced Strategy", "Case Studies", "Global Practices", 
  "Emerging Trends", "Digital Integration", "Leadership", "Analytics", 
  "Optimization", "Ethics", "Policy", "Innovation", "Research Methods", 
  "Compliance", "Architecture", "Consulting", "System Design"
];

// Specific mapping for some top categories
const TIER3_MAPPING: Record<string, string[]> = {
  "Artificial Intelligence": [
    "Generative AI", "Neural Networks", "Deep Learning", "Prompt Engineering", 
    "LLM Ops", "Computer Vision", "NLP", "Reinforcement Learning", "AI Ethics", 
    "MLOps", "Autonomous Agents", "Edge AI", "Cognitive Computing", "Expert Systems", "Robotics AI"
  ],
  "Software Development": [
    "Frontend Frameworks", "Backend Architecture", "Microservices", "API Design", 
    "System Design", "Rust Programming", "Go Systems", "Mobile Cross-Platform", 
    "Game Engine Development", "WebAssembly", "DevOps Pipelines", "Serverless", "CI/CD", "Testing", "Agile Software"
  ],
  "Data Science": [
    "Big Data", "Data Visualization", "Predictive Analytics", "Statistical Modeling", 
    "Data Engineering", "ETL Pipelines", "Graph Databases", "Time Series Analysis", 
    "Data Governance", "A/B Testing", "Causal Inference", "Quantitative Analysis", "Business Intelligence", "Spatial Data", "Data Mining"
  ],
  "Cybersecurity": [
    "Ethical Hacking", "Digital Forensics", "Cryptography", "Penetration Testing", 
    "Zero Trust Architecture", "Incident Response", "Malware Analysis", "Cloud Security", 
    "Network Defense", "Identity Management", "Security Auditing", "Threat Hunting", "IoT Security", "Social Engineering", "AppSec"
  ],
  "Finance": [
    "Algorithmic Trading", "Quantitative Finance", "ESG Investing", "Fintech Innovations", 
    "Crypto Economics", "Venture Capital", "Corporate Finance", "Investment Banking", 
    "Wealth Management", "Financial Modeling", "Risk Analytics", "Behavioral Finance", "Tax Strategy", "Private Equity", "Macro Economics"
  ]
};

// Map original courses to avoid duplicates
const allCoursesMap = new Map<string, any>();
[...COURSES, ...GENERATED_COURSES].forEach(c => allCoursesMap.set(c.id, c));
const ALL_COURSES = Array.from(allCoursesMap.values());

// 1. Tagging Agent Simulation
export const TAGGED_COURSES: TaggedCourse[] = ALL_COURSES.map(course => {
  // Infer Tier 1 and Tier 2 from existing fields if possible, or fallback
  const tier1 = course.category || "Technology & Computer Science";
  const tier2 = course.subCategory || "Emerging Tech";
  
  const textToScan = `${course.title} ${course.description || ''} ${course.careerPath?.join(' ') || ''}`.toLowerCase();
  const possibleNiches = TIER3_MAPPING[tier2] || GENERIC_NICHES.map(n => `${tier2} ${n}`);
  
  let tags: string[] = [];
  
  // Scan for keywords
  for (const niche of possibleNiches) {
    if (textToScan.includes(niche.toLowerCase())) {
      tags.push(niche);
    }
  }
  
  // Ensure at least 3 Tier 3 tags as requested
  let attempts = 0;
  while (tags.length < 3 && attempts < 20) {
    const randomNiche = possibleNiches[Math.floor(Math.random() * possibleNiches.length)];
    if (!tags.includes(randomNiche)) {
      tags.push(randomNiche);
    }
    attempts++;
  }
  
  return {
    ...course,
    tier1,
    tier2,
    tier3Tags: tags.slice(0, 5) // max 5 tags
  };
});

// 2. Build Taxonomy Tree
export function buildTaxonomyTree(): TaxonomyNode[] {
  const tree: TaxonomyNode[] = [];
  
  TAXONOMY.forEach((pillar: Pillar) => {
    const t1Id = `t1-${pillar.slug}`;
    const t1Node: TaxonomyNode = {
      id: t1Id,
      name: pillar.name,
      level: 1,
      count: 0,
      children: []
    };
    
    pillar.subCategories.forEach((sub: SubCategory) => {
      const t2Id = `t2-${sub.slug}`;
      const t2Node: TaxonomyNode = {
        id: t2Id,
        name: sub.name,
        level: 2,
        parentId: t1Id,
        count: 0,
        children: []
      };
      
      const possibleNiches = TIER3_MAPPING[sub.name] || GENERIC_NICHES.map(n => `${sub.name} ${n}`);
      
      possibleNiches.forEach((niche: string) => {
        const t3Id = `t3-${niche.toLowerCase().replace(/\s+/g, '-')}`;
        
        // Count courses for this niche
        const courseCount = TAGGED_COURSES.filter(c => c.tier3Tags.includes(niche)).length;
        
        const t3Node: TaxonomyNode = {
          id: t3Id,
          name: niche,
          level: 3,
          parentId: t2Id,
          count: courseCount,
          children: []
        };
        
        t2Node.children.push(t3Node);
        t2Node.count += courseCount; // Aggregate to Tier 2
      });
      
      t1Node.children.push(t2Node);
      t1Node.count += t2Node.count; // Aggregate to Tier 1
    });
    
    tree.push(t1Node);
  });
  
  return tree;
}

export const HIERARCHICAL_TAXONOMY = buildTaxonomyTree();

// Helper to flatten the tree for react-window based on expanded state
export function getVisibleNodes(
  tree: TaxonomyNode[], 
  expandedIds: Set<string>, 
  searchQuery: string = ""
): TaxonomyNode[] {
  const visible: TaxonomyNode[] = [];
  
  const query = searchQuery.toLowerCase();
  
  // If searching, we flatten everything that matches and auto-expand parents
  const isSearching = query.length > 0;

  function traverse(node: TaxonomyNode, parentMatch: boolean = false) {
    const nodeMatch = node.name.toLowerCase().includes(query);
    const hasMatchingChild = node.children.some(c => c.name.toLowerCase().includes(query) || c.children.some(cc => cc.name.toLowerCase().includes(query)));
    
    if (isSearching) {
      if (nodeMatch || hasMatchingChild || parentMatch) {
        visible.push(node);
        if (node.children.length > 0) {
          node.children.forEach(c => traverse(c, nodeMatch || parentMatch));
        }
      }
    } else {
      // Normal tree traversal based on expanded state
      visible.push(node);
      if (expandedIds.has(node.id) && node.children.length > 0) {
        node.children.forEach(c => traverse(c));
      }
    }
  }
  
  tree.forEach(rootNode => traverse(rootNode));
  return visible;
}
