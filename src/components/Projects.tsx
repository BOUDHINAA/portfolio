import {
  motion,
  useInView,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { LucideIcon } from "lucide-react";
import { useDesignMotion } from "./DesignMotion";
import AnimatedCard from "./AnimatedCard";

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

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
type Project = {
  key: string;
  images: string[];
  tech: string[];
  github?: string;
  demo?: string;
  icon: LucideIcon;
};

type ProjectCategory = {
  key: "websites" | "ai";
  icon: LucideIcon;
  color: "primary" | "secondary" | "accent";
  projects: Project[];
};

type CategoryKey = "websites" | "ai";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const projectCategories: Record<CategoryKey, ProjectCategory> = {
  websites: {
    key: "websites",
    icon: Gamepad2,
    color: "accent",
    projects: [
      {
        key: "nexits",
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
        key: "opportunify",
        images: [
          `${import.meta.env.BASE_URL}Opportunify-1.png`,
          `${import.meta.env.BASE_URL}Opportunify-2.png`,
          `${import.meta.env.BASE_URL}Opportunify-3.png`,
          `${import.meta.env.BASE_URL}Opportunify-4.png`,
          `${import.meta.env.BASE_URL}Opportunify-5.png`,
        ],
        tech: ["React", "Node.js", "Express.js", "MongoDB", "OCR"],
        github: "https://github.com/BOUDHINAA/Opportunify_FrontEnd.git",
        demo: "#",
        icon: Briefcase,
      },
      {
        key: "dorm",
        images: [`${import.meta.env.BASE_URL}Dorm.png`],
        tech: ["Angular", "Spring Boot", "SQL"],
        github: "https://github.com/BOUDHINAA",
        demo: "#",
        icon: Building2,
      },
      {
        key: "carbon",
        images: [`${import.meta.env.BASE_URL}Carbon.png`],
        tech: ["Laravel", "PHP", "Blade", "MySQL", "PDF Export"],
        github: "https://github.com/BOUDHINAA",
        demo: "#",
        icon: Leaf,
      },
    ],
  },
  ai: {
    key: "ai",
    icon: Brain,
    color: "secondary",
    projects: [
      {
        key: "cxMaturity",
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

/* ─────────────────────────────────────────
   Color config — mode-aware
───────────────────────────────────────── */
const CATEGORY_COLORS = {
  primary: {
    bg: "bg-primary/10 dark:bg-primary/20",
    activeBg: "bg-primary/15 dark:bg-primary/25",
    text: "text-primary",
    border: "border-primary/35 dark:border-primary/55",
    activeBorder: "border-primary/50 dark:border-primary/70",
    hover: "hover:bg-primary/15 dark:hover:bg-primary/30",
    glow: "dark:hover:shadow-[0_0_26px_hsl(var(--primary)/0.22)]",
  },
  secondary: {
    bg: "bg-secondary/10 dark:bg-secondary/20",
    activeBg: "bg-secondary/15 dark:bg-secondary/25",
    text: "text-secondary",
    border: "border-secondary/35 dark:border-secondary/55",
    activeBorder: "border-secondary/50 dark:border-secondary/70",
    hover: "hover:bg-secondary/15 dark:hover:bg-secondary/30",
    glow: "dark:hover:shadow-[0_0_26px_hsl(var(--secondary)/0.20)]",
  },
  accent: {
    bg: "bg-accent/10 dark:bg-accent/20",
    activeBg: "bg-accent/15 dark:bg-accent/25",
    text: "text-accent",
    border: "border-accent/35 dark:border-accent/55",
    activeBorder: "border-accent/50 dark:border-accent/70",
    hover: "hover:bg-accent/15 dark:hover:bg-accent/30",
    glow: "dark:hover:shadow-[0_0_26px_hsl(var(--accent)/0.20)]",
  },
} as const;

/* ─────────────────────────────────────────
   Inline tilt handlers (replaces react-tilt)
───────────────────────────────────────── */

/* ─────────────────────────────────────────
   Fallback preview (no images)
───────────────────────────────────────── */
function ProjectPreviewFallback({
  title,
  tech,
  Icon,
  accentClass,
  previewLabel,
}: {
  title: string;
  tech: string[];
  Icon: LucideIcon;
  accentClass: string;
  previewLabel: string;
}) {
  return (
    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-6 text-center">
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
        {previewLabel}
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

/* ─────────────────────────────────────────
   Image dots strip
───────────────────────────────────────── */
function ImageDots({
  total,
  current,
  colorClass,
  onSelect,
}: {
  total: number;
  current: number;
  colorClass: string;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex justify-center">
      <div className="flex gap-1.5 rounded-full bg-background/75 dark:bg-background/35 backdrop-blur-md px-3 py-2 border border-border max-w-full overflow-x-auto">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(i);
            }}
            className={`rounded-full transition-all duration-250 shrink-0 ${
              i === current
                ? `h-2 w-5 ${colorClass}`
                : "h-2 w-2 bg-foreground/20 hover:bg-foreground/35"
            }`}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
export default function Projects() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const systemReducedMotion = useReducedMotion();
  const { still } = useDesignMotion();
  const prefersReducedMotion = systemReducedMotion || still;

  const [activeCategory, setActiveCategory] = useState<CategoryKey>("websites");
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  /* Hash-based tab sync */
  useEffect(() => {
    const sync = () =>
      setActiveCategory(window.location.hash === "#ai" ? "ai" : "websites");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  /* Lock body scroll when modal open */
  useEffect(() => {
    if (!selectedProject) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = selectedProject ? "hidden" : "";
    const frame = requestAnimationFrame(() => dialogRef.current?.focus());
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialogRef.current) return;
      const controls = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]'));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", trapFocus);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [selectedProject]);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
        return;
      }
      if (!selectedProject || selectedProject.images.length <= 1) return;
      if (e.key === "ArrowRight")
        navigate(selectedProject.key, selectedProject.images.length, 1);
      if (e.key === "ArrowLeft")
        navigate(selectedProject.key, selectedProject.images.length, -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedProject]);

  const navigate = useCallback((key: string, total: number, dir: 1 | -1) => {
    setImageIndexes((prev) => ({
      ...prev,
      [key]: ((prev[key] ?? 0) + dir + total) % total,
    }));
  }, []);

  const setImg = useCallback((key: string, i: number) => {
    setImageIndexes((prev) => ({ ...prev, [key]: i }));
  }, []);

  const activeCat = projectCategories[activeCategory];
  const activeColors = CATEGORY_COLORS[activeCat.color];
  const selImgIdx = selectedProject
    ? (imageIndexes[selectedProject.key] ?? 0)
    : 0;

  return (
    <section
      id="projects"
      className="studio-projects relative"
      ref={ref}
    >
      <span id="ai" className="absolute top-0" aria-hidden="true" />
      {/* Backgrounds */}
      <div className="absolute inset-0 cyber-grid opacity-10 dark:opacity-15 pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-25 dark:opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="section-eyebrow"><span>02 / {t("nav.projects")}</span><span>{t("studio.workCaption")}</span></div>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="project-heading"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-foreground">
              {t("projects.sectionTitleFirst")}{" "}
            </span>
            <span className="gradient-text-secondary dark:text-glow-secondary">
              {t("projects.sectionTitleLast")}
            </span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg max-w-2xl mx-auto">
            {t("projects.sectionSubtitle")}
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="project-filters flex overflow-x-auto pb-2"
        >
          {(Object.keys(projectCategories) as CategoryKey[]).map((key) => {
            const cat = projectCategories[key];
            const colors = CATEGORY_COLORS[cat.color];
            const active = activeCategory === key;
            const Icon = cat.icon;

            return (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key)}
                aria-pressed={active}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className={`flex shrink-0 items-center gap-2.5 px-5 md:px-6 py-3 rounded-xl font-display font-semibold
                            transition-all duration-250 border backdrop-blur-md
                            ${
                              active
                                ? `${colors.activeBg} ${colors.text} ${colors.activeBorder} shadow-md`
                                : `bg-card/55 text-muted-foreground hover:text-foreground border-border/70 shadow-sm`
                            } ${colors.glow}`}
              >
                <Icon size={18} />
                <span>{t(`projects.categories.${key}.title`)}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-body
                                  ${active ? "bg-background/25" : "bg-muted/60"}`}
                >
                  {cat.projects.length}
                </span>
              </motion.button>
            );
          })}
        </motion.div>


        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.28 }}
          className="project-category-heading"
        >
          <h3
            className={`text-xl md:text-2xl font-display font-bold ${activeColors.text}`}
          >
            {t(`projects.categories.${activeCategory}.title`)}
          </h3>
          <p className="text-sm text-muted-foreground font-body mt-0.5">
            {t(`projects.categories.${activeCategory}.subtitle`)}
          </p>
        </motion.div>


        <div className="project-grid">
          {activeCat.projects.map((project, index) => {
            const colors = CATEGORY_COLORS[activeCat.color];
            const Icon = project.icon;
            const hasImages = project.images.length > 0;
            const hasMany = project.images.length > 1;
            const curIdx = imageIndexes[project.key] ?? 0;
            const curImg = hasImages ? project.images[curIdx] : "";
            const hasGithub = !!project.github && project.github !== "#";
            const hasDemo = !!project.demo && project.demo !== "#";
            const title = t(`projects.items.${project.key}.title`);
            const shortDesc = t(
              `projects.items.${project.key}.shortDescription`,
            );


            return (
              <motion.div
                key={project.key}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <AnimatedCard className="project-motion-card">
                  <article
                    onClick={(event) => { event.currentTarget.focus({ preventScroll: true }); setSelectedProject(project); }}
                    onKeyDown={(e) => {
                      if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        setSelectedProject(project);
                      }
                    }}
                    tabIndex={0}
                    className={`project-card group relative h-full glass-card rounded-3xl overflow-hidden
                                border border-border/70
                                ${colors.glow}
                                bg-card/85 backdrop-blur-xl cursor-pointer
                                shadow-[var(--shadow-card)]
                                hover:shadow-[var(--shadow-card-hover)]
                                hover:border-[hsl(var(--primary)/0.30)]
                                transition-all duration-300
                                focus:outline-none focus:ring-2 focus:ring-primary/40`}
                  >
                    {/* Image panel */}
                    <div className="project-image-panel relative">
                      {hasMany && <img className="project-back-sheet" src={project.images[(curIdx + 1) % project.images.length]} alt="" aria-hidden="true" loading="lazy" />}
                      <span className="project-preview-label" aria-hidden="true">0{index + 1} — {project.tech[0]}</span>
                      <div
                        className="project-screen relative h-full w-full rounded-2xl border border-border/60
                                      bg-gradient-to-br from-muted via-card to-muted/70 overflow-hidden light-panel"
                      >
                        {hasImages ? (
                          <>
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={`${project.key}-${curIdx}`}
                                src={curImg}
                                alt={`${title} screenshot ${curIdx + 1}`}
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
                                transition={{ duration: 0.3 }}
                                className="relative z-10 w-full h-full object-contain p-3
                                           transition-all duration-300
                                           group-hover:scale-[1.02]"
                              />
                            </AnimatePresence>

                            {/* Bottom vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/25 via-transparent to-transparent pointer-events-none" />

                            {/* Prev / Next arrows */}
                            {hasMany && (
                              <>
                                {[
                                  {
                                    dir: -1 as const,
                                    side: "left-2 sm:left-3",
                                    Icon: ChevronLeft,
                                    label: "Prev",
                                  },
                                  {
                                    dir: 1 as const,
                                    side: "right-2 sm:right-3",
                                    Icon: ChevronRight,
                                    label: "Next",
                                  },
                                ].map(({ dir, side, Icon: Arr, label }) => (
                                  <button
                                    key={label}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(
                                        project.key,
                                        project.images.length,
                                        dir,
                                      );
                                    }}
                                    className={`absolute ${side} top-1/2 z-30 -translate-y-1/2
                                               w-8 h-8 rounded-full
                                               bg-background/80 dark:bg-background/50
                                               backdrop-blur-md border border-border
                                               flex items-center justify-center text-foreground
                                               opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
                                               hover:bg-background transition-opacity shadow-sm`}
                                    aria-label={label}
                                  >
                                    <Arr size={15} />
                                  </button>
                                ))}
                              </>
                            )}
                          </>
                        ) : (
                          <ProjectPreviewFallback
                            title={title}
                            tech={project.tech}
                            Icon={Icon}
                            accentClass={colors.text}
                            previewLabel={t("projects.previewComingSoon")}
                          />
                        )}

                        {/* Category icon badge */}
                        <div
                          className={`absolute top-3 right-3 z-20 p-2
                                         bg-card/90 backdrop-blur-md border border-border
                                         rounded-lg ${colors.text}`}
                        >
                          <Icon size={18} />
                        </div>

                        {/* Dot strip */}
                        {hasMany && (
                          <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 w-[90%]">
                            <ImageDots
                              total={project.images.length}
                              current={curIdx}
                              colorClass="bg-primary dark:bg-secondary"
                              onSelect={(i) => setImg(project.key, i)}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="project-card-body relative z-10">
                      <span className="project-number">0{index + 1} / {t(`projects.categories.${activeCategory}.title`)}</span>
                      <h3
                        className={`text-lg md:text-xl font-display font-bold ${colors.text} mb-2`}
                      >
                        {title}
                      </h3>
                      <p className="project-description text-muted-foreground font-body text-sm mb-4 leading-relaxed">
                        {shortDesc}
                      </p>

                      {/* Tech badges */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="skill-badge px-2.5 py-1 text-xs font-body rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="project-card-actions flex flex-wrap gap-2.5">
                        <button className="project-explore" type="button" onClick={(event) => { event.stopPropagation(); setSelectedProject(project); }}>{t("projects.viewProject")}<ExternalLink size={17} /></button>
                        {hasGithub && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2.5 bg-muted/50 border border-border rounded-xl text-muted-foreground
                                       hover:text-foreground hover:bg-muted transition-colors"
                            aria-label={`GitHub — ${title}`}
                          >
                            <Github size={18} />
                          </a>
                        )}
                        {hasDemo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`flex items-center gap-1.5 px-3.5 py-2.5
                                        ${colors.bg} ${colors.text} border ${colors.border}
                                        rounded-xl font-body font-semibold text-xs
                                        ${colors.hover} transition-colors`}
                          >
                            <ExternalLink size={14} />
                            {t("projects.viewProject")}
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </AnimatedCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Detail modal ── */}
      <AnimatePresence>
        {selectedProject &&
          (() => {
            const colors =
              CATEGORY_COLORS[
                projectCategories[
                  (Object.keys(projectCategories) as CategoryKey[]).find((k) =>
                    projectCategories[k].projects.some(
                      (p) => p.key === selectedProject.key,
                    ),
                  )!
                ].color
              ];
            const selImg = selectedProject.images[selImgIdx] ?? "";
            const hasGithub =
              !!selectedProject.github && selectedProject.github !== "#";
            const hasDemo =
              !!selectedProject.demo && selectedProject.demo !== "#";
            const hasMany = selectedProject.images.length > 1;
            const total = selectedProject.images.length;

            return (
              <motion.div
                className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Backdrop */}
                <motion.div
                  className="absolute inset-0 bg-background/65 dark:bg-black/72 backdrop-blur-md"
                  onClick={() => setSelectedProject(null)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />

                {/* Panel */}
                <motion.div
                  ref={dialogRef}
                  role="dialog"
                  aria-modal="true"
                  aria-label={t(`projects.items.${selectedProject.key}.title`)}
                  tabIndex={-1}
                  initial={{ opacity: 0, scale: 0.97, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 12 }}
                  transition={{
                    type: "spring",
                    stiffness: 340,
                    damping: 28,
                    mass: 0.3,
                  }}
                  className="relative z-10 w-full sm:max-w-6xl
                           h-[92vh] sm:h-auto sm:max-h-[88vh]
                           overflow-hidden glass-card
                           rounded-t-3xl sm:rounded-3xl
                           border border-border/70
                           bg-card/97 dark:bg-card/95
                           shadow-[0_28px_80px_hsl(220_20%_8%/0.24)]"
                >
                  {/* Modal header */}
                  <div
                    className="sticky top-0 z-20 flex items-center justify-between
                                px-4 md:px-6 py-3.5 border-b border-border/60
                                bg-card/95 backdrop-blur-md"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`p-2 rounded-xl border border-border bg-muted/50 ${colors.text}`}
                      >
                        <selectedProject.icon size={20} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg md:text-xl font-display font-bold text-foreground truncate">
                          {t(`projects.items.${selectedProject.key}.title`)}
                        </h3>
                        {hasMany && (
                          <p className="text-xs text-muted-foreground font-body">
                            {selImgIdx + 1} / {total}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="p-2 rounded-xl border border-border bg-muted/50
                               text-muted-foreground hover:text-foreground
                               hover:bg-muted transition-colors shrink-0"
                      aria-label={t("projects.closeProjectDetails")}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Modal body */}
                  <div
                    className="grid lg:grid-cols-[1.2fr_0.8fr]
                                h-[calc(92vh-60px)] sm:h-auto
                                sm:max-h-[calc(88vh-60px)] overflow-y-auto"
                  >
                    {/* Left — image */}
                    <div className="p-4 md:p-6 border-b lg:border-b-0 lg:border-r border-border/60">
                      <div
                        className="relative h-[240px] sm:h-[320px] md:h-[400px] w-full
                                    rounded-2xl border border-border/60
                                    bg-gradient-to-br from-muted via-card to-muted/70
                                    overflow-hidden light-panel"
                      >
                        {selectedProject.images.length > 0 ? (
                          <>
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={`modal-${selectedProject.key}-${selImgIdx}`}
                                src={selImg}
                                alt={`${t(`projects.items.${selectedProject.key}.title`)} screenshot ${selImgIdx + 1}`}
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
                                transition={{ duration: 0.28 }}
                                className="relative z-10 w-full h-full object-contain p-4"
                              />
                            </AnimatePresence>

                            <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />

                            {hasMany && (
                              <>
                                {[
                                  {
                                    dir: -1 as const,
                                    side: "left-3 sm:left-4",
                                    Arr: ChevronLeft,
                                    label: "Prev",
                                  },
                                  {
                                    dir: 1 as const,
                                    side: "right-3 sm:right-4",
                                    Arr: ChevronRight,
                                    label: "Next",
                                  },
                                ].map(({ dir, side, Arr, label }) => (
                                  <button
                                    key={label}
                                    type="button"
                                    onClick={() =>
                                      navigate(selectedProject.key, total, dir)
                                    }
                                    className={`absolute ${side} top-1/2 z-30 -translate-y-1/2
                                             w-9 h-9 sm:w-10 sm:h-10 rounded-full
                                             bg-background/80 dark:bg-background/50
                                             backdrop-blur-md border border-border
                                             flex items-center justify-center text-foreground
                                             hover:bg-background/95 transition-colors shadow-md`}
                                    aria-label={label}
                                  >
                                    <Arr size={17} />
                                  </button>
                                ))}
                              </>
                            )}
                          </>
                        ) : (
                          <ProjectPreviewFallback
                            title={t(
                              `projects.items.${selectedProject.key}.title`,
                            )}
                            tech={selectedProject.tech}
                            Icon={selectedProject.icon}
                            accentClass={colors.text}
                            previewLabel={t("projects.previewComingSoon")}
                          />
                        )}
                      </div>

                      {/* Dot strip under image */}
                      {hasMany && (
                        <div className="mt-4">
                          <ImageDots
                            total={total}
                            current={selImgIdx}
                            colorClass="bg-primary dark:bg-secondary"
                            onSelect={(i) => setImg(selectedProject.key, i)}
                          />
                        </div>
                      )}
                    </div>

                    {/* Right — details */}
                    <div className="p-4 md:p-6 space-y-6 lg:overflow-y-auto">
                      <div>
                        <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground font-display mb-2">
                          {t("projects.overview")}
                        </h4>
                        <p className="text-sm md:text-base leading-relaxed text-foreground font-body">
                          {t(
                            `projects.items.${selectedProject.key}.description`,
                          )}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground font-display mb-3">
                          {t("projects.technologies")}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tech.map((tech) => (
                            <span
                              key={tech}
                              className="skill-badge px-3 py-1.5 text-sm font-body rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground font-display mb-3">
                          {t("projects.links")}
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {hasGithub && (
                            <a
                              href={selectedProject.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                                       border border-border bg-muted/50 text-foreground
                                       hover:bg-muted transition-colors text-sm font-body"
                            >
                              <Github size={16} />
                              GitHub
                            </a>
                          )}
                          {hasDemo && (
                            <a
                              href={selectedProject.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                                        border ${colors.border} ${colors.bg} ${colors.text}
                                        ${colors.hover} transition-colors text-sm font-body`}
                            >
                              <ExternalLink size={16} />
                              {t("projects.viewProject")}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
      </AnimatePresence>
    </section>
  );
}
