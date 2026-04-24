export interface Review {
  slug: string;
  title: string;
  price: string;
  duration: string;
  roi: string;
  worthItScore: number;
  verdict: string;
  pros: string[];
  cons: string[];
}

export const REVIEWS: Review[] = [
  {
    slug: "pmp-review-2026",
    title: "Project Management Professional (PMP) 2026: Is it Still Worth it?",
    price: "$555",
    duration: "35 Hours + Exam",
    roi: "+$15,000 /yr",
    worthItScore: 9.2,
    verdict: "Essential for senior management roles, but losing ground to agile-specific certs in tech.",
    pros: ["Global recognition", "High salary bump", "Strong alumni network"],
    cons: ["Expensive exam", "Difficult maintenance", "Legacy focus"]
  },
  {
    slug: "aws-solutions-architect",
    title: "AWS Solutions Architect Professional: The ROI Deep-Dive",
    price: "$300",
    duration: "80+ Hours study",
    roi: "+$22,000 /yr",
    worthItScore: 9.8,
    verdict: "The highest ROI cert in the cloud ecosystem for 2026.",
    pros: ["Extreme market demand", "Practical skills", "Scalable knowledge"],
    cons: ["Very difficult", "Requires hands-on experience"]
  }
];

export async function getReviews() {
  return REVIEWS;
}

export async function getReviewBySlug(slug: string) {
  return REVIEWS.find(r => r.slug === slug);
}
