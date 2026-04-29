import {
  motion,
  useInView,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ExternalLink,
  Github,
  Brain,
  Globe,
  Rocket,
  Briefcase,
  Building2,
  Leaf,
  Gamepad2,
} from "lucide-react";
import { Tilt } from "react-tilt";

type Project = {
  title: string;
  description: string;
  images: string[];
  tech: string[];
  github?: string;
  demo?: string;
  icon: LucideIcon;
};

type ProjectCategory = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: "primary" | "secondary" | "accent";
  projects: Project[];
};

const projectCategories: Record<string, ProjectCategory> = {
  fullstack: {
    title: "Full Stack",
    subtitle: "Web Applications & Platforms",
    icon: Globe,
    color: "primary",
    projects: [
      {
        title: "Opportunify",
        description:
          "A MERN-based job hunt platform designed to streamline job searching with advanced features including a chatbot and OCR-based resume reading.",
        images: [
          `${import.meta.env.BASE_URL}Opportunify-1.png`,
          `${import.meta.env.BASE_URL}Opportunify-2.png`,
        ],
        tech: ["React", "Node.js", "Express.js", "MongoDB", "OCR"],
        github: "https://github.com/BOUDHINAA/Opportunify_FrontEnd.git",
        demo: "#",
        icon: Briefcase,
      },
      {
        title: "University Dorm Management System",
        description:
          "A full stack university dorm management platform built to manage student housing, room allocation, and administrative workflows.",
        images: [`${import.meta.env.BASE_URL}placeholder.svg`],
        tech: ["Angular", "Spring Boot", "SQL"],
        github: "https://github.com/BOUDHINAA",
        demo: "#",
        icon: Building2,
      },
      {
        title: "Carbon Footprint By Trip",
        description:
          "A trip-based carbon footprint calculator that estimates environmental impact and trip cost using transport type, distance, passengers, and travel details.",
        images: [`${import.meta.env.BASE_URL}placeholder.svg`],
        tech: ["Laravel", "PHP", "Blade", "MySQL", "PDF Export"],
        github: "https://github.com/BOUDHINAA",
        demo: "#",
        icon: Leaf,
      },
    ],
  },

  ai: {
    title: "AI & Gamified Platforms",
    subtitle: "AI-Powered and Interactive Products",
    icon: Brain,
    color: "secondary",
    projects: [
      {
        title: "CX Maturity Gamified Platform",
        description:
          "A gamified platform designed to help companies assess their CX maturity through surveys, interactive challenges, guided progression, and AI-oriented business scenarios.",
        images: [`${import.meta.env.BASE_URL}EY-Simulaitor.png`],
        tech: [
          "Next.js",
          "TypeScript",
          "Gamification",
          "UX Design",
          "AI Workflows",
        ],
        github: "https://github.com/BOUDHINAA",
        demo: "#",
        icon: Rocket,
      },
    ],
  },

  websites: {
    title: "Web Experience",
    subtitle: "Professional and Modern Web Development",
    icon: Gamepad2,
    color: "accent",
    projects: [
      {
        title: "Nexits Platform Contributions",
        description:
          "Contributed to scalable full stack features, reusable UI components, validation flows, and database tooling in a production environment at Nexits.",
        images: [`${import.meta.env.BASE_URL}placeholder.svg`],
        tech: [
          "Next.js",
          "TypeScript",
          "tRPC",
          "PostgreSQL",
          "Zod",
          "shadcn/ui",
        ],
        github: "https://github.com/BOUDHINAA",
        demo: "#",
        icon: Globe,
      },
    ],
  },
};

type CategoryKey = keyof typeof projectCategories;

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] =
    useState<CategoryKey>("fullstack");
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});
  const [pausedProject, setPausedProject] = useState<string | null>(null);

  const defaultTiltOptions = {
    reverse: false,
    max: 14,
    perspective: 1000,
    scale: 1.02,
    speed: 700,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#ai") {
        setActiveCategory("ai");
      } else if (window.location.hash === "#fullstack") {
        setActiveCategory("fullstack");
      } else if (window.location.hash === "#websites") {
        setActiveCategory("websites");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const visibleProjects = projectCategories[activeCategory].projects;
    const interval = window.setInterval(() => {
      setImageIndexes((prev) => {
        const next = { ...prev };

        visibleProjects.forEach((project) => {
          if (project.images.length <= 1) return;
          if (pausedProject === project.title) return;

          next[project.title] =
            ((prev[project.title] ?? 0) + 1) % project.images.length;
        });

        return next;
      });
    }, 6000);

    return () => window.clearInterval(interval);
  }, [activeCategory, pausedProject, prefersReducedMotion]);

  const categoryColors = {
    primary: {
      bg: "bg-primary/20",
      text: "text-primary",
      border: "border-primary/50",
      hover: "hover:bg-primary/30",
      glow: "hover:shadow-[0_0_30px_hsl(180_100%_50%/0.16)]",
    },
    secondary: {
      bg: "bg-secondary/20",
      text: "text-secondary",
      border: "border-secondary/50",
      hover: "hover:bg-secondary/30",
      glow: "hover:shadow-[0_0_30px_hsl(300_100%_60%/0.16)]",
    },
    accent: {
      bg: "bg-accent/20",
      text: "text-accent",
      border: "border-accent/50",
      hover: "hover:bg-accent/30",
      glow: "hover:shadow-[0_0_30px_hsl(45_100%_60%/0.16)]",
    },
  };

  return (
    <section id="projects" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 cyber-grid opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-foreground">Featured </span>
            <span className="gradient-text-secondary text-glow-secondary">
              Projects
            </span>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            Full stack applications, AI-powered platforms, and impactful digital
            products
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {(Object.keys(projectCategories) as CategoryKey[]).map((key) => {
            const category = projectCategories[key];
            const colors =
              categoryColors[category.color as keyof typeof categoryColors];
            const isActive = activeCategory === key;
            const Icon = category.icon;

            return (
              <motion.button
                key={key}
                id={key === "ai" ? "ai-tab" : undefined}
                onClick={() => setActiveCategory(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex items-center gap-3 px-6 py-3 rounded-xl font-display font-semibold
                  transition-all duration-300 border backdrop-blur-md
                  ${
                    isActive
                      ? `${colors.bg} ${colors.text} ${colors.border} shadow-lg ring-1 ring-white/20`
                      : "bg-card/40 text-muted-foreground hover:text-foreground border-border"
                  }
                  ${colors.glow}
                `}
              >
                <Icon size={20} />
                <span>{category.title}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? "bg-background/30" : "bg-muted/60"
                  }`}
                >
                  {category.projects.length}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h3
            className={`text-2xl font-display font-bold ${
              categoryColors[
                projectCategories[activeCategory]
                  .color as keyof typeof categoryColors
              ].text
            }`}
          >
            {projectCategories[activeCategory].title}
          </h3>
          <p className="text-muted-foreground font-body">
            {projectCategories[activeCategory].subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-10">
          {projectCategories[activeCategory].projects.map((project, index) => {
            const categoryColor = projectCategories[activeCategory]
              .color as keyof typeof categoryColors;
            const colors = categoryColors[categoryColor];
            const Icon = project.icon;

            const currentImageIndex = imageIndexes[project.title] ?? 0;
            const currentImage = project.images[currentImageIndex];
            const hasMultipleImages = project.images.length > 1;
            const hasGithub = !!project.github && project.github !== "#";
            const hasDemo = !!project.demo && project.demo !== "#";

            return (
              <Tilt key={project.title} options={defaultTiltOptions}>
                <motion.article
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setPausedProject(project.title)}
                  onMouseLeave={() => setPausedProject(null)}
                  onFocus={() => setPausedProject(project.title)}
                  onBlur={() => setPausedProject(null)}
                  className={`
                    group relative h-full glass-card rounded-3xl overflow-hidden border border-border
                    ${colors.glow} transition-all duration-300 bg-card/85 backdrop-blur-xl
                    shadow-[0_8px_30px_hsl(220_20%_10%/0.08)]
                  `}
                >
                  <div className="relative h-64 md:h-72 p-4">
                    <div className="relative h-full w-full rounded-2xl border border-border bg-gradient-to-br from-muted via-card to-muted/70 shadow-sm overflow-hidden">
                      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.08),transparent_35%),radial-gradient(circle_at_bottom_right,hsl(var(--secondary)/0.08),transparent_35%)]" />

                      <AnimatePresence mode="wait">
                        <motion.img
                          key={`${project.title}-${currentImageIndex}`}
                          src={currentImage}
                          alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                          loading="lazy"
                          decoding="async"
                          initial={
                            prefersReducedMotion ? false : { opacity: 0 }
                          }
                          animate={{ opacity: 1 }}
                          exit={
                            prefersReducedMotion ? undefined : { opacity: 0 }
                          }
                          transition={{ duration: 0.45 }}
                          className="relative z-10 w-full h-full object-contain p-3"
                        />
                      </AnimatePresence>

                      <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />

                      <div
                        className={`absolute top-4 right-4 z-20 p-2 bg-card/90 backdrop-blur-md border border-border rounded-lg ${colors.text}`}
                      >
                        <Icon size={22} />
                      </div>

                      {hasMultipleImages && (
                        <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 flex gap-2">
                          {project.images.map((_, dotIndex) => (
                            <span
                              key={dotIndex}
                              className={`w-2.5 h-2.5 rounded-full transition-all ${
                                dotIndex === currentImageIndex
                                  ? "bg-primary scale-110"
                                  : "bg-foreground/20"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 relative z-10">
                    <h3
                      className={`text-xl md:text-2xl font-display font-bold ${colors.text} mb-3`}
                    >
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground font-body text-base mb-5 leading-relaxed line-clamp-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1.5 text-xs font-body bg-muted/60 border border-border rounded-full text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      {hasGithub && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          className="p-3 bg-muted/50 border border-border rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          aria-label={`Open ${project.title} GitHub repository`}
                        >
                          <Github size={20} />
                        </motion.a>
                      )}

                      {hasDemo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-center gap-2 px-4 py-3 ${colors.bg} ${colors.text} border ${colors.border} rounded-xl font-body font-semibold text-sm ${colors.hover} transition-colors`}
                        >
                          <ExternalLink size={16} />
                          View Project
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.article>
              </Tilt>
            );
          })}
        </div>
      </div>
    </section>
  );
}
