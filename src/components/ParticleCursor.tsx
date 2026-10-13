import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
  opacity: number;
  duration: number;
}

type CursorMode = "default" | "link" | "button" | "text" | "drag";

/* ─────────────────────────────────────────
   Context detection
───────────────────────────────────────── */
function getCursorMode(target: HTMLElement | null): CursorMode {
  if (!target) return "default";
  const el = target.closest(
    'a, button, [role="button"], summary, label[for], select',
  );
  if (el) return el.tagName === "A" ? "link" : "button";
  if (target.closest("input, textarea, [contenteditable]")) return "text";
  if (target.closest("[draggable]")) return "drag";
  return "default";
}

/* Ring size + label per mode */
const MODE_CONFIG: Record<
  CursorMode,
  { size: number; label: string | null; speed: number }
> = {
  default: { size: 20, label: null, speed: 2.4 },
  link: { size: 36, label: "view", speed: 1.4 },
  button: { size: 32, label: null, speed: 1.6 },
  text: { size: 4, label: null, speed: 1.0 },
  drag: { size: 28, label: "drag", speed: 2.0 },
};

const PARTICLE_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
];

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function ParticleCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(true);
  const [mode, setMode] = useState<CursorMode>("default");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClicking, setIsClicking] = useState(false);

  const particleId = useRef(0);
  const lastSpawn = useRef(0);
  const rafId = useRef<number>(0);

  /* Raw mouse position (no spring — used for dot) */
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  /* Ring follows with a gentle spring */
  const springCfg = { stiffness: 480, damping: 32, mass: 0.25 };
  const ringX = useSpring(rawX, springCfg);
  const ringY = useSpring(rawY, springCfg);

  /* ── Detect touch-only devices ── */
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsPointer(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* ── Spawn a particle ── */
  const spawnParticle = useCallback((x: number, y: number) => {
    const now = performance.now();
    if (now - lastSpawn.current < 28) return;
    lastSpawn.current = now;

    const color =
      PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3.5 + 1.5;

    const p: Particle = {
      id: particleId.current++,
      x,
      y,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      size: Math.random() * 2.2 + 1.4,
      color,
      opacity: Math.random() * 0.35 + 0.25,
      duration: Math.random() * 0.2 + 0.5,
    };

    setParticles((prev) => [...prev.slice(-14), p]);
  }, []);

  /* ── Mouse event listeners ── */
  useEffect(() => {
    if (!isPointer) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setIsVisible(true);
      setMode(getCursorMode(e.target as HTMLElement));
      spawnParticle(e.clientX, e.clientY);
    };

    const onLeave = () => {
      setIsVisible(false);
      setMode("default");
    };
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafId.current);
    };
  }, [isPointer, rawX, rawY, spawnParticle]);

  if (!isPointer) return null;

  const cfg = MODE_CONFIG[mode];
  const half = cfg.size / 2;
  const isTextMode = mode === "text";

  return (
    <>
      {/* ── Ring — springs behind the dot ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          width: cfg.size,
          height: cfg.size,
          marginLeft: -half,
          marginTop: -half,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.82 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.2 }}
      >
        {/* Outer ring — hides in text mode, expands in link/button */}
        {!isTextMode && (
          <motion.div
            className="absolute inset-0 rounded-full border border-foreground/55"
            animate={{
              scale: isClicking ? 0.88 : [1, 1.07, 1],
              opacity: [0.75, 0.42, 0.75],
            }}
            transition={{
              scale: isClicking
                ? { type: "spring", stiffness: 600, damping: 20 }
                : { duration: cfg.speed, repeat: Infinity, ease: "easeInOut" },
              opacity: {
                duration: cfg.speed,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        )}

        {/* Inner accent ring */}
        {!isTextMode && (
          <div
            className="absolute rounded-full border border-primary/35"
            style={{ inset: Math.round(cfg.size * 0.18) }}
          />
        )}

        {/* Orbit spark — only in default + button mode */}
        {(mode === "default" || mode === "button") && (
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{
              duration: cfg.speed,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-accent"
              style={{ width: 5, height: 5, marginTop: -2 }}
            />
          </motion.div>
        )}

        {/* Context label — "view" on links, "drag" on draggables */}
        <AnimatePresence>
          {cfg.label && (
            <motion.span
              key={cfg.label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="absolute text-[9px] font-display font-bold tracking-widest uppercase text-foreground/80 select-none"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              {cfg.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Center dot — snaps directly to mouse (no spring) ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block rounded-full bg-primary"
        style={{
          x: rawX,
          y: rawY,
          width: isTextMode ? 2 : 5,
          height: isTextMode ? 16 : 5,
          marginLeft: isTextMode ? -1 : -2.5,
          marginTop: isTextMode ? -8 : -2.5,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 40, mass: 0.1 }}
      />

      {/* ── Particle trail ── */}
      <div className="fixed inset-0 pointer-events-none z-[9997] hidden md:block">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              initial={{ opacity: p.opacity, scale: 1, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 0.2, x: p.dx * 8, y: p.dy * 8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: p.duration, ease: "easeOut" }}
              style={{
                left: p.x - p.size / 2,
                top: p.y - p.size / 2,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 ${p.size * 2.5}px ${p.color}`,
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
