import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Streak = {
  id: number;
  top: number;
  left: number;
  length: number;
  duration: number;
  rotate: number;
  travelX: number;
  travelY: number;
  reverse: boolean;
};

export default function ShootingStars() {
  const [streak, setStreak] = useState<Streak | null>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2.8 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3.5 + 2.5,
      })),
    [],
  );

  useEffect(() => {
    let id = 0;
    let timeoutId: number | undefined;

    const createStreak = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const duration = Math.random() * 1.4 + 3.2;
      const length = Math.random() * 120 + 140;

      const patterns = [
        // top-left -> bottom-right
        () => ({
          top: Math.random() * 30,
          left: -80,
          rotate: Math.random() * 10 + 18,
          travelX: viewportWidth + 220,
          travelY: viewportHeight * 0.65 + 120,
          reverse: false,
        }),

        // top-right -> bottom-left
        () => ({
          top: Math.random() * 30,
          left: viewportWidth + 80,
          rotate: -(Math.random() * 10 + 18),
          travelX: -(viewportWidth + 220),
          travelY: viewportHeight * 0.65 + 120,
          reverse: true,
        }),

        // left -> lower-right (flatter)
        () => ({
          top: Math.random() * 55,
          left: -80,
          rotate: Math.random() * 8 + 10,
          travelX: viewportWidth + 220,
          travelY: viewportHeight * 0.35 + 80,
          reverse: false,
        }),

        // right -> lower-left (flatter)
        () => ({
          top: Math.random() * 55,
          left: viewportWidth + 80,
          rotate: -(Math.random() * 8 + 10),
          travelX: -(viewportWidth + 220),
          travelY: viewportHeight * 0.35 + 80,
          reverse: true,
        }),
      ];

      const selectedPattern =
        patterns[Math.floor(Math.random() * patterns.length)]();

      const nextStreak: Streak = {
        id: id++,
        duration,
        length,
        ...selectedPattern,
      };

      setStreak(nextStreak);

      timeoutId = window.setTimeout(
        () => {
          setStreak(null);

          timeoutId = window.setTimeout(createStreak, 1200);
        },
        duration * 1000 + 150,
      );
    };

    const initialDelay = window.setTimeout(createStreak, 1200);

    return () => {
      window.clearTimeout(initialDelay);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Ambient particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            width: particle.size,
            height: particle.size,
            background: "hsl(var(--foreground) / 0.8)",
            boxShadow: `
              0 0 8px hsl(var(--primary) / 0.18),
              0 0 14px hsl(var(--secondary) / 0.12),
              0 0 18px hsl(var(--accent) / 0.08)
            `,
          }}
          animate={{
            opacity: [0.12, 0.8, 0.18],
            scale: [1, 1.4, 1],
            y: [0, -5, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* One random shooting star at a time */}
      {streak && (
        <motion.div
          key={streak.id}
          className="absolute"
          style={{
            top: `${streak.top}%`,
            left: `${streak.left}px`,
            width: streak.length,
            transform: `rotate(${streak.rotate}deg)`,
            transformOrigin: "left center",
          }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: streak.travelX,
            y: streak.travelY,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: streak.duration,
            ease: "easeOut",
          }}
        >
          <div
            className="relative h-[2px] rounded-full"
            style={{
              background: streak.reverse
                ? `
                  linear-gradient(
                    270deg,
                    transparent 0%,
                    hsl(var(--foreground) / 0.15) 18%,
                    hsl(var(--primary) / 0.7) 48%,
                    hsl(var(--secondary) / 0.7) 72%,
                    hsl(var(--accent) / 0.65) 88%,
                    transparent 100%
                  )
                `
                : `
                  linear-gradient(
                    90deg,
                    transparent 0%,
                    hsl(var(--foreground) / 0.15) 18%,
                    hsl(var(--primary) / 0.7) 48%,
                    hsl(var(--secondary) / 0.7) 72%,
                    hsl(var(--accent) / 0.65) 88%,
                    transparent 100%
                  )
                `,
              boxShadow: `
                0 0 10px hsl(var(--primary) / 0.25),
                0 0 18px hsl(var(--secondary) / 0.16),
                0 0 24px hsl(var(--accent) / 0.1)
              `,
            }}
          >
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${
                streak.reverse ? "left-0" : "right-0"
              }`}
              style={{
                background: "hsl(var(--foreground) / 0.95)",
                boxShadow: `
                  0 0 12px hsl(var(--primary) / 0.45),
                  0 0 18px hsl(var(--secondary) / 0.2),
                  0 0 24px hsl(var(--accent) / 0.14)
                `,
              }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
