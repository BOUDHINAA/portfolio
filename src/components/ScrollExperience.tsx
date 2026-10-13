import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";

const chapters = ["home", "about", "projects", "skills", "contact"] as const;

/** Native document scrolling keeps anchors, tall sections and keyboard navigation intact. */
export default function ScrollExperience() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const rotate = useTransform(progress, [0, 1], [0, 150]);
  const y = useTransform(progress, [0, 1], ["0%", "-30%"]);

  useEffect(() => {
    document.documentElement.classList.add("portfolio-scroll");
    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = window.innerHeight * 0.38;
      let current = 0;
      chapters.forEach((id, index) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= marker) current = index;
      });
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("portfolio-scroll");
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <>
      <motion.div className="reading-progress" style={{ scaleX: reducedMotion ? scrollYProgress : progress }} aria-hidden="true" />
      <div className={`chapter-atmosphere chapter-atmosphere-${active}`} aria-hidden="true">
        <motion.div className="atmosphere-orbit" style={reducedMotion ? undefined : { rotate, y }} />
        <span className="chapter-watermark">{String(active + 1).padStart(2, "0")}</span>
      </div>
      <nav className="chapter-rail" aria-label={t("scroll.navigation")}>
        <span className="chapter-rail-caption">{t("scroll.explore")}</span>
        {chapters.map((id, index) => (
          <a key={id} href={`#${id}`} className={active === index ? "is-active" : ""}
            aria-label={t(`nav.${id}`)} aria-current={active === index ? "location" : undefined}>
            <span className="chapter-rail-label">{t(`nav.${id}`)}</span>
            <span className="chapter-rail-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="chapter-rail-line" />
          </a>
        ))}
        <span className="chapter-rail-total">/ 05</span>
      </nav>
    </>
  );
}
