import fs from "fs";
import path from "path";

const ASSETS_DIR = path.join(process.cwd(), "public", "assets", "provider-logos");
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

// Mapped exact SimpleIcon slugs and custom URLs for the 24 entities
const LOGO_SOURCING = [
  // PLATFORMS
  { slug: "linkedin-learning", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png" },
  { slug: "coursera", url: "https://cdn.simpleicons.org/coursera/0056D2" },
  { slug: "edx", url: "https://cdn.simpleicons.org/edx/02262B" },
  { slug: "udemy", url: "https://cdn.simpleicons.org/udemy/A435F0" },
  { slug: "udacity", url: "https://cdn.simpleicons.org/udacity/01B3E4" },
  { slug: "pluralsight", url: "https://cdn.simpleicons.org/pluralsight/F15B2A" },
  { slug: "skillshare", url: "https://cdn.simpleicons.org/skillshare/00FF84" },
  { slug: "deeplearning-ai", url: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Deeplearning.ai_logo.svg"},

  // GLOBAL INSTITUTIONS
  { slug: "google", url: "https://cdn.simpleicons.org/google/4285F4" },
  { slug: "google-cloud", url: "https://cdn.simpleicons.org/googlecloud/4285F4" },
  { slug: "microsoft", url: "https://cdn.simpleicons.org/microsoft/00A4EF" },
  { slug: "aws", url: "https://cdn.simpleicons.org/amazonaws/232F3E" },
  { slug: "ibm", url: "https://cdn.simpleicons.org/ibm/0530AD" },
  { slug: "meta", url: "https://cdn.simpleicons.org/meta/0468FF" },
  { slug: "nvidia", url: "https://cdn.simpleicons.org/nvidia/76B900" },
  { slug: "apple", url: "https://cdn.simpleicons.org/apple/000000" },

  // UNIVERSITIES (Clearbit proxies for SVGs/PNGs since SimpleIcons lacks Universities)
  { slug: "harvard-university", url: "https://logo.clearbit.com/harvard.edu" },
  { slug: "stanford-university", url: "https://logo.clearbit.com/stanford.edu" },
  { slug: "mit", url: "https://logo.clearbit.com/mit.edu" },
  { slug: "yale-university", url: "https://logo.clearbit.com/yale.edu" },
  { slug: "princeton-university", url: "https://logo.clearbit.com/princeton.edu" },
  { slug: "columbia-university", url: "https://logo.clearbit.com/columbia.edu" },
  { slug: "university-of-pennsylvania", url: "https://logo.clearbit.com/upenn.edu" },
  { slug: "cornell-university", url: "https://logo.clearbit.com/cornell.edu" },
];

async function execute() {
  console.log("== DEPLOYING 24 PRIORITY LOGOS ==");
  
  for (const { slug, url } of LOGO_SOURCING) {
    try {
      const ext = url.endsWith('.svg') || url.includes('simpleicons') ? 'svg' : 'png';
      const filepath = path.join(ASSETS_DIR, `${slug}.${ext}`);
      
      const res = await fetch(url);
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(filepath, Buffer.from(buffer));
        console.log(`[+] Downloaded: ${slug}`);
      } else {
        console.log(`[-] Failed: ${slug}`);
      }
    } catch (e) {
      console.log(`[!] Error: ${slug}`);
    }
  }
}

execute();
