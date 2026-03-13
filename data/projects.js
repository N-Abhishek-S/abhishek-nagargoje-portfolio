export const projectCategories = [
  { id: "all",       label: "All Projects" },
  { id: "client",    label: "Client Work"  },
  { id: "ai",        label: "AI / ML"      },
  { id: "frontend",  label: "Frontend"     },
];

export const projectsData = [
  {
    id: 1,
    title: "Client Photography Website",
    shortDescription:
      "Professional photography portfolio built for a real client — gallery-first design with GSAP animations and Appwrite backend.",
    description:
      "A professional photography portfolio website developed for a client to showcase their work and attract new customers. Focused on visual presentation, smooth animations, and a modern UI suitable for a photography business.",
    techStack: ["React.js", "Tailwind CSS", "GSAP", "Appwrite", "REST API"],
    features: [
      "Responsive photography gallery",
      "Smooth page transitions via GSAP",
      "Appwrite backend integration",
      "Optimized image loading & display",
      "Client-focused conversion design",
    ],
    category: "client",
    status: "Live",
    featured: true,
    role: "Full-stack — UI, animations & backend",
    links: {
      github: null,
      live: "https://n-abhishek-s.github.io/Client_photography_Website/",
    },
  },
  {
    id: 2,
    title: "AI Health & E-Commerce Assistant",
    shortDescription:
      "Intelligent web platform combining healthcare assistance with AI-powered product recommendations — selected for State Level Competition.",
    description:
      "An AI-powered platform that blends healthcare assistance with smart e-commerce recommendations. Analyses user inputs and suggests relevant health products. Selected for a State Level Innovation Competition.",
    techStack: ["React.js", "Tailwind CSS", "Appwrite", "OpenAI API"],
    features: [
      "AI-based product recommendation engine",
      "Health assistance chat interface",
      "Smart product analysis & filtering",
      "Scalable e-commerce architecture",
      "OpenAI API integration",
    ],
    category: "ai",
    status: "Live",
    featured: true,
    achievement: "State Level Innovation Competition",
    role: "Full-stack — UI, AI integration & backend",
    links: {
      github: null,
      live: "https://n-abhishek-s.github.io/AI_Ecommerce-Health-Assistant-/",
    },
  },
  {
    id: 3,
    title: "MarsidiCars — Car Showroom",
    shortDescription:
      "Luxury automotive showroom with cinematic GSAP scroll animations, interactive car showcase layouts, and high-performance frontend.",
    description:
      "A visually impressive digital showroom for luxury vehicles. Demonstrates advanced frontend skills through animated sections, interactive layouts, and fully responsive design.",
    techStack: ["React.js", "Tailwind CSS", "GSAP"],
    features: [
      "Interactive car showcase layout",
      "Cinematic GSAP scroll animations",
      "Fully responsive across all devices",
      "Modern UI for automotive brands",
      "High-performance frontend architecture",
    ],
    category: "frontend",
    status: "Live",
    featured: false,
    role: "Frontend — architecture, animations & design",
    links: {
      github: null,
      live: "https://n-abhishek-s.github.io/Cars_Showroom",
    },
  },
];