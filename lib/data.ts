/* -------------------------------------------------------------------------- */
/*  Content schema + default (seed) content                                   */
/*                                                                            */
/*  Everything here is JSON-serializable so it can be edited from the admin   */
/*  UI and persisted to /content/site-content.json. Icons are stored as       */
/*  string names resolved via lib/icons.tsx (iconMap).                        */
/* -------------------------------------------------------------------------- */

export type ServiceColor = "primary" | "secondary" | "accent";

export interface SiteConfig {
  name: string;
  shortName: string;
  role: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  available: boolean;
  url: string;
  heroImage: string;
  aboutImage: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Social {
  label: string;
  href: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface Service {
  title: string;
  icon: string;
  description: string;
  features: string[];
  color: ServiceColor;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  status?: string; // e.g. "Completed" | "In Progress"
  description: string;
  longDescription: string;
  image: string;
  tech: string[];
  demo: string;
  repo: string;
}

export interface ExperienceItem {
  role: string;
  period: string;
  summary: string;
  points: string[];
}

export interface Testimonial {
  name: string;
  company: string;
  avatar: string;
  rating: number;
  review: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
}

export interface SiteContent {
  siteConfig: SiteConfig;
  navLinks: NavLink[];
  socials: Social[];
  heroTitles: string[];
  stats: Stat[];
  bio: string[];
  services: Service[];
  skillGroups: SkillGroup[];
  portfolioCategories: string[];
  projects: Project[];
  experience: ExperienceItem[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                            */
/* -------------------------------------------------------------------------- */

export const defaultContent: SiteContent = {
  siteConfig: {
    name: "Jackson Lufungulo",
    shortName: "Jackson",
    role: "Creative Designer, Software Developer & Freelancer",
    description:
      "Create impactful digital experiences through design, development, and innovation.",
    email: "jasonlufungulo3@gmail.com",
    phone: "+26 0777 281 532",
    location: "Copperbelt, ZM · Remote Worldwide",
    available: true,
    url: "https://jacksonlufungulo.dev",
    heroImage: "/profile.jpg",
    aboutImage: "/profile.jpg",
  },

  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Skills", href: "#skills" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Experience", href: "#experience" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ],

  socials: [
    { label: "GitHub", href: "https://github.com/jacksonlufungulo", icon: "Github" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
    { label: "Facebook", href: "https://facebook.com", icon: "Facebook" },
    { label: "Instagram", href: "https://instagram.com", icon: "Instagram" },
    { label: "X (Twitter)", href: "https://x.com", icon: "Twitter" },
  ],

  heroTitles: [
    "Graphic Designer",
    "UI/UX Designer",
    "Full Stack Developer",
    "Freelancer",
    "Creative Thinker",
  ],

  stats: [
    { label: "Projects Completed", value: 50, suffix: "+" },
    { label: "Clients Served", value: 20, suffix: "+" },
    { label: "Years Experience", value: 3, suffix: "+" },
    { label: "Awards Won", value: 8, suffix: "" },
  ],

  bio: [
    "I'm a multidisciplinary creative who lives at the intersection of design and engineering. From crafting brand identities to shipping full-stack applications, I turn ambitious ideas into polished digital products.",
    "Over the past few years I've partnered with startups, agencies, and founders worldwide — blending an eye for aesthetics with the rigor of clean, performant code. Currently available for freelance projects and collaborations.",
  ],

  services: [
    {
      title: "Graphic Design",
      icon: "Palette",
      description:
        "Bold, memorable visuals that make brands stand out across every medium.",
      features: ["Branding", "Posters", "Flyers", "Social Media Designs"],
      color: "primary",
    },
    {
      title: "UI/UX Design",
      icon: "PenTool",
      description:
        "Human-centered interfaces that are as delightful to use as they are to look at.",
      features: ["Wireframing", "Prototyping", "Mobile Apps", "Web Design"],
      color: "secondary",
    },
    {
      title: "Web Development",
      icon: "Code2",
      description:
        "Fast, scalable, and accessible web apps built with modern frameworks.",
      features: [
        "Frontend Development",
        "Backend Development",
        "Full Stack Applications",
      ],
      color: "accent",
    },
    {
      title: "Freelancing Services",
      icon: "Briefcase",
      description:
        "End-to-end partnership from concept to launch — and the support after.",
      features: ["Client Projects", "Consulting", "Technical Support"],
      color: "primary",
    },
  ],

  skillGroups: [
    {
      category: "Design Skills",
      skills: [
        { name: "Adobe Photoshop", level: 92 },
        { name: "Adobe Illustrator", level: 88 },
        { name: "Figma", level: 95 },
        { name: "Canva", level: 90 },
      ],
    },
    {
      category: "Development Skills",
      skills: [
        { name: "HTML", level: 98 },
        { name: "CSS", level: 95 },
        { name: "JavaScript", level: 93 },
        { name: "TypeScript", level: 90 },
        { name: "PHP", level: 78 },
        { name: "Python", level: 82 },
        { name: "React", level: 94 },
        { name: "Next.js", level: 91 },
        { name: "Node.js", level: 87 },
        { name: "MySQL", level: 80 },
      ],
    },
    {
      category: "Other Tools",
      skills: [
        { name: "Git", level: 92 },
        { name: "GitHub", level: 93 },
        { name: "Docker", level: 75 },
        { name: "VS Code", level: 96 },
      ],
    },
  ],

  portfolioCategories: [
    "All",
    "Graphic Design",
    "Web Development",
    "UI/UX",
    "Branding",
    "Freelance Projects",
  ],

  projects: [
    {
      id: "mukuba-help-desk",
      title: "Mukuba Help Desk",
      category: "Web Development",
      status: "Live",
      description:
        "A student support & ticketing platform for Mukuba University, Kitwe.",
      longDescription:
        "Mukuba Help Desk is a self-service support portal for students at Mukuba University in Kitwe, Zambia. Students raise and track support tickets, browse a knowledge base, and complete key academic workflows — graduation clearance, de-registration, and appeals — from a single dashboard, with real-time notifications and live chat support.",
      image: "/uploads/helpdesk.png",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
      demo: "",
      repo: "",
    },
    {
      id: "logbook-pro",
      title: "LogBook Pro",
      category: "Web Development",
      status: "Live",
      description:
        "A digital logbook system for students on industrial attachment.",
      longDescription:
        "LogBook Pro is a Digital Attachment Logbook System that replaces the paper logbook for students on industrial attachment. Students record daily entries, submit weekly summaries, and track attachment progress, while supervisors review, approve, or reject entries with feedback — all backed by analytics dashboards and an in-app messaging system.",
      image: "/uploads/logbook-student-dashboard.png",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
      demo: "",
      repo: "",
    },
    {
      id: "zampa",
      title: "ZamPa",
      category: "Web Development",
      status: "Live",
      description: "A unified payment gateway built for Zambia.",
      longDescription:
        "ZamPa is a payment gateway that lets Zambian merchants accept payments through a single API — MTN MoMo, Airtel Money, Zamtel Kwacha, Visa/Mastercard and ZamPay. The merchant dashboard surfaces transaction volumes, settlements, API keys and webhooks, giving businesses one place to manage and reconcile every payment.",
      image: "/uploads/zampa.png",
      tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
      demo: "",
      repo: "",
    },
  ],

  experience: [
    {
      role: "Freelance Software Developer",
      period: "2023 — Present",
      summary:
        "Building full-stack web applications for clients across fintech, e-commerce, and SaaS.",
      points: [
        "Shipped 15+ production apps with Next.js, TypeScript & Node.js",
        "Maintained an average 98+ Lighthouse performance score",
        "Led architecture and code reviews for distributed teams",
      ],
    },
    {
      role: "Graphic Designer",
      period: "2022 — Present",
      summary:
        "Crafting brand identities, marketing collateral, and social campaigns.",
      points: [
        "Designed 30+ brand identities and visual systems",
        "Increased client social engagement by up to 3x",
        "Delivered print and digital assets for global campaigns",
      ],
    },
    {
      role: "Creative Designer",
      period: "2021 — Present",
      summary:
        "Concept-driven creative direction blending art and technology.",
      points: [
        "Directed creative for product launches and pitch decks",
        "Built reusable design systems adopted across teams",
        "Won 8 design awards and recognitions",
      ],
    },
  ],

  testimonials: [
    {
      name: "Sarah Mitchell",
      company: "CEO, Brightwave Studio",
      avatar: "https://i.pravatar.cc/150?img=47",
      rating: 5,
      review:
        "Jackson transformed our vague ideas into a stunning product. The blend of design taste and engineering skill is rare — delivery was flawless and ahead of schedule.",
    },
    {
      name: "David Chen",
      company: "Founder, Orbit Finance",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      review:
        "Our banking app went from concept to App Store in record time. The attention to detail in both the UI and the codebase was extraordinary.",
    },
    {
      name: "Amara Okafor",
      company: "Marketing Lead, Pulse Events",
      avatar: "https://i.pravatar.cc/150?img=32",
      rating: 5,
      review:
        "The festival campaign Jackson designed tripled our early-bird sales. Creative, reliable, and a genuine pleasure to collaborate with.",
    },
    {
      name: "Liam Novak",
      company: "CTO, Vela Commerce",
      avatar: "https://i.pravatar.cc/150?img=15",
      rating: 5,
      review:
        "A 99 Lighthouse score on a complex storefront — Jackson cares about performance as much as pixels. Highly recommended.",
    },
  ],

  blogPosts: [
    {
      id: "design-systems-2026",
      title: "Building Design Systems That Scale in 2026",
      category: "Design",
      date: "Jun 02, 2026",
      excerpt:
        "How to architect a token-driven design system that keeps teams fast without sacrificing consistency.",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "nextjs-15-server-components",
      title: "Mastering Server Components in Next.js 15",
      category: "Development",
      date: "May 18, 2026",
      excerpt:
        "A practical guide to the mental model behind RSC, streaming, and where the client boundary really belongs.",
      image:
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "freelance-pricing",
      title: "Pricing Freelance Work Without Underselling Yourself",
      category: "Freelancing",
      date: "Apr 29, 2026",
      excerpt:
        "Value-based pricing strategies I've used to grow a sustainable freelance practice.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    },
  ],
};
