import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
  opacity: number;
}

const PARTICLE_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
];

export default function ParticleCursor() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(true);
  const [isInteractive, setIsInteractive] = useState(false);

  const particleId = useRef(0);
  const lastSpawnTime = useRef(0);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(
    useTransform(mouseX, (v) => v - 10),
    {
      stiffness: 520,
      damping: 34,
      mass: 0.28,
    },
  );

  const ringY = useSpring(
    useTransform(mouseY, (v) => v - 10),
    {
      stiffness: 520,
      damping: 34,
      mass: 0.28,
    },
  );

  const dotX = useSpring(
    useTransform(mouseX, (v) => v - 2.5),
    {
      stiffness: 900,
      damping: 44,
      mass: 0.18,
    },
  );

  const dotY = useSpring(
    useTransform(mouseY, (v) => v - 2.5),
    {
      stiffness: 900,
      damping: 44,
      mass: 0.18,
    },
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");

    const updatePointerMode = () => {
      setIsPointerDevice(!mediaQuery.matches);
    };

    updatePointerMode();
    mediaQuery.addEventListener("change", updatePointerMode);

    return () => {
      mediaQuery.removeEventListener("change", updatePointerMode);
    };
  }, []);

  useEffect(() => {
    if (!isPointerDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(
        'a, button, [role="button"], input, textarea, select, summary, label',
      );
      setIsInteractive(interactive);

      const now = performance.now();
      if (now - lastSpawnTime.current < 30) return;
      lastSpawnTime.current = now;

      const color =
        PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];

      const newParticle: Particle = {
        id: particleId.current++,
        x: e.clientX + (Math.random() - 0.5) * 2,
        y: e.clientY + (Math.random() - 0.5) * 2,
        dx: (Math.random() - 0.5) * 7,
        dy: (Math.random() - 0.5) * 7,
        size: Math.random() * 1.4 + 1.1,
        color,
        opacity: Math.random() * 0.2 + 0.16,
      };

      setParticles((prev) => [...prev.slice(-10), newParticle]);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsInteractive(false);
    };

    const cleanupInterval = window.setInterval(() => {
      setParticles((prev) => prev.slice(-6));
    }, 100);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(cleanupInterval);
    };
  }, [isPointerDevice, mouseX, mouseY]);

  if (!isPointerDevice) return null;

  return (
    <>
      {/* Main cursor body */}
      <motion.div
        className="fixed pointer-events-none z-[9998] hidden md:block"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isInteractive ? 1.08 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 30,
          mass: 0.22,
        }}
      >
        <div className="relative w-5 h-5">
          {/* Breathing ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-foreground/70"
            animate={{
              scale: isInteractive ? [1, 1.12, 1] : [1, 1.06, 1],
              opacity: isInteractive ? [0.9, 0.55, 0.9] : [0.8, 0.5, 0.8],
            }}
            transition={{
              duration: isInteractive ? 1.1 : 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Static inner ring */}
          <div className="absolute inset-[3px] rounded-full border border-primary/40" />

          {/* Orbit spark */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{
              duration: isInteractive ? 1.4 : 2.4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent" />
          </motion.div>
        </div>
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{ x: dotX, y: dotY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isInteractive ? [1, 1.2, 1] : [1, 1.08, 1],
        }}
        transition={{
          duration: isInteractive ? 0.8 : 1.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-[5px] h-[5px] rounded-full bg-primary" />
      </motion.div>

      {/* Particle trail */}
      <div className="fixed inset-0 pointer-events-none z-[9997] hidden md:block">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                opacity: particle.opacity,
                scale: 1,
                x: 0,
                y: 0,
              }}
              animate={{
                opacity: 0,
                scale: 0,
                x: particle.dx,
                y: particle.dy,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.42,
                ease: "easeOut",
              }}
              className="absolute rounded-full"
              style={{
                left: particle.x - particle.size / 2,
                top: particle.y - particle.size / 2,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size * 1.8}px ${particle.color}`,
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
