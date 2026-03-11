"use client";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useMemo, useRef } from "react";
import { BsGithub, BsGlobe, BsArrowUpRight } from "react-icons/bs";

// ─── Mock data (replace with actual imports) ────────────────────────────────
const projectCategories = [
  { id: "all", label: "All Work" },
  { id: "fullstack", label: "Full Stack" },
  { id: "frontend", label: "Frontend" },
  { id: "ai", label: "AI / ML" },
  { id: "tools", label: "Tools" },
];

const projectsData = [
  {
    id: 1,
    title: "VeriMart",
    shortDescription:
      "AI-powered Health & E-Commerce platform with voice assistant and face analysis.",
    category: "ai",
    featured: true,
    status: "Live",
    techStack: ["React.js", "Tailwind CSS", "GSAP", "Appwrite", "OpenAI API", "n8n"],
    features: ["Voice health assistant", "AI face analyzer", "Price comparison engine"],
    links: { github: "https://github.com/N-Abhishek-S", live: null },
  },
  {
    id: 2,
    title: "Portfolio v2",
    shortDescription: "Personal portfolio showcasing projects and skills.",
    category: "frontend",
    featured: false,
    status: "Live",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS"],
    features: ["Animated transitions", "Project showcase", "Contact form"],
    links: { github: "https://github.com/N-Abhishek-S", live: "#" },
  },
  {
    id: 3,
    title: "DevTracker",
    shortDescription: "Task and productivity tracker built for developers.",
    category: "tools",
    featured: false,
    status: "In Progress",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    features: ["Kanban board", "Time tracking", "Team collaboration"],
    links: { github: "https://github.com/N-Abhishek-S", live: null },
  },
];
// ────────────────────────────────────────────────────────────────────────────

const STATUS_COLORS = {
  Live: { dot: "#22c55e", bg: "rgba(34,197,94,0.12)", text: "#86efac" },
  "In Progress": { dot: "#f59e0b", bg: "rgba(245,158,11,0.12)", text: "#fcd34d" },
  Archived: { dot: "#6b7280", bg: "rgba(107,114,128,0.12)", text: "#9ca3af" },
};

// ── Subtle grid background ───────────────────────────────────────────────────
const GridBackground = () => (
  <div
    aria-hidden
    className="pointer-events-none fixed inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
      `,
      backgroundSize: "72px 72px",
    }}
  />
);

// ── Ambient glow blobs ───────────────────────────────────────────────────────
const AmbientGlow = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div
      style={{
        position: "absolute",
        top: "-20%",
        right: "-10%",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        filter: "blur(40px)",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: "10%",
        left: "-5%",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(244,114,182,0.08) 0%, transparent 70%)",
        filter: "blur(60px)",
      }}
    />
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
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: c.dot, boxShadow: `0 0 6px ${c.dot}` }}
      />
      {status}
    </span>
  );
};

// ── Project Card ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

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
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%)",
        border: hovered
          ? "1px solid rgba(99,102,241,0.45)"
          : "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered
          ? "0 0 40px rgba(99,102,241,0.15), 0 20px 60px rgba(0,0,0,0.4)"
          : "0 8px 32px rgba(0,0,0,0.25)",
      }}
    >
      {/* Header strip */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.1) 50%, rgba(244,114,182,0.08) 100%)",
        }}
      >
        {/* Large letter */}
        <span
          className="select-none font-black"
          style={{
            fontSize: "7rem",
            lineHeight: 1,
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
              style={{
                background: "rgba(99,102,241,0.9)",
                color: "#fff",
                letterSpacing: "0.04em",
              }}
            >
              Featured
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <StatusPill status={project.status} />
        </div>

        {/* Hover overlay with links */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center gap-3"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,10,20,0.92) 0%, rgba(10,10,20,0.6) 100%)",
              }}
            >
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(99,102,241,0.9)";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  }}
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
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all duration-200"
                  style={{
                    background: "rgba(99,102,241,0.85)",
                    color: "#fff",
                    border: "1px solid transparent",
                  }}
                >
                  <BsGlobe /> Live
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
            style={{ color: hovered ? "#a5b4fc" : "#f1f5f9" }}
          >
            {project.title}
          </h3>
          <BsArrowUpRight
            className="mt-0.5 shrink-0 transition-all duration-200"
            style={{
              color: hovered ? "#a5b4fc" : "rgba(255,255,255,0.25)",
              transform: hovered ? "translate(2px, -2px)" : "none",
            }}
          />
        </div>

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
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.35)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Features */}
        {project.features && (
          <div
            className="pt-4 mt-1"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}
            >
              Highlights
            </p>
            <ul className="space-y-1.5">
              {project.features.slice(0, 3).map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-xs"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ background: "#818cf8" }}
                  />
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

// ── VeriMart Spotlight ───────────────────────────────────────────────────────
const HeroSpotlight = () => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="mt-24 rounded-3xl overflow-hidden relative"
    style={{
      background:
        "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.08) 50%, rgba(244,114,182,0.06) 100%)",
      border: "1px solid rgba(99,102,241,0.25)",
    }}
  >
    {/* decorative corner accent */}
    <div
      aria-hidden
      className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at top right, rgba(99,102,241,0.2) 0%, transparent 65%)",
      }}
    />

    <div className="relative z-10 p-10 md:p-14 flex flex-col lg:flex-row gap-10 items-start">
      {/* Left – text */}
      <div className="flex-1 min-w-0">
        <div className="inline-flex items-center gap-2 mb-4">
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(99,102,241,0.2)",
              color: "#a5b4fc",
              border: "1px solid rgba(99,102,241,0.35)",
              letterSpacing: "0.12em",
            }}
          >
            State Level Competition — Avishkar
          </span>
        </div>

        <h3
          className="text-4xl md:text-5xl font-black mb-4 leading-[1.1] tracking-tight"
          style={{ color: "#f1f5f9" }}
        >
          VeriMart
          <span style={{ color: "#818cf8" }}>.</span>
        </h3>

        <p
          className="text-base leading-relaxed mb-8 max-w-lg"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          Flagship AI-powered Health &amp; E-Commerce prototype featuring a voice
          health assistant, real-time face analyzer, cross-platform price comparison,
          and personalised product recommendations — built for the Avishkar state-level
          competition.
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["React.js", "Tailwind CSS", "GSAP", "Appwrite", "OpenAI API", "n8n"].map(
            (tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm rounded-full font-medium"
                style={{
                  background: "rgba(99,102,241,0.15)",
                  color: "#a5b4fc",
                  border: "1px solid rgba(99,102,241,0.3)",
                  fontFamily: "'Courier New', monospace",
                }}
              >
                {tech}
              </span>
            )
          )}
        </div>

        <a
          href="https://github.com/N-Abhishek-S"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300"
          style={{
            background: "rgba(99,102,241,0.9)",
            color: "#fff",
            letterSpacing: "0.02em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#6366f1";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(99,102,241,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(99,102,241,0.9)";
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <BsGithub className="text-base" />
          View Repository
          <BsArrowUpRight className="text-xs" />
        </a>
      </div>

      {/* Right – metrics card */}
      <div
        className="lg:w-72 w-full rounded-2xl p-6 shrink-0"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
        }}
      >
        <p
          className="text-xs uppercase tracking-widest mb-5"
          style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}
        >
          Project Scope
        </p>
        <ul className="space-y-4">
          {[
            ["~200–300 products", "Demo catalogue"],
            ["AI voice assistant", "Health queries"],
            ["Face analyzer", "Skin & wellness"],
            ["UI-first approach", "Competition strategy"],
          ].map(([title, sub], i) => (
            <li key={i} className="flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  background: "#818cf8",
                  boxShadow: "0 0 8px rgba(129,140,248,0.6)",
                }}
              />
              <div>
                <p className="text-sm font-medium" style={{ color: "#e2e8f0" }}>
                  {title}
                </p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {sub}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </motion.section>
);

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

      <div
        className="relative min-h-screen"
        style={{ background: "#080b14", color: "#f1f5f9" }}
      >
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
              <span
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.25)",
                  color: "transparent",
                }}
              >
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
              A curated collection of work built while honing frontend
              development skills — each project a step forward in craft and
              complexity.
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
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(cat.id)}
                  className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  style={{
                    background: active ? "#6366f1" : "rgba(255,255,255,0.06)",
                    color: active ? "#fff" : "rgba(255,255,255,0.55)",
                    border: active
                      ? "1px solid transparent"
                      : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: active ? "0 4px 20px rgba(99,102,241,0.4)" : "none",
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
                <p
                  className="col-span-full text-center py-20"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  No projects in this category yet.
                </p>
              ) : (
                filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))
              )}
            </motion.div>
          </AnimatePresence>

          {/* ── Hero Spotlight ── */}
          <HeroSpotlight />
        </div>
      </div>
    </>
  );
};

export default Projects;