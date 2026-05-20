import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Code2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
  const { t } = useTranslation();

  const navItems = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.aiProjects", "AI Projects"), href: "#ai" },
    { name: t("nav.skills"), href: "#skills" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setIsOpen(false);

    if (href === "#ai") {
      e.preventDefault();

      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      if (window.location.hash !== "#ai") {
        window.history.pushState(null, "", "#ai");
      }

      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45 }}
        className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-300 ${
          scrolled
            ? "glass-card light-panel py-3 border-b border-border/70 shadow-[0_10px_30px_hsl(220_25%_18%/0.08)] dark:shadow-none"
            : "py-3 md:py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
          <motion.a
            href="#home"
            className="flex items-center gap-2 md:gap-3 text-primary font-display text-sm sm:text-base md:text-xl font-bold shrink-0 min-w-0"
            whileHover={{ scale: 1.03 }}
            onClick={() => setIsOpen(false)}
          >
            <div className="p-2 rounded-xl border border-primary/30 glass-card light-panel shrink-0">
              <Code2 className="w-4 h-4 md:w-6 md:h-6" />
            </div>
            <span className="text-glow leading-none truncate">
              {t("nav.brand", "Ahmed Boudhina")}
            </span>
          </motion.a>

          <div className="hidden lg:flex items-center gap-5 xl:gap-8 min-w-0">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
                className="relative font-body text-base xl:text-lg text-foreground/80 hover:text-primary transition-colors group whitespace-nowrap"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}

            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <button
              className="text-primary p-2 rounded-xl border border-border/60 glass-card"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={t("nav.toggleMenu", "Toggle menu")}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label={t("nav.closeMenu", "Close menu")}
              className="fixed inset-0 z-[70] bg-background/55 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22 }}
              className="fixed top-[76px] left-4 right-4 z-[81] glass-card light-panel rounded-2xl border border-border/70 shadow-[0_18px_40px_hsl(220_25%_18%/0.12)] lg:hidden"
            >
              <div className="py-4 px-5 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3 pb-2 border-b border-border/50">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>

                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="font-body text-lg text-foreground/85 hover:text-primary transition-colors py-3 border-b last:border-b-0 border-border/50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
