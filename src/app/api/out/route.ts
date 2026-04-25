import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("course");
  const provider = searchParams.get("provider") || "unknown";
  const title = searchParams.get("title") || "";

  if (!courseId) {
    return NextResponse.redirect(new URL("/courses", request.url));
  }

  // Generate a clean deep-link slug from the title
  const deepSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  console.info(`[Server Analytics] Deep Link Redirect Triggered: Provider ${provider}, Course ${courseId}`);

  let redirectUrl = "";
  const providerSlug = provider.toLowerCase();

  // Route to the explicit learning payload per provider guidelines
  if (providerSlug.includes("coursera")) {
    redirectUrl = deepSlug ? `https://www.coursera.org/learn/${deepSlug}?ref=learnmora` : `https://www.coursera.org/search?query=${courseId}`;
  } else if (providerSlug.includes("harvard") || providerSlug.includes("mit") || providerSlug.includes("edx")) {
    redirectUrl = `https://www.edx.org/search?q=${encodeURIComponent(title)}&ref=learnmora`;
  } else if (providerSlug.includes("microsoft") || providerSlug.includes("linkedin")) {
    redirectUrl = deepSlug ? `https://learn.microsoft.com/en-us/training/paths/${deepSlug}?wt.mc_id=studentamb_learnmora` : `https://learn.microsoft.com/en-us/training/`;
  } else if (providerSlug.includes("google")) {
    redirectUrl = `https://cloud.google.com/training?ref=learnmora`;
  } else if (providerSlug.includes("aws")) {
    redirectUrl = `https://aws.amazon.com/training/?ref=learnmora`;
  } else {
    redirectUrl = `https://www.google.com/search?q=${encodeURIComponent(provider + " " + title + " certification")}`;
  }

  return NextResponse.redirect(redirectUrl, { status: 302 });
}
