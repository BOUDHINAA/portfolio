import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Shuffle, Braces } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDesignMotion } from "./DesignMotion";

export default function Hero() {
  const { t } = useTranslation();
  const { still } = useDesignMotion();
  const [remix, setRemix] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });
  const rotateX = useTransform(smoothY, [-1, 1], [5, -5]);
  const rotateY = useTransform(smoothX, [-1, 1], [-6, 6]);
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (still || event.pointerType !== "mouse" || !stage.current) return;
    const box = stage.current.getBoundingClientRect();
    x.set((event.clientX - box.left) / box.width * 2 - 1);
    y.set((event.clientY - box.top) / box.height * 2 - 1);
  };
  const reset = () => { x.set(0); y.set(0); };
  const shift = remix % 2 === 0 ? 1 : -1;
  return <section id="home" className="studio-hero section-shell">
    <div className="hero-kicker"><span className="status-dot" /> {t("studio.intro")}<span className="hero-location">{t("about.location")} ↗</span></div>
    <div className="hero-composition">
      <div className="hero-copy">
        <motion.h1 initial={still ? false : { y: 45, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
          {t("studio.headline1")}<br />{t("studio.headline2")}<br /><span className="hero-italic">{t("studio.headline3")}<span className="headline-dot">.</span></span>
        </motion.h1>
        <motion.p initial={still ? false : { y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.7 }} className="hero-description">{t("studio.heroDescription")}</motion.p>
        <div className="hero-actions"><a href="#projects" className="pill-button">{t("studio.viewWork")}<ArrowUpRight size={20} /></a><a href={`${import.meta.env.BASE_URL}files/Ahmed_Boudhina_CV.pdf`} download className="text-link">{t("hero.resume")}<ArrowDown size={17} /></a></div>
      </div>
      <div className={`hero-playground remix-${remix % 3}`} ref={stage} onPointerMove={move} onPointerLeave={reset}>
        <div className="playground-grid" aria-hidden="true" />
        <div className="orbit-path" aria-hidden="true"><span /></div>
        <motion.div className="portrait-composition" style={still ? undefined : { rotateX, rotateY }}>
          <motion.div className="portrait-paper" animate={{ rotate: still ? -5 : -5 * shift, y: still ? 0 : [0, -12, 0] }} transition={{ rotate: { type: "spring", stiffness: 80 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}>
            <div className="portrait-photo"><img src={`${import.meta.env.BASE_URL}photo.webp`} alt="Ahmed Boudhina" loading="eager" /></div>
            <div className="portrait-caption"><span>Ahmed Boudhina</span><span>↗</span></div>
          </motion.div>
          <motion.div className="code-sticker" animate={{ rotate: still ? 7 : 7 * shift, x: still ? 0 : shift * 12, y: still ? 0 : [0, 10, 0] }} transition={{ x: { type: "spring" }, rotate: { type: "spring" }, y: { repeat: Infinity, duration: 5, ease: "easeInOut" } }} aria-hidden="true">
            <div className="code-dots"><i /><i /><i /><span>hello.tsx</span></div><code><span>const</span> developer = &#123;<br />&nbsp; name: <b>'Ahmed'</b>,<br />&nbsp; mindset: <b>'curious'</b>,<br />&nbsp; ideas: <b>Infinity</b><br />&#125;</code>
          </motion.div>
          <motion.div className="skill-sticker" animate={{ rotate: still ? -8 : -8 * shift, y: still ? 0 : [0, -9, 0] }} transition={{ rotate: { type: "spring" }, y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}><Braces size={22} />Full-stack<span>↗</span></motion.div>
          <div className="hero-flower" aria-hidden="true">✳</div>
          <div className="idea-bubble" aria-hidden="true"><span className="bubble-eye" /><span className="bubble-eye" /><span className="bubble-smile" /></div>
        </motion.div>
        <button type="button" onClick={() => setRemix(value => value + 1)} className="remix-button"><Shuffle size={15} />{t("studio.remix")}</button>
      </div>
    </div>
    <div className="hero-bottom"><a href="#about"><span className="scroll-arrow"><ArrowDown size={17} /></span>{t("studio.scroll")}</a><div><a href="https://github.com/BOUDHINAA" target="_blank" rel="noreferrer" aria-label={t("hero.githubLabel")}><Github size={18} /></a><a href="https://www.linkedin.com/in/ahmed-boudhina/" target="_blank" rel="noreferrer" aria-label={t("hero.linkedinLabel")}><Linkedin size={18} /></a><span>{t("studio.engineer")}</span></div></div>
  </section>;
}
