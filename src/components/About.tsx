import { useTranslation } from "react-i18next";
import { ArrowUpRight, Code2, Brain, Workflow, Sparkles } from "lucide-react";
import { Reveal } from "./DesignMotion";

export default function About() {
  const { t } = useTranslation();
  return <section id="about" className="about-section section-shell">
    <div className="section-eyebrow"><span>01 / {t("nav.about")}</span><span>{t("studio.behind")}</span></div>
    <div className="about-layout">
      <Reveal><h2 className="editorial-heading">{t("studio.aboutTitle")}<br /><em>{t("studio.aboutEmphasis")}</em></h2><div className="about-doodle" aria-hidden="true"><span>✳</span><span>+</span><span>↗</span></div></Reveal>
      <Reveal className="about-story" delay={0.12}><p className="about-lead">{t("about.description")}</p><p>{t("about.currentFocusDescription")}</p><a href="#contact" className="text-link">{t("studio.letsTalk")}<ArrowUpRight size={19} /></a><div className="about-signature">Ahmed Boudhina <span>/{t("about.location")}</span></div></Reveal>
    </div>
    <div className="expertise-list">{[{key:"fullStack",icon:Code2},{key:"ai",icon:Brain},{key:"devops",icon:Workflow},{key:"problemSolving",icon:Sparkles}].map(({key,icon:Icon}, i) => <Reveal key={key} delay={i * .07}><div className="expertise-item"><span className="expertise-number">0{i + 1}</span><Icon size={28} /><h3>{t(`about.domains.${key}.title`)}</h3><p>{t(`about.domains.${key}.description`)}</p></div></Reveal>)}</div>
  </section>;
}
