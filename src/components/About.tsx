import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  GraduationCap,
  Code2,
  Gamepad2,
  Brain,
  Rocket,
} from "lucide-react";

export default function About() {
  const { t } = useTranslation();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const domains = [
    {
      icon: Code2,
      title: t("about.domains.fullStack.title"),
      description: t("about.domains.fullStack.description"),
      borderClass: "border-primary/30",
      hoverBorderClass: "hover:border-primary/60",
      iconClass: "text-primary",
      titleClass: "text-primary",
    },
    {
      icon: Brain,
      title: t("about.domains.ai.title"),
      description: t("about.domains.ai.description"),
      borderClass: "border-secondary/30",
      hoverBorderClass: "hover:border-secondary/60",
      iconClass: "text-secondary",
      titleClass: "text-secondary",
    },
    {
      icon: Rocket,
      title: t("about.domains.devops.title"),
      description: t("about.domains.devops.description"),
      borderClass: "border-accent/30",
      hoverBorderClass: "hover:border-accent/60",
      iconClass: "text-accent",
      titleClass: "text-accent",
    },
    {
      icon: Gamepad2,
      title: t("about.domains.problemSolving.title"),
      description: t("about.domains.problemSolving.description"),
      borderClass: "border-primary/30",
      hoverBorderClass: "hover:border-primary/60",
      iconClass: "text-primary",
      titleClass: "text-primary",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 md:py-32 relative overflow-hidden light-stars"
      ref={ref}
    >
      <div className="absolute inset-0 cyber-grid opacity-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-foreground">{t("about.titleFirst")} </span>
            <span className="gradient-text text-glow">
              {t("about.titleLast")}
            </span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("about.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-start mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card light-panel p-6 md:p-8 rounded-2xl neon-border">
              <p className="text-base md:text-lg text-foreground/90 font-body leading-relaxed mb-6">
                {t("about.description")}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="text-primary shrink-0" size={20} />
                  <span className="font-body">{t("about.location")}</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap
                    className="text-secondary shrink-0"
                    size={20}
                  />
                  <span className="font-body">{t("about.role")}</span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card light-panel p-5 md:p-6 rounded-2xl border border-secondary/30"
            >
              <h3 className="text-lg md:text-xl font-display font-bold text-secondary mb-3">
                {t("about.currentFocusTitle")}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                {t("about.currentFocusDescription")}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {domains.map((domain, index) => {
              const Icon = domain.icon;

              return (
                <motion.div
                  key={domain.title}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className={`glass-card light-panel p-5 md:p-6 rounded-2xl border ${domain.borderClass} ${domain.hoverBorderClass} transition-all group cursor-pointer`}
                >
                  <Icon
                    className={`w-9 h-9 md:w-10 md:h-10 ${domain.iconClass} mb-4 group-hover:scale-110 transition-transform`}
                  />
                  <h3
                    className={`text-base md:text-lg font-display font-bold ${domain.titleClass} mb-2`}
                  >
                    {domain.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
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
