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
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Tilt } from "react-tilt";

type Project = {
  title: string;
  shortDescription: string;
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
  websites: {
    title: "Web Experience",
    subtitle: "Professional and Modern Web Development",
    icon: Gamepad2,
    color: "accent",
    projects: [
      {
        title: "Nexits Platform Contributions",
        shortDescription:
          "Contributed to scalable full stack features, reusable UI components, and validation flows in a production startup environment.",
        description:
          "At Nexits, I contributed to a production-grade platform by building and refining full stack features in a collaborative startup environment. My work included developing reusable UI components with Next.js and TypeScript, improving validation flows, and supporting cleaner product architecture across the front end and back end. I also worked with tools such as tRPC, PostgreSQL, Zod, and shadcn/ui to help create scalable, maintainable, and consistent user experiences.",
        images: [
          `${import.meta.env.BASE_URL}Nexits1.jpeg`,
          `${import.meta.env.BASE_URL}Nexits2.jpeg`,
          `${import.meta.env.BASE_URL}Nexits3.jpeg`,
          `${import.meta.env.BASE_URL}Nexits4.jpeg`,
          `${import.meta.env.BASE_URL}Nexits5.jpeg`,
          `${import.meta.env.BASE_URL}Nexits6.jpeg`,
          `${import.meta.env.BASE_URL}Nexits7.jpeg`,
          `${import.meta.env.BASE_URL}Nexits8.jpeg`,
          `${import.meta.env.BASE_URL}Nexits9.jpeg`,
          `${import.meta.env.BASE_URL}Nexits10.jpeg`,
          `${import.meta.env.BASE_URL}Nexits11.jpeg`,
          `${import.meta.env.BASE_URL}Nexits12.jpeg`,
          `${import.meta.env.BASE_URL}Nexits13.jpeg`,
          `${import.meta.env.BASE_URL}Nexits14.jpeg`,
        ],
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
      {
        title: "Opportunify",
        shortDescription:
          "A MERN-based job hunt platform with chatbot support and OCR-powered resume reading features.",
        description:
          "Opportunify is a MERN-based job hunt platform created to make the application process more efficient and interactive for job seekers. The project combines a modern user interface with practical job-search features, including a chatbot experience and OCR-based resume reading to simplify how users upload, understand, and manage their profiles. It was designed as a full stack application with a strong focus on usability, structured data flow, and features that solve real user pain points.",
        images: [
          `${import.meta.env.BASE_URL}Opportunify-1.png`,
          `${import.meta.env.BASE_URL}Opportunify-2.png`,`${import.meta.env.BASE_URL}Opportunify-3.png`,
          `${import.meta.env.BASE_URL}Opportunify-4.png`,
          `${import.meta.env.BASE_URL}Opportunify-5.png`,
        ],
        tech: ["React", "Node.js", "Express.js", "MongoDB", "OCR"],
        github: "https://github.com/BOUDHINAA/Opportunify_FrontEnd.git",
        demo: "#",
        icon: Briefcase,
      },
      {
        title: "University Dorm Management System",
        shortDescription:
          "A full stack platform to manage student housing, room allocation, and administrative workflows.",
        description:
          "This project is a full stack university dorm management platform built to simplify housing operations for students and administrators. It supports key workflows such as room allocation, resident management, and administrative coordination through a structured and practical interface. Built with Angular, Spring Boot, and SQL, the project focused on combining a responsive front end with a solid backend architecture to manage business logic and persistent data efficiently.",
        images: [`${import.meta.env.BASE_URL}Dorm.png`],
        tech: ["Angular", "Spring Boot", "SQL"],
        github: "https://github.com/BOUDHINAA",
        demo: "#",
        icon: Building2,
      },
      {
        title: "Carbon Footprint By Trip",
        shortDescription:
          "A trip-based calculator that estimates both carbon footprint and travel cost with a recap export.",
        description:
          "Carbon Footprint By Trip is a trip-based calculator that estimates both environmental impact and travel cost using transport type, distance, passenger count, and travel details. The goal of the project was to provide a practical and informative experience where users can simulate trips, understand their carbon footprint, and review a clear summary of the result. It also integrates PDF export to make the trip recap easy to save and share.",
        images: [`${import.meta.env.BASE_URL}Carbon.png`],
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
        shortDescription:
          "A gamified platform that helps companies assess CX maturity through interactive challenges and guided progression.",
        description:
          "This project is a gamified platform designed to help companies assess their CX maturity through surveys, interactive challenges, guided progression, and AI-oriented business scenarios. Instead of presenting the assessment as a traditional static form, the experience is structured to feel more engaging and strategic, encouraging users to progress through tasks while reflecting on customer experience capabilities. The platform combines product thinking, UX design, and modern web development to create an experience that is both informative and immersive.",
        images: [
          `${import.meta.env.BASE_URL}EY-Simulaitor.png`,
          `${import.meta.env.BASE_URL}Simulaitor1.png`,
          `${import.meta.env.BASE_URL}Simulaitor2.png`,
          `${import.meta.env.BASE_URL}Simulaitor3.png`,
          `${import.meta.env.BASE_URL}Simulaitor4.png`,
          `${import.meta.env.BASE_URL}Simulaitor5.png`,
        ],
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
};

type CategoryKey = keyof typeof projectCategories;

function ProjectPreviewFallback({
  title,
  tech,
  Icon,
  accentClass,
}: {
  title: string;
  tech: string[];
  Icon: LucideIcon;
  accentClass: string;
}) {
  return (
    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-6 text-center light-panel">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.08),transparent_35%),radial-gradient(circle_at_bottom_right,hsl(var(--secondary)/0.08),transparent_35%)]" />

      <div
        className={`relative mb-4 rounded-2xl border border-border bg-card/80 p-4 ${accentClass}`}
      >
        <Icon size={34} />
      </div>

      <h4 className="relative text-lg md:text-xl font-display font-bold text-foreground mb-2">
        {title}
      </h4>

      <p className="relative text-sm text-muted-foreground font-body mb-4">
        Preview coming soon
      </p>

      <div className="relative flex flex-wrap justify-center gap-2 max-w-xs">
        {tech.slice(0, 4).map((item) => (
          <span
            key={item}
            className="px-2.5 py-1 text-xs font-body bg-muted/60 border border-border rounded-full text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] = useState<CategoryKey>("websites");
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
      } else {
        setActiveCategory("websites");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
        return;
      }

      if (!selectedProject || selectedProject.images.length <= 1) return;

      if (event.key === "ArrowRight") {
        goToNextImage(selectedProject.title, selectedProject.images.length);
      }

      if (event.key === "ArrowLeft") {
        goToPrevImage(selectedProject.title, selectedProject.images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, imageIndexes]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

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

  const setProjectImage = (projectTitle: string, index: number) => {
    setImageIndexes((prev) => ({
      ...prev,
      [projectTitle]: index,
    }));
  };

  const goToNextImage = (projectTitle: string, total: number) => {
    setImageIndexes((prev) => ({
      ...prev,
      [projectTitle]: ((prev[projectTitle] ?? 0) + 1) % total,
    }));
  };

  const goToPrevImage = (projectTitle: string, total: number) => {
    setImageIndexes((prev) => ({
      ...prev,
      [projectTitle]: ((prev[projectTitle] ?? 0) - 1 + total) % total,
    }));
  };

  const activeCategoryColors =
    categoryColors[
      projectCategories[activeCategory].color as keyof typeof categoryColors
    ];

  const selectedImageIndex = selectedProject
    ? (imageIndexes[selectedProject.title] ?? 0)
    : 0;

  const selectedImage = selectedProject
    ? selectedProject.images[selectedImageIndex]
    : "";

  const selectedHasGithub =
    !!selectedProject?.github && selectedProject.github !== "#";

  const selectedHasDemo =
    !!selectedProject?.demo && selectedProject.demo !== "#";

  return (
    <section
      id="projects"
      className="py-32 relative overflow-hidden light-stars"
      ref={ref}
    >
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
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-display font-semibold transition-all duration-300 border backdrop-blur-md ${
                  isActive
                    ? `${colors.bg} ${colors.text} ${colors.border} shadow-lg ring-1 ring-white/20`
                    : "bg-card/55 text-muted-foreground hover:text-foreground border-border shadow-sm hover:shadow-md"
                } ${colors.glow}`}
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
            className={`text-2xl font-display font-bold ${activeCategoryColors.text}`}
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

            const hasImages = project.images.length > 0;
            const hasMultipleImages = project.images.length > 1;
            const currentImageIndex = imageIndexes[project.title] ?? 0;
            const currentImage = hasImages
              ? project.images[currentImageIndex]
              : "";
            const hasGithub = !!project.github && project.github !== "#";
            const hasDemo = !!project.demo && project.demo !== "#";

            return (
              <Tilt key={project.title} options={defaultTiltOptions}>
                <motion.article
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  tabIndex={0}
                  className={`group relative h-full glass-card rounded-3xl overflow-hidden border border-border ${colors.glow} bg-card/85 backdrop-blur-xl cursor-pointer shadow-[0_14px_38px_hsl(220_25%_16%/0.08)] dark:shadow-[0_8px_30px_hsl(220_20%_10%/0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_hsl(220_25%_16%/0.12)]`}
                >
                  <div className="relative h-64 md:h-72 p-4">
                    <div className="relative h-full w-full rounded-2xl border border-border bg-gradient-to-br from-muted via-card to-muted/70 shadow-sm overflow-hidden light-panel">
                      {hasImages ? (
                        <>
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
                                prefersReducedMotion
                                  ? undefined
                                  : { opacity: 0 }
                              }
                              transition={{ duration: 0.35 }}
                              className="relative z-10 w-full h-full object-contain p-3 transition-all duration-300 group-hover:scale-[1.02] group-hover:brightness-[0.92] dark:group-hover:brightness-[0.82]"
                            />
                          </AnimatePresence>

                          <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />

                          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="absolute inset-0 bg-background/35 dark:bg-background/20 backdrop-blur-[3px] transition-all duration-300" />
                            <div className="relative px-4 py-2 rounded-full bg-card/85 dark:bg-card/70 backdrop-blur-md border border-border text-sm md:text-base font-body font-semibold text-foreground shadow-[0_8px_24px_hsl(var(--foreground)/0.08)] dark:shadow-[0_8px_24px_hsl(0_0%_0%/0.28)]">
                              Click for details
                            </div>
                          </div>

                          {hasMultipleImages && (
                            <>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goToPrevImage(
                                    project.title,
                                    project.images.length,
                                  );
                                }}
                                className="absolute left-3 top-1/2 z-30 -translate-y-1/2 w-9 h-9 rounded-full bg-background/75 dark:bg-background/45 backdrop-blur-md border border-border flex items-center justify-center text-foreground opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-sm"
                                aria-label={`Previous image for ${project.title}`}
                              >
                                <ChevronLeft size={18} />
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goToNextImage(
                                    project.title,
                                    project.images.length,
                                  );
                                }}
                                className="absolute right-3 top-1/2 z-30 -translate-y-1/2 w-9 h-9 rounded-full bg-background/75 dark:bg-background/45 backdrop-blur-md border border-border flex items-center justify-center text-foreground opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-sm"
                                aria-label={`Next image for ${project.title}`}
                              >
                                <ChevronRight size={18} />
                              </button>
                            </>
                          )}
                        </>
                      ) : (
                        <ProjectPreviewFallback
                          title={project.title}
                          tech={project.tech}
                          Icon={Icon}
                          accentClass={colors.text}
                        />
                      )}

                      <div
                        className={`absolute top-4 right-4 z-20 p-2 bg-card/90 backdrop-blur-md border border-border rounded-lg ${colors.text}`}
                      >
                        <Icon size={22} />
                      </div>

                      {hasMultipleImages && (
                        <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 flex gap-2 rounded-full bg-background/70 dark:bg-background/35 backdrop-blur-md px-3 py-1.5 border border-border">
                          {project.images.map((_, dotIndex) => (
                            <button
                              key={dotIndex}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setProjectImage(project.title, dotIndex);
                              }}
                              className={`rounded-full transition-all duration-300 ${
                                dotIndex === currentImageIndex
                                  ? "w-6 h-2.5 bg-primary dark:bg-secondary shadow-[0_0_12px_hsl(var(--primary)/0.45)] dark:shadow-[0_0_12px_hsl(var(--secondary)/0.45)]"
                                  : "w-2.5 h-2.5 bg-slate-500/35 dark:bg-white/25"
                              }`}
                              aria-label={`Show image ${dotIndex + 1} for ${project.title}`}
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

                    <p className="text-muted-foreground font-body text-base mb-5 leading-relaxed line-clamp-3">
                      {project.shortDescription}
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
                          onClick={(e) => e.stopPropagation()}
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
                          onClick={(e) => e.stopPropagation()}
                          className={`flex items-center gap-2 px-4 py-3 ${colors.bg} ${colors.text} border ${colors.border} rounded-xl font-body font-semibold text-sm ${colors.hover} transition-colors shadow-sm`}
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

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-background/70 dark:bg-black/70 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full max-w-6xl max-h-[90vh] overflow-hidden glass-card rounded-3xl border border-border bg-card/95 shadow-[0_24px_80px_hsl(220_20%_10%/0.22)]"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl border border-border bg-muted/50 ${activeCategoryColors.text}`}
                  >
                    <selectedProject.icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">
                      {selectedProject.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body">
                      Detailed project view
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl border border-border bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Close project details"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid lg:grid-cols-[1.2fr_0.8fr] max-h-[calc(90vh-73px)]">
                <div className="p-6 border-b lg:border-b-0 lg:border-r border-border">
                  <div className="relative h-[320px] md:h-[420px] w-full rounded-2xl border border-border bg-gradient-to-br from-muted via-card to-muted/70 overflow-hidden shadow-sm light-panel">
                    {selectedProject.images.length > 0 ? (
                      <>
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={`${selectedProject.title}-${selectedImageIndex}`}
                            src={selectedImage}
                            alt={`${selectedProject.title} screenshot ${selectedImageIndex + 1}`}
                            loading="lazy"
                            decoding="async"
                            initial={
                              prefersReducedMotion ? false : { opacity: 0 }
                            }
                            animate={{ opacity: 1 }}
                            exit={
                              prefersReducedMotion ? undefined : { opacity: 0 }
                            }
                            transition={{ duration: 0.35 }}
                            className="relative z-10 w-full h-full object-contain p-4"
                          />
                        </AnimatePresence>

                        <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />

                        {selectedProject.images.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                goToPrevImage(
                                  selectedProject.title,
                                  selectedProject.images.length,
                                )
                              }
                              className="absolute left-4 top-1/2 z-30 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 dark:bg-background/45 backdrop-blur-md border border-border flex items-center justify-center text-foreground shadow-md"
                              aria-label="Previous project image"
                            >
                              <ChevronLeft size={20} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                goToNextImage(
                                  selectedProject.title,
                                  selectedProject.images.length,
                                )
                              }
                              className="absolute right-4 top-1/2 z-30 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 dark:bg-background/45 backdrop-blur-md border border-border flex items-center justify-center text-foreground shadow-md"
                              aria-label="Next project image"
                            >
                              <ChevronRight size={20} />
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <ProjectPreviewFallback
                        title={selectedProject.title}
                        tech={selectedProject.tech}
                        Icon={selectedProject.icon}
                        accentClass={activeCategoryColors.text}
                      />
                    )}
                  </div>

                  {selectedProject.images.length > 1 && (
                    <div className="mt-4 flex justify-center">
                      <div className="flex gap-2 rounded-full bg-background/75 dark:bg-background/35 backdrop-blur-md px-3 py-2 border border-border">
                        {selectedProject.images.map((_, dotIndex) => (
                          <button
                            key={dotIndex}
                            type="button"
                            onClick={() =>
                              setProjectImage(selectedProject.title, dotIndex)
                            }
                            className={`rounded-full transition-all duration-300 ${
                              dotIndex === selectedImageIndex
                                ? "w-7 h-2.5 bg-primary dark:bg-secondary shadow-[0_0_14px_hsl(var(--primary)/0.45)] dark:shadow-[0_0_14px_hsl(var(--secondary)/0.45)]"
                                : "w-2.5 h-2.5 bg-slate-500/35 dark:bg-white/25 hover:bg-slate-500/55 dark:hover:bg-white/40"
                            }`}
                            aria-label={`Show image ${dotIndex + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 overflow-y-auto">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-muted-foreground font-display mb-2">
                        Overview
                      </h4>
                      <p className="text-base md:text-lg leading-relaxed text-foreground font-body">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-muted-foreground font-display mb-3">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 text-sm font-body bg-muted/60 border border-border rounded-full text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-muted-foreground font-display mb-3">
                        Links
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedHasGithub && (
                          <a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-muted/50 text-foreground hover:bg-muted transition-colors"
                          >
                            <Github size={18} />
                            GitHub
                          </a>
                        )}

                        {selectedHasDemo && (
                          <a
                            href={selectedProject.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl border ${activeCategoryColors.border} ${activeCategoryColors.bg} ${activeCategoryColors.text} ${activeCategoryColors.hover} transition-colors`}
                          >
                            <ExternalLink size={18} />
                            View Project
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
