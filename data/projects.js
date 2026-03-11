// Projects Data for Abhishek Nagargoje

export const projectsData = [
  {
    id: 1,
    title: "VeriMart - AI Shopping Assistant",
    description: `VeriMart is an AI-powered Health & E-Commerce website prototype built for 
    the Avishkar state-level competition. It features AI voice health assistant, 
    AI face analyzer for personalized recommendations, virtual try-on (planned), 
    price comparison engine, and AI-based product recommendations.`,
    shortDescription: "AI-powered Health & E-Commerce prototype for state-level competition",
    image: "/projects/verimart.jpg",
    category: "fullstack",
    featured: true,
    techStack: [
      "React.js",
      "Tailwind CSS",
      "GSAP",
      "Appwrite",
      "OpenAI API",
      "n8n",
    ],
    features: [
      "AI voice health assistant",
      "AI face analyzer",
      "Virtual try-on (planned)",
      "Price comparison engine",
      "AI product recommendations",
      "UI-first competition prototype",
    ],
    links: {
      github: "https://github.com/N-Abhishek-S",
      live: null, // Add when deployed
    },
    status: "In Development",
    scale: "~200-300 products for demo dataset",
  },
  {
    id: 2,
    title: "Mega Blog Project",
    description: `A full-featured blog platform with user authentication, 
    post creation, editing, and deletion capabilities. Built with React 
    for the frontend and Appwrite for backend services.`,
    shortDescription: "Full-featured blog platform with authentication and CRUD operations",
    image: "/projects/megablog.jpg",
    category: "fullstack",
    featured: true,
    techStack: [
      "React.js",
      "Appwrite",
      "Tailwind CSS",
    ],
    features: [
      "User authentication",
      "Create, read, update, delete posts",
      "Clean and responsive UI",
      "Image uploads",
    ],
    links: {
      github: "https://github.com/N-Abhishek-S",
      live: null,
    },
    status: "Completed",
  },
  {
    id: 3,
    title: "Paytm Clone",
    description: `A UI clone of the Paytm application built for practice 
    and to showcase frontend development skills. Features a pixel-perfect 
    recreation of the Paytm interface with responsive design.`,
    shortDescription: "Frontend UI clone for skill building and practice",
    image: "/projects/paytm.jpg",
    category: "frontend",
    featured: false,
    techStack: [
      "React.js",
      "CSS",
      "JavaScript",
    ],
    features: [
      "Pixel-perfect UI clone",
      "Responsive design",
      "Modern UI components",
    ],
    links: {
      github: "https://github.com/N-Abhishek-S",
      live: null,
    },
    status: "Completed",
  },
];

// Project Categories for filtering
export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "fullstack", label: "Full Stack" },
  { id: "frontend", label: "Frontend" },
];
