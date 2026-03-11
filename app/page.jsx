"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Transition from "../components/Transition";
import Home from "../components/pages/Home";

export default function App() {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="h-full">
        <Transition /><Home />
      </motion.div>
    </AnimatePresence>
  );
}