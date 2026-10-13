import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./DesignMotion";
import AnimatedCard from "./AnimatedCard";
import SkillIllustration from "./SkillIllustration";

const categories = [
  { key: "frontend", symbol: "</>", skills: ["React", "Next.js", "Angular", "Tailwind CSS", "HTML / CSS"] },
  { key: "backend", symbol: "{ }", skills: ["Node.js", "Express.js", "Spring Boot", "PostgreSQL", "MongoDB"] },
  { key: "coreLanguages", symbol: "Aa", skills: ["JavaScript", "TypeScript", "Java", "C++"] },
  { key: "devops", symbol: "↗", skills: ["Docker", "Jenkins", "Grafana", "Prometheus", "Git / GitHub"] },
];
export default function Skills() {
  const { t } = useTranslation();
  return <section id="skills" className="skills-section section-shell">
    <div className="section-eyebrow"><span>03 / {t("nav.skills")}</span><span>{t("studio.toolboxCaption")}</span></div>
    <Reveal className="skills-intro"><h2 className="editorial-heading">{t("studio.toolboxTitle")}<br /><em>{t("studio.toolboxEmphasis")}</em></h2><p>{t("skills.sectionSubtitle")}</p></Reveal>
    <div className="toolbox-grid">{categories.map((category, i) => <Reveal key={category.key} delay={i * .08}><AnimatedCard className={`toolbox-card toolbox-${i}`}><div className="toolbox-top"><span>0{i + 1}</span><ArrowUpRight size={23} /></div><SkillIllustration type={category.key} /><h3>{t(`skills.categories.${category.key}`)}</h3><div className="toolbox-tags">{category.skills.map(skill => <span key={skill}>{skill}</span>)}</div></AnimatedCard></Reveal>)}</div>
    <div className="tools-footnote"><span>{t("studio.alsoUsing")}</span><span>Figma · Postman · Linux · Zod · tRPC · shadcn/ui · Jira</span></div>
  </section>;
}
