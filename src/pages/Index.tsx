import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import { DesignMotion } from "@/components/DesignMotion";
import { motion, useScroll } from "framer-motion";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "@/studio.css";

export default function Index() {
  const { scrollYProgress } = useScroll();
  const { t, i18n } = useTranslation();
  useEffect(() => { document.documentElement.lang = i18n.resolvedLanguage || "en"; }, [i18n.resolvedLanguage]);
  return <DesignMotion><a className="skip-link" href="#main-content">{t("studio.skipContent")}</a><motion.div className="studio-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" /><Navigation /><main id="main-content"><Hero /><About /><Projects /><Skills /><Contact /></main><Footer /></DesignMotion>;
}
