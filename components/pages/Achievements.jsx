"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import {
  HiOutlineTrophy,
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineSparkles,
} from "react-icons/hi2";

// ─── Mock data (replace with actual imports) ──────────────────────────────────
const achievementCategories = [
  { id: "competitions", label: "Competitions", icon: "trophy" },
  { id: "academic", label: "Academic", icon: "academic" },
  { id: "workshops", label: "Workshops", icon: "book" },
];

const achievementsData = {
  competitions: [
    {
      id: 1,
      title: "Avishkar 2025",
      level: "State Level",
      description:
        "Represented the college at the Dr. BAMU state-level project competition with VeriMart — an AI-powered health & e-commerce platform.",
      status: "Participant",
      year: "2025",
      project: "VeriMart",
      proofLink: null,
    },
    {
      id: 2,
      title: "Hackathon X",
      level: "Institute Level",
      description:
        "24-hour hackathon focused on building accessible fintech solutions for rural users.",
      status: "Runner Up",
      year: "2024",
      project: null,
      proofLink: null,
    },
  ],
  academic: [
    {
      id: 3,
      title: "Best Project Award",
      category: "Computer Science Dept.",
      description:
        "Awarded for outstanding semester project showcasing full-stack development and UI/UX design principles.",
      status: "Awarded",
      year: "2024",
      proofLink: null,
    },
    {
      id: 4,
      title: "Dean's List",
      category: "Academic Excellence",
      description: "Recognised on the Dean's List for consistent academic performance across two consecutive semesters.",
      status: "Ongoing",
      year: "2023–24",
      proofLink: null,
    },
  ],
  workshops: [
    {
      id: 5,
      title: "React & Next.js Bootcamp",
      category: "Frontend Development",
      description:
        "Completed an intensive bootcamp covering React fundamentals, advanced hooks, server components, and deployment.",
      status: "Completed",
      year: "2024",
      proofLink: null,
    },
    {
      id: 6,
      title: "AI/ML Workshop",
      category: "Machine Learning",
      description:
        "Participated in a hands-on workshop on supervised learning, neural networks, and integrating AI APIs into web apps.",
      status: "Learning",
      year: "2025",
      proofLink: null,
    },
  ],
};
// ──────────────────────────────────────────────────────────────────────────────

const ICON_MAP = {
  trophy: HiOutlineTrophy,
  academic: HiOutlineAcademicCap,
  book: HiOutlineBookOpen,
};

const TYPE_THEME = {
  competitions: {
    iconBg: "rgba(245,158,11,0.12)",
    iconColor: "#fbbf24",
    glow: "rgba(245,158,11,0.25)",
  },
  academic: {
    iconBg: "rgba(99,102,241,0.12)",
    iconColor: "#818cf8",
    glow: "rgba(99,102,241,0.25)",
  },
  workshops: {
    iconBg: "rgba(34,197,94,0.12)",
    iconColor: "#4ade80",
    glow: "rgba(34,197,94,0.25)",
  },
};

const STATUS_CONFIG = {
  Awarded: { bg: "rgba(34,197,94,0.1)", text: "#4ade80", dot: "#22c55e" },
  Completed: { bg: "rgba(34,197,94,0.1)", text: "#4ade80", dot: "#22c55e" },
  "Runner Up": { bg: "rgba(99,102,241,0.1)", text: "#a5b4fc", dot: "#6366f1" },
  Participant: { bg: "rgba(99,102,241,0.1)", text: "#a5b4fc", dot: "#6366f1" },
  Ongoing: { bg: "rgba(245,158,11,0.1)", text: "#fcd34d", dot: "#f59e0b" },
  Learning: { bg: "rgba(245,158,11,0.1)", text: "#fcd34d", dot: "#f59e0b" },
};

// ── Background grid ───────────────────────────────────────────────────────────
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

// ── Ambient blobs ─────────────────────────────────────────────────────────────
const AmbientGlow = ({ type }) => {
  const colors = {
    competitions: ["rgba(245,158,11,0.1)", "rgba(99,102,241,0.07)"],
    academic: ["rgba(99,102,241,0.1)", "rgba(168,85,247,0.07)"],
    workshops: ["rgba(34,197,94,0.09)", "rgba(99,102,241,0.06)"],
  };
  const [c1, c2] = colors[type] || colors.academic;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-8%",
          width: "560px",
          height: "560px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${c1} 0%, transparent 70%)`,
          filter: "blur(50px)",
          transition: "background 0.6s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-6%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${c2} 0%, transparent 70%)`,
          filter: "blur(60px)",
          transition: "background 0.6s ease",
        }}
      />
    </div>
  );
};

// ── Status pill ───────────────────────────────────────────────────────────────
const StatusPill = ({ status }) => {
  const c = STATUS_CONFIG[status] || STATUS_CONFIG["Participant"];
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

// ── Achievement Card ──────────────────────────────────────────────────────────
const AchievementCard = ({ achievement, type, index }) => {
  const [hovered, setHovered] = useState(false);
  const theme = TYPE_THEME[type] || TYPE_THEME.academic;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%)",
        border: hovered
          ? `1px solid ${theme.iconColor}55`
          : "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        boxShadow: hovered
          ? `0 0 32px ${theme.glow}, 0 16px 48px rgba(0,0,0,0.4)`
          : "0 4px 24px rgba(0,0,0,0.2)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Top accent line */}
      <div
        className="h-px w-full"
        style={{
          background: hovered
            ? `linear-gradient(90deg, transparent, ${theme.iconColor}88, transparent)`
            : "transparent",
          transition: "background 0.4s ease",
        }}
      />

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div
              className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
              style={{
                background: theme.iconBg,
                border: `1px solid ${theme.iconColor}30`,
                boxShadow: hovered ? `0 0 16px ${theme.glow}` : "none",
                transition: "box-shadow 0.3s ease",
              }}
            >
              {type === "competitions" && (
                <HiOutlineTrophy style={{ color: theme.iconColor, fontSize: "1.1rem" }} />
              )}
              {type === "academic" && (
                <HiOutlineAcademicCap style={{ color: theme.iconColor, fontSize: "1.1rem" }} />
              )}
              {type === "workshops" && (
                <HiOutlineBookOpen style={{ color: theme.iconColor, fontSize: "1.1rem" }} />
              )}
            </div>

            {/* Title & subtitle */}
            <div>
              <h3
                className="text-base font-semibold leading-snug transition-colors duration-200"
                style={{ color: hovered ? theme.iconColor : "#f1f5f9" }}
              >
                {achievement.title}
              </h3>
              {(achievement.level || achievement.category) && (
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {achievement.level || achievement.category}
                </p>
              )}
            </div>
          </div>

          {/* Year badge */}
          {achievement.year && (
            <div
              className="shrink-0 flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <HiOutlineCalendar style={{ color: theme.iconColor }} />
              {achievement.year}
            </div>
          )}
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {achievement.description}
        </p>

        {/* Footer */}
        <div
          className="flex items-center justify-between mt-auto pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <StatusPill status={achievement.status} />

          {achievement.proofLink ? (
            <a
              href={achievement.proofLink}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
              style={{ color: theme.iconColor }}
            >
              View Proof
              <HiOutlineArrowTopRightOnSquare />
            </a>
          ) : (
            <span
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Proof pending
            </span>
          )}
        </div>

        {/* Project reference */}
        {achievement.project && (
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
            style={{
              background: `${theme.iconColor}0f`,
              border: `1px solid ${theme.iconColor}22`,
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.35)" }}>Project —</span>
            <span style={{ color: theme.iconColor, fontFamily: "'JetBrains Mono', monospace" }}>
              {achievement.project}
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
};

// ── Avishkar Spotlight ────────────────────────────────────────────────────────
const AvishkarSpotlight = () => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="mt-24 rounded-3xl overflow-hidden relative"
    style={{
      background:
        "linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(99,102,241,0.08) 55%, rgba(244,114,182,0.06) 100%)",
      border: "1px solid rgba(245,158,11,0.22)",
    }}
  >
    {/* Corner glow */}
    <div
      aria-hidden
      className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at top right, rgba(245,158,11,0.18) 0%, transparent 65%)",
      }}
    />

    <div className="relative z-10 p-10 md:p-14 flex flex-col lg:flex-row gap-10 items-start">
      {/* Trophy icon block */}
      <div className="shrink-0">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{
            background: "rgba(245,158,11,0.15)",
            border: "1px solid rgba(245,158,11,0.3)",
            boxShadow: "0 0 40px rgba(245,158,11,0.2)",
          }}
        >
          <HiOutlineTrophy style={{ fontSize: "2.4rem", color: "#fbbf24" }} />
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="inline-flex items-center gap-2 mb-4">
          <HiOutlineSparkles style={{ color: "#fbbf24", fontSize: "0.85rem" }} />
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#fbbf24", letterSpacing: "0.12em" }}
          >
            Featured Achievement
          </span>
        </div>

        <h3
          className="text-4xl md:text-5xl font-black leading-none tracking-tight mb-4"
          style={{ color: "#f1f5f9", letterSpacing: "-0.03em" }}
        >
          Avishkar
          <span style={{ color: "#fbbf24" }}>.</span>
          <span
            className="block text-2xl md:text-3xl font-semibold mt-1"
            style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0" }}
          >
            Competition 2025
          </span>
        </h3>

        <p
          className="text-base leading-relaxed mb-8 max-w-xl"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Representing the college at the Dr. BAMU state-level project competition
          with <span style={{ color: "#fbbf24" }}>VeriMart</span> — an AI Shopping
          Assistant combining health technology, voice interaction, and smart
          e-commerce into a unified platform.
        </p>

        {/* Stat pills */}
        <div className="flex flex-wrap gap-3">
          {[
            ["Level", "State Level"],
            ["University", "Dr. BAMU"],
            ["Year", "2025"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="px-4 py-2.5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <p
                className="text-xs mb-0.5"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {label}
              </p>
              <p
                className="text-sm font-semibold"
                style={{ color: "#f1f5f9" }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.section>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
const Achievements = () => {
  const [activeTab, setActiveTab] = useState("competitions");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Syne', sans-serif; box-sizing: border-box; }
        .mono { font-family: 'JetBrains Mono', monospace !important; }
        ::selection { background: rgba(245,158,11,0.3); }
        ::-webkit-scrollbar { width: 6px; background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.35); border-radius: 3px; }
      `}</style>

      <div
        className="relative min-h-screen"
        style={{ background: "#080b14", color: "#f1f5f9" }}
      >
        <GridBackground />
        <AmbientGlow type={activeTab} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 md:py-36">
          {/* ── Header ── */}
          <div className="mb-16">
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-widest mb-4"
              style={{ color: "#fbbf24", letterSpacing: "0.14em" }}
            >
              Recognition
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6"
              style={{ letterSpacing: "-0.03em" }}
            >
              Certs &amp;
              <br />
              <span
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.22)",
                  color: "transparent",
                }}
              >
                Achievements
              </span>
              <span style={{ color: "#fbbf24" }}>.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-lg text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              A record of competitions, academic milestones, and continuous
              learning — each milestone a marker of growth and dedication.
            </motion.p>
          </div>

          {/* ── Tabs ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-2 mb-12"
            role="tablist"
          >
            {achievementCategories.map((cat) => {
              const Icon = ICON_MAP[cat.icon];
              const active = activeTab === cat.id;
              const theme = TYPE_THEME[cat.id];
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(cat.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-250 focus:outline-none focus-visible:ring-2"
                  style={{
                    background: active
                      ? `${theme.iconColor}22`
                      : "rgba(255,255,255,0.05)",
                    color: active ? theme.iconColor : "rgba(255,255,255,0.5)",
                    border: active
                      ? `1px solid ${theme.iconColor}55`
                      : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: active ? `0 4px 20px ${theme.glow}` : "none",
                    transform: active ? "translateY(-1px)" : "none",
                  }}
                >
                  {Icon && <Icon style={{ fontSize: "1rem" }} />}
                  {cat.label}
                </button>
              );
            })}
          </motion.div>

          {/* ── Grid ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {(achievementsData[activeTab] || []).length === 0 ? (
                <p
                  className="col-span-full text-center py-20"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  No entries in this category yet.
                </p>
              ) : (
                achievementsData[activeTab].map((item, i) => (
                  <AchievementCard
                    key={item.id}
                    achievement={item}
                    type={activeTab}
                    index={i}
                  />
                ))
              )}
            </motion.div>
          </AnimatePresence>

          {/* ── Spotlight ── */}
          <AvishkarSpotlight />

          {/* ── Footer note ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 text-center text-xs"
            style={{ color: "rgba(255,255,255,0.22)" }}
          >
            Certificate images and proof links will be added as they become available.
          </motion.p>
        </div>
      </div>
    </>
  );
};

export default Achievements;