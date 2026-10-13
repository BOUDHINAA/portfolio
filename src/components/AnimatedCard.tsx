import type { ReactNode, PointerEvent } from "react";
import { motion, useSpring } from "framer-motion";
import { useDesignMotion } from "./DesignMotion";

/** Measure a stationary frame so the moving card never feeds back into its tilt. */
export default function AnimatedCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { still } = useDesignMotion();
  const spring = { stiffness: 130, damping: 24, mass: 0.8 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const lift = useSpring(0, spring);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (still || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    rotateX.set(-((event.clientY - box.top) / box.height - 0.5) * 7);
    rotateY.set(((event.clientX - box.left) / box.width - 0.5) * 7);
    lift.set(-7);
  };
  const reset = () => { rotateX.set(0); rotateY.set(0); lift.set(0); };
  return <div className="card-motion-frame" onPointerMove={move} onPointerLeave={reset}>
    <motion.div className={className} style={{ rotateX: still ? 0 : rotateX, rotateY: still ? 0 : rotateY, y: still ? 0 : lift, transformPerspective: 1000 }}>
      {children}
    </motion.div>
  </div>;
}
