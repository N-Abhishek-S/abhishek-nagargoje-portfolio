"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Transition from "../../components/Transition";
import Achievements from "../../components/pages/Achievements";
export default function AchievementsPage() {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="h-full">
        <Transition /><Achievements />
      </motion.div>
    </AnimatePresence>
  );
}