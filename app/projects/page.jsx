"use client";
export const dynamic = "force-static";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Transition from "../../components/Transition";
import Projects from "../../components/pages/Projects";

export default function ProjectsPage() {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="h-full">
        <Transition />
        <Projects />
      </motion.div>
    </AnimatePresence>
  );
}