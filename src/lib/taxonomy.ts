export interface SubCategory {
  name: string;
  slug: string;
  outlook: string;
}

export interface Pillar {
  name: string;
  slug: string;
  description: string;
  subCategories: SubCategory[];
}

export const TAXONOMY: Pillar[] = [
  {
    name: "Technology & Computer Science",
    slug: "technology",
    description: "The High-Traffic Core covering AI, Cloud, and bleeding-edge computing paradigms.",
    subCategories: [
      { name: "Artificial Intelligence", slug: "artificial-intelligence", outlook: "AI is reshaping industries globally. From Generative AI reducing operational overhead to Neural Networks predicting market trends, the demand for dedicated AI Architects and LLM Engineers is projected to grow by over 40% through the next decade. Professionals commanding these skills will forge the backbone of the next industrial revolution, enjoying unparalleled career elasticity and premium salary bands." },
      { name: "Software Development", slug: "software-development", outlook: "Software Development remains the indispensable foundation of the digital world. The landscape now demands full-stack agility combined with specialized DevOps knowledge. Mastery in iOS/Android or gaming pipelines ensures continuous relevancy. Developer roles provide resilient pathways with lucrative remote opportunities globally." },
      { name: "Data Science", slug: "data-science", outlook: "Data is the new global currency. Mastery over Big Data, Predictive Analytics, and Statistics empowers companies to pivot securely in volatile markets. Data Scientists and Visualization experts serve as the strategic compass for corporate leadership, driving decisions through actionable intelligence, generating massive professional leverage." },
      { name: "Cybersecurity", slug: "cybersecurity", outlook: "As our digital footprint expands, so does the threat matrix. Ethical Hacking, Digital Forensics, and Cloud Security are non-negotiable business imperatives. The cybersecurity domain boasts zero percent unemployment organically, and professionals are deployed globally to guard trillion-dollar infrastructures." },
      { name: "Emerging Tech", slug: "emerging-tech", outlook: "Quantum Computing, IoT, and Blockchain are disrupting traditional physics and finance paradigms. Pioneers in edge computing and cryptographic consensus mechanisms find themselves highly sought after right out of technical bootcamps. This is the frontier for those looking to build generational technological foundations." },
      { name: "Cloud Computing", slug: "cloud-computing", outlook: "Cloud virtualization enables global business scale. Navigating ecosystems like AWS, Azure, and Google Cloud ensures high availability for digital products. Cloud solutions architects run billion-dollar migrations, making this field one of the most critical and highest-paying sectors within corporate IT infrastructures." }
    ]
  },
  {
    name: "Business, Finance & Management",
    slug: "business",
    description: "Navigating global markets, ethical finance, and complex operational logistics.",
    subCategories: [
      { name: "Finance", slug: "finance", outlook: "Modern finance extends far beyond Wall Street. Fintech innovations, ESG Investing, and robust Risk Management dictates global enterprise sustainability. Professionals bridging traditional financial models with disruptive tech (blockchain ledgers, AI quant) secure prime positions as essential structural analysts driving corporate liquidity." },
      { name: "Management", slug: "management", outlook: "Excellence in execution makes Management a perennial need. Agile and Scrum frameworks accelerate product delivery, while PMP-certified leaders align cross-functional teams toward monumental milestones. A strong MBA core partnered with specialized operational leadership skills dramatically accelerates ascents into the C-Suite." },
      { name: "Marketing", slug: "marketing", outlook: "Growth hacking and SEO/SEM form the lifeblood of customer acquisition. In an intensely competitive digital space, mastering omnichannel Content Strategy ensures brand dominance. Marketing leaders adept at data-driven conversion funnels provide measurable, compounding value to digital enterprises." },
      { name: "Operations", slug: "operations", outlook: "Global Supply Chain optimization and Lean Management govern how goods and services physically traverse the planet. Six Sigma professionals drastically reduce waste and latency, increasing corporate profitability. Operations leaders guarantee systemic resilience in the face of macro-economic shocks." },
      { name: "Human Resources", slug: "human-resources", outlook: "Talent Acquisition and People Analytics have evolved HR into a core strategic pillar. Cultivating workplace culture and managing complex remote, globally distributed employee relations directly impacts organizational performance and talent retention. HR metrics now drive corporate valuation." },
      { name: "Sales", slug: "sales", outlook: "B2B Sales and Strategic Negotiation map directly to revenue generation. Expertise in CRM pipelines (e.g., Salesforce) and managing complex enterprise sales cycles produces indispensable corporate assets. Top closers and revenue strategists inherently command significant structural leverage." }
    ]
  },
  {
    name: "Engineering & Industry",
    slug: "engineering",
    description: "Physical infrastructure, renewable energy, and advanced manufacturing.",
    subCategories: [
      { name: "Mechanical", slug: "mechanical", outlook: "Mechanical engineering continues to evolve alongside Robotics, Thermodynamics, and advanced CAD/CAM processes. Engineers in this domain design the physical hardware powering automation and the transition toward highly efficient, intelligent manufacturing paradigms across the globe." },
      { name: "Electrical", slug: "electrical", outlook: "From Power Systems to intricate Embedded Systems, electrical engineers design the nervous systems of modern electronics. With the aggressive expansion of smart grids and electric vehicles, deep expertise in circuit design represents a critical, globally demanded competency." },
      { name: "Civil", slug: "civil", outlook: "Urban Planning, Structural Engineering, and robust Construction Management are fundamental to scalable societal growth. Civil engineers spearhead sustainable urban sprawl, architecting disaster-resilient infrastructure capable of weathering the physical consequences of rapid climate variation." },
      { name: "Energy", slug: "energy", outlook: "The global pivot to Renewable Energy (Solar/Wind) and advanced Nuclear Power guarantees an explosion of careers centered around sustainable grids. Professionals leading energy transitions stand at the forefront of the largest infrastructural paradigm shift of our century." },
      { name: "Aerospace", slug: "aerospace", outlook: "Aerodynamics and Satellite Tech lead the commercialization of space and the advancement of global communication vectors. Propulsion Systems engineers and aerospace technicians are building the off-world economy and accelerating trans-continental logistics." }
    ]
  },
  {
    name: "Healthcare & Life Sciences",
    slug: "healthcare",
    description: "Pioneering biotech, personalized medicine, and global wellness frameworks.",
    subCategories: [
      { name: "Medicine", slug: "medicine", outlook: "Telemedicine, Pharmacology, and advanced Medical Coding have fundamentally transformed patient intervention workflows. Medical professionals equipped with technical integration skills streamline diagnostics and patient outcomes, facing surging market demand globally." },
      { name: "Mental Health", slug: "mental-health", outlook: "Global initiatives have drastically destigmatized Psychology and Behavioral Therapy. Counseling and mental health administration stand as massively scaling fields, essential for societal well-being and integrated holistic corporate health frameworks." },
      { name: "Bio-Tech", slug: "bio-tech", outlook: "Genomics, CRISPR technology, and Bio-Informatics represent the frontier of human lifespan extension directly. Biotech experts command elite, specialized paths dedicated to eradicating diseases through personalized computational gene therapies." },
      { name: "Nursing", slug: "nursing", outlook: "Clinical Practice paired with modern Healthcare Administration determines the qualitative throughput of hospital systems. The nursing profession remains critically understaffed globally, ensuring bulletproof job security and escalating incentive structures." },
      { name: "Nutrition", slug: "nutrition", outlook: "Dietetics, Food Science, and Sports Nutrition serve as preventative healthcare foundations. With increasing awareness around bio-availability and specialized diets, nutritionists dictate personal and professional athlete performance optimizations." }
    ]
  },
  {
    name: "Creative Arts & Design",
    slug: "creative-arts",
    description: "Experience design, digital media, and architectural aesthetics.",
    subCategories: [
      { name: "Visual Design", slug: "visual-design", outlook: "UI/UX, Graphic Design, and Motion Graphics determine how billions of users interface with software. Superior visual design is a competitive moat. Creatives capable of mapping intuitive psychological user journeys are pivotal to modern product success." },
      { name: "Media", slug: "media", outlook: "Video Production, Podcasting, and cross-channel Journalism form the basis of modern narrative distribution. In the attention economy, media creators adept at scaling multi-platform engagement hold the keys to brand viability and massive organic reach." },
      { name: "Architecture", slug: "architecture", outlook: "Sustainable Architecture and Landscape Design blend deep structural engineering with aesthetic humanism. Forward-thinking architects create eco-positive environments, revolutionizing how societies interact with living and commercial spaces." },
      { name: "Fashion", slug: "fashion", outlook: "Textile Design and Luxury Brand Management intersect specialized materials science with elite market positioning. With sustainable fashion merging into the mainstream, innovative designers and merchandisers dictate billion-dollar consumer trends." }
    ]
  },
  {
    name: "Humanities, Law & Social Sciences",
    slug: "humanities",
    description: "Legal frameworks, linguistics, and ethical societal development.",
    subCategories: [
      { name: "Law", slug: "law", outlook: "Corporate Law, Intellectual Property, and Cyber Law adapt classical legal precedents to the digital age. Attorneys specializing in deep tech IP and international regulatory compliance are essential defensive and offensive corporate assets." },
      { name: "Education", slug: "education", outlook: "Instructional Design and E-Learning have democratized global knowledge access. Specialists blending Special Education with gamified tech platforms architect the standardized curricula of tomorrow, fundamentally lifting global literacy rates." },
      { name: "Languages", slug: "languages", outlook: "Fluent command of TESOL, Mandarin, Spanish, and cross-cultural Linguistics breaks down critical commercial barriers. Language experts facilitate international corporate integrations and drive sophisticated global expansion blueprints." },
      { name: "Philosophy", slug: "philosophy", outlook: "Ethics in AI, Political Science, and Sociology are providing the crucial moral scaffolding for emerging technology. These professionals guide corporate boards and governments in safely deploying powerful, globally disruptive technological infrastructures." }
    ]
  }
];

// Flat export of all sub-categories for search / random generation mapping
export const ALL_DEPARTMENTS = TAXONOMY.flatMap(p => 
  p.subCategories.map(s => ({ ...s, pillar: p.name, pillarSlug: p.slug }))
);

export function getDepartmentBySlug(slug: string) {
  return ALL_DEPARTMENTS.find(d => d.slug === slug);
}
