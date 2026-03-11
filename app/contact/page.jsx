"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Transition from "../../components/Transition";
import Contact from "../../components/pages/Contact";
export default function ContactPage() {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="h-full">
        <Transition /><Contact />
      </motion.div>
    </AnimatePresence>
  );
}