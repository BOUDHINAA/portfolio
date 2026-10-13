import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
export default function Footer() {
  const { t } = useTranslation();
  return <footer className="studio-footer section-shell"><a href="#home" className="footer-name">Ahmed Boudhina<span>↗</span></a><div className="footer-bottom"><span>© {new Date().getFullYear()} Ahmed Boudhina</span><span>{t("studio.footerNote")}</span><a href="#home">{t("studio.backTop")}<ArrowUpRight size={15} /></a></div></footer>;
}
