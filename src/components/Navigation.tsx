import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";


export default function Navigation() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); } };
    const resize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("keydown", close);
    window.addEventListener("resize", resize);
    return () => { window.removeEventListener("keydown", close); window.removeEventListener("resize", resize); };
  }, []);
  return <header className="studio-header"><a className="studio-brand" href="#home" aria-label="Ahmed Boudhina — Home"><span className="brand-mark">ab<span>↗</span></span><span>Ahmed<br />Boudhina</span></a>
    <nav className="desktop-links" aria-label={t("studio.navigation")}>{["about", "projects", "skills"].map(key => <a href={`#${key}`} key={key}>{t(`nav.${key}`)}</a>)}<a href="#contact">{t("studio.letsTalk")}<ArrowUpRight size={15} /></a></nav>
    <div className="header-controls"><LanguageSwitcher /><ThemeToggle /><button ref={menuButton} className="menu-toggle" aria-expanded={open} aria-controls="studio-mobile-menu" aria-label={t("nav.toggleMenu")} onClick={() => setOpen(value => !value)}>{open ? <X /> : <Menu />}</button></div>
    <AnimatePresence>{open && <motion.nav id="studio-mobile-menu" className="mobile-links" aria-label={t("studio.navigation")} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>{["home", "about", "projects", "skills", "contact"].map((key,i) => <a key={key} href={`#${key}`} onClick={() => setOpen(false)}><span>0{i + 1}</span>{t(`nav.${key}`)}<ArrowUpRight size={22} /></a>)}</motion.nav>}</AnimatePresence>
  </header>;
}
