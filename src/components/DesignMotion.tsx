import { createContext, useContext, type ReactNode } from "react";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";

const MotionContext = createContext({ still: false });
export const useDesignMotion = () => useContext(MotionContext);

export function DesignMotion({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const still = !!reduced;
  return <MotionContext.Provider value={{ still }}>
    <MotionConfig reducedMotion="user" transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
      <div className="studio-site" data-motion={still ? "still" : "active"}>{children}</div>
    </MotionConfig>
  </MotionContext.Provider>;
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { still } = useDesignMotion();
  return <motion.div className={className} initial={still ? false : { opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
