"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Transition from "../../components/Transition";
import About from "../../components/pages/About";
export default function AboutPage() {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="h-full">
        <Transition /><About />
      </motion.div>
    </AnimatePresence>
  );
}