import { NextRequest, NextResponse } from "next/server";

const AFFILIATE_MAP: { [key: string]: string } = {
  "google-genai": "https://www.coursera.org/learn/generative-ai-for-everyone?utm_source=learnmora",
  "harvard-cs50": "https://www.edx.org/course/introduction-computer-science-harvardx-cs50x?utm_source=learnmora",
  "ibm-ai-applied": "https://www.coursera.org/professional-certificates/applied-artifical-intelligence?utm_source=learnmora",
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const targetUrl = AFFILIATE_MAP[slug] || "https://learnmora.com/courses";

  // In production, we would log the click to Supabase here
  console.log(`[CLICK TRACKER] User redirected to ${slug}`);

  return NextResponse.redirect(targetUrl);
}
