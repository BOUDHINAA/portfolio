import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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

const projectCategories = {
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
        image: "/opportunify.png",
        tech: ["React", "Node.js", "Express.js", "MongoDB", "OCR"],
        github: "https://github.com/BOUDHINAA/Opportunify_FrontEnd.git",
        demo: "#",
        icon: Briefcase,
      },
      {
        title: "University Dorm Management System",
        description:
          "A full stack university dorm management platform built to manage student housing, room allocation, and administrative workflows.",
        image: "/dorm-management.png",
        tech: ["Angular", "Spring Boot", "SQL"],
        github: "https://github.com/BOUDHINAA",
        demo: "#",
        icon: Building2,
      },
      {
        title: "Carbon Footprint By Trip",
        description:
          "A trip-based carbon footprint calculator that estimates environmental impact and trip cost using transport type, distance, passengers, and travel details.",
        image: "/carbon-footprint.png",
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
        title: "SimulAItor",
        description:
          "A gamified platform for CEOs, CTOs, and consultants that uses surveys, challenges, tactic cards, and quizzes to explore how AI can solve real business situations.",
        image: "/simulaitor.png",
        tech: ["Next.js", "TypeScript", "Gamification", "AI Workflows"],
        github: "https://github.com/BOUDHINAA",
        demo: "#",
        icon: Brain,
      },
      {
        title: "CX Maturity Gamified Platform",
        description:
          "A redesigned EY-style gamified website that helps companies assess their CX maturity through surveys, interactive challenges, and guided progression.",
        image: "/cx-platform.png",
        tech: ["UX Design", "Gamification", "Product Thinking", "Web Platform"],
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
        image: "/nexits.png",
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
  const [activeCategory, setActiveCategory] =
    useState<CategoryKey>("fullstack");

  const defaultTiltOptions = {
    reverse: false,
    max: 25,
    perspective: 1000,
    scale: 1.05,
    speed: 1000,
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

  const categoryColors = {
    primary: {
      bg: "bg-primary/20",
      text: "text-primary",
      border: "border-primary/50",
      hover: "hover:bg-primary/30",
      glow: "hover:shadow-[0_0_30px_hsl(180_100%_50%/0.3)]",
    },
    secondary: {
      bg: "bg-secondary/20",
      text: "text-secondary",
      border: "border-secondary/50",
      hover: "hover:bg-secondary/30",
      glow: "hover:shadow-[0_0_30px_hsl(300_100%_60%/0.3)]",
    },
    accent: {
      bg: "bg-accent/20",
      text: "text-accent",
      border: "border-accent/50",
      hover: "hover:bg-accent/30",
      glow: "hover:shadow-[0_0_30px_hsl(45_100%_60%/0.3)]",
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
                      : "bg-card/30 text-muted-foreground hover:text-foreground border-white/5 hover:border-white/20"
                  }
                  ${colors.glow}
                `}
              >
                <Icon size={20} />
                <span>{category.title}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? "bg-background/30" : "bg-white/10"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectCategories[activeCategory].projects.map((project, index) => {
            const categoryColor = projectCategories[activeCategory]
              .color as keyof typeof categoryColors;
            const colors = categoryColors[categoryColor];
            const Icon = project.icon;

            return (
              <Tilt key={project.title} options={defaultTiltOptions}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`
                    group relative h-full glass-card rounded-2xl overflow-hidden border border-white/10
                    ${colors.glow} transition-all duration-300 bg-black/40 backdrop-blur-xl
                  `}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                    <div
                      className={`absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-lg ${colors.text}`}
                    >
                      <Icon size={24} />
                    </div>
                  </div>

                  <div className="p-6 relative z-10">
                    <h3
                      className={`text-xl font-display font-bold ${colors.text} mb-2`}
                    >
                      {project.title}
                    </h3>
                    <p className="text-gray-300 font-body text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-body bg-white/5 border border-white/10 rounded-full text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Github size={20} />
                      </motion.a>
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className={`flex items-center gap-2 px-4 py-2 ${colors.bg} ${colors.text} border ${colors.border} rounded-lg font-body font-semibold text-sm ${colors.hover} transition-colors`}
                      >
                        <ExternalLink size={16} />
                        View Project
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </Tilt>
            );
          })}
        </div>
      </div>
    </section>
  );
}
