import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  GraduationCap,
  Code2,
  Gamepad,
  Brain,
  Rocket,
} from "lucide-react";

const domains = [
  {
    icon: Code2,
    title: "Full Stack Development",
    description:
      "Building scalable web applications with React, Next.js, TypeScript, Node.js, and PostgreSQL.",
    borderClass: "border-primary/30",
    hoverBorderClass: "hover:border-primary/60",
    iconClass: "text-primary",
    titleClass: "text-primary",
  },
  {
    icon: Brain,
    title: "AI & Smart Solutions",
    description:
      "Exploring AI-powered experiences, gamified platforms, and intelligent digital products.",
    borderClass: "border-secondary/30",
    hoverBorderClass: "hover:border-secondary/60",
    iconClass: "text-secondary",
    titleClass: "text-secondary",
  },
  {
    icon: Rocket,
    title: "DevOps & Tools",
    description:
      "Using Docker, Jenkins, Grafana, Prometheus, and modern workflows to improve development and deployment.",
    borderClass: "border-accent/30",
    hoverBorderClass: "hover:border-accent/60",
    iconClass: "text-accent",
    titleClass: "text-accent",
  },
  {
    icon: Gamepad,
    title: "Problem Solving",
    description:
      "Passionate about designing efficient solutions, clean architecture, and impactful user experiences.",
    borderClass: "border-primary/30",
    hoverBorderClass: "hover:border-primary/60",
    iconClass: "text-primary",
    titleClass: "text-primary",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 cyber-grid opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-foreground">About </span>
            <span className="gradient-text text-glow">Me</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            A passionate full stack developer focused on building modern,
            scalable, and user-centered digital experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-8 rounded-2xl neon-border">
              <p className="text-lg text-foreground/90 font-body leading-relaxed mb-6">
                I am a full stack developer passionate about building modern
                digital experiences. From creating responsive interfaces and
                robust backend systems to exploring AI-driven products and
                scalable architectures, I enjoy turning ideas into useful and
                impactful solutions.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="text-primary" size={20} />
                  <span className="font-body">Tunisia</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="text-secondary" size={20} />
                  <span className="font-body">
                    Software Engineer
                  </span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card p-6 rounded-2xl border border-secondary/30"
            >
              <h3 className="text-xl font-display font-bold text-secondary mb-3">
                Current Focus
              </h3>
              <p className="text-muted-foreground font-body">
                Building full stack products, refining my software engineering
                skills, and exploring AI, DevOps, and gamified user experiences.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {domains.map((domain, index) => {
              const Icon = domain.icon;

              return (
                <motion.div
                  key={domain.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`glass-card p-6 rounded-2xl border ${domain.borderClass} ${domain.hoverBorderClass} transition-all group cursor-pointer`}
                >
                  <Icon
                    className={`w-10 h-10 ${domain.iconClass} mb-4 group-hover:scale-110 transition-transform`}
                  />
                  <h3
                    className={`text-lg font-display font-bold ${domain.titleClass} mb-2`}
                  >
                    {domain.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body">
                    {domain.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
