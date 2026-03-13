"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { BsGithub, BsGlobe, BsArrowUpRight, BsTrophy } from "react-icons/bs";

// ─── Data ────────────────────────────────────────────────────────────────────
export const projectCategories = [
  { id: "all",      label: "All Projects" },
  { id: "client",   label: "Client Work"  },
  { id: "ai",       label: "AI / ML"      },
  { id: "frontend", label: "Frontend"     },
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
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_COLORS = {
  Live:          { dot: "#22c55e", bg: "rgba(34,197,94,0.12)",   text: "#86efac" },
  "In Progress": { dot: "#f59e0b", bg: "rgba(245,158,11,0.12)",  text: "#fcd34d" },
  Archived:      { dot: "#6b7280", bg: "rgba(107,114,128,0.12)", text: "#9ca3af" },
};

// ── Accent colour per category ───────────────────────────────────────────────
const CATEGORY_ACCENT = {
  client:   { from: "rgba(244,114,182,0.18)", to: "rgba(251,191,36,0.10)", pill: "#f472b6" },
  ai:       { from: "rgba(99,102,241,0.18)",  to: "rgba(168,85,247,0.12)", pill: "#818cf8" },
  frontend: { from: "rgba(34,211,238,0.15)",  to: "rgba(99,102,241,0.10)", pill: "#67e8f9" },
};
const accentFor = (cat) => CATEGORY_ACCENT[cat] || CATEGORY_ACCENT["ai"];

// ── Subtle grid background ───────────────────────────────────────────────────
const GridBackground = () => (
  <div
    aria-hidden
    className="pointer-events-none fixed inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
      `,
      backgroundSize: "72px 72px",
    }}
  />
);

// ── Ambient glow blobs ───────────────────────────────────────────────────────
const AmbientGlow = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div style={{
      position:"absolute", top:"-20%", right:"-10%",
      width:"600px", height:"600px", borderRadius:"50%",
      background:"radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
      filter:"blur(40px)",
    }} />
    <div style={{
      position:"absolute", bottom:"10%", left:"-5%",
      width:"500px", height:"500px", borderRadius:"50%",
      background:"radial-gradient(circle, rgba(244,114,182,0.08) 0%, transparent 70%)",
      filter:"blur(60px)",
    }} />
  </div>
);

// ── Status pill ──────────────────────────────────────────────────────────────
const StatusPill = ({ status }) => {
  const c = STATUS_COLORS[status] || STATUS_COLORS["Archived"];
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
      style={{ background: c.bg, color: c.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot, boxShadow: `0 0 6px ${c.dot}` }} />
      {status}
    </span>
  );
};

// ── Project Card ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const accent = accentFor(project.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%)",
        border: hovered ? `1px solid ${accent.pill}55` : "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered
          ? `0 0 40px ${accent.pill}25, 0 20px 60px rgba(0,0,0,0.4)`
          : "0 8px 32px rgba(0,0,0,0.25)",
      }}
    >
      {/* Header strip */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${accent.from} 0%, ${accent.to} 100%)` }}
      >
        {/* Large letter watermark */}
        <span
          className="select-none font-black"
          style={{
            fontSize: "7rem", lineHeight: 1,
            color: "rgba(255,255,255,0.04)",
            fontFamily: "'Georgia', serif",
            letterSpacing: "-4px",
          }}
        >
          {project.title.charAt(0)}
        </span>

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {project.featured && (
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: `${accent.pill}dd`, color: "#fff", letterSpacing: "0.04em" }}
            >
              Featured
            </span>
          )}
          {project.achievement && (
            <span
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(251,191,36,0.85)", color: "#1a1200", letterSpacing: "0.04em" }}
            >
              <BsTrophy className="text-xs" /> State Level
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <StatusPill status={project.status} />
        </div>

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center gap-3"
              style={{ background: "linear-gradient(to top, rgba(10,10,20,0.92) 0%, rgba(10,10,20,0.6) 100%)" }}
            >
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full"
                  style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.9)"; e.currentTarget.style.borderColor = "transparent"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
                >
                  <BsGithub /> GitHub
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full"
                  style={{ background: `${accent.pill}cc`, color: "#fff", border: "1px solid transparent" }}
                >
                  <BsGlobe /> Live Site
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-lg font-semibold leading-snug transition-colors duration-200"
            style={{ color: hovered ? accent.pill : "#f1f5f9" }}
          >
            {project.title}
          </h3>
          <BsArrowUpRight
            className="mt-0.5 shrink-0 transition-all duration-200"
            style={{ color: hovered ? accent.pill : "rgba(255,255,255,0.25)", transform: hovered ? "translate(2px,-2px)" : "none" }}
          />
        </div>

        {/* Role badge */}
        {project.role && (
          <span
            className="text-xs px-2.5 py-1 rounded-md w-fit"
            style={{ background: `${accent.pill}18`, color: accent.pill, border: `1px solid ${accent.pill}30` }}
          >
            {project.role}
          </span>
        )}

        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
          {project.shortDescription}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.techStack.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-md"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(255,255,255,0.08)",
                fontFamily: "'Courier New', monospace",
              }}
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span
              className="text-xs px-2.5 py-1 rounded-md"
              style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Features */}
        {project.features && (
          <div className="pt-4 mt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
              Highlights
            </p>
            <ul className="space-y-1.5">
              {project.features.slice(0, 3).map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ background: accent.pill }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.article>
  );
};

// ── Featured Spotlight — shows both featured projects side-by-side ────────────
const FeaturedSpotlight = () => {
  const featured = projectsData.filter((p) => p.featured);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mt-24"
    >
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs uppercase tracking-widest" style={{ color: "#818cf8", letterSpacing: "0.14em" }}>
          Featured Work
        </span>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {featured.map((project, i) => {
          const accent = accentFor(project.category);
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${accent.from} 0%, rgba(255,255,255,0.02) 100%)`,
                border: `1px solid ${accent.pill}30`,
              }}
            >
              {/* Corner glow */}
              <div
                aria-hidden
                className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${accent.pill}30 0%, transparent 65%)` }}
              />

              <div className="relative z-10 p-8 md:p-10">
                {/* Achievement badge */}
                {project.achievement && (
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full inline-flex items-center gap-1.5"
                      style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)" }}
                    >
                      <BsTrophy /> {project.achievement}
                    </span>
                  </div>
                )}
                {project.category === "client" && (
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                      style={{ background: `${accent.pill}20`, color: accent.pill, border: `1px solid ${accent.pill}35`, letterSpacing: "0.1em" }}
                    >
                      Real Client Project
                    </span>
                  </div>
                )}

                <h3
                  className="text-3xl md:text-4xl font-black mb-3 leading-tight tracking-tight"
                  style={{ color: "#f1f5f9" }}
                >
                  {project.title}
                  <span style={{ color: accent.pill }}>.</span>
                </h3>

                <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {project.description}
                </p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full font-medium"
                      style={{
                        background: `${accent.pill}18`,
                        color: accent.pill,
                        border: `1px solid ${accent.pill}30`,
                        fontFamily: "'Courier New', monospace",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-3 flex-wrap">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
                      style={{ background: `${accent.pill}dd`, color: "#fff" }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 8px 30px ${accent.pill}55`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                    >
                      <BsGlobe /> View Live
                      <BsArrowUpRight className="text-xs" />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
                      style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.12)" }}
                    >
                      <BsGithub /> GitHub
                    </a>
                  )}
                </div>

                {/* Scope metrics */}
                <div
                  className="mt-6 pt-5 grid grid-cols-2 gap-3"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {project.features.slice(0, 4).map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent.pill, boxShadow: `0 0 6px ${accent.pill}` }} />
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

// ── Main Page ────────────────────────────────────────────────────────────────
const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projectsData;
    return projectsData.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Syne', sans-serif; box-sizing: border-box; }
        code, .mono { font-family: 'JetBrains Mono', monospace !important; }
        ::selection { background: rgba(99,102,241,0.35); }
        ::-webkit-scrollbar { width: 6px; background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.4); border-radius: 3px; }
      `}</style>

      <div className="relative min-h-screen" style={{ background: "#080b14", color: "#f1f5f9" }}>
        <GridBackground />
        <AmbientGlow />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 md:py-36">

          {/* ── Page Header ── */}
          <div className="mb-16">
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-widest mb-4"
              style={{ color: "#818cf8", letterSpacing: "0.14em" }}
            >
              Portfolio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6"
              style={{ color: "#f1f5f9", letterSpacing: "-0.03em" }}
            >
              Selected
              <br />
              <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.25)", color: "transparent" }}>
                Projects
              </span>
              <span style={{ color: "#6366f1" }}>.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-lg text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              A curated collection of work — from real client deliverables to
              AI-powered platforms and cinematic frontends. Each project a step
              forward in craft and complexity.
            </motion.p>
          </div>

          {/* ── Filter Tabs ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-2 mb-12"
            role="tablist"
          >
            {projectCategories.map((cat) => {
              const active = activeCategory === cat.id;
              const pillColor = cat.id === "all" ? "#6366f1"
                : cat.id === "client"   ? "#f472b6"
                : cat.id === "ai"       ? "#818cf8"
                : "#67e8f9";
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(cat.id)}
                  className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  style={{
                    background: active ? pillColor : "rgba(255,255,255,0.06)",
                    color: active ? "#fff" : "rgba(255,255,255,0.55)",
                    border: active ? "1px solid transparent" : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: active ? `0 4px 20px ${pillColor}55` : "none",
                    transform: active ? "translateY(-1px)" : "none",
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </motion.div>

          {/* ── Projects Grid ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredProjects.length === 0 ? (
                <p className="col-span-full text-center py-20" style={{ color: "rgba(255,255,255,0.3)" }}>
                  No projects in this category yet.
                </p>
              ) : (
                filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))
              )}
            </motion.div>
          </AnimatePresence>

          <FeaturedSpotlight />

        </div>
      </div>
    </>
  );
};

export default Projects;