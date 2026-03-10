import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Code2 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "AI Projects", href: "#ai" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card py-3" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="#home"
          className="flex items-center gap-3 text-primary font-display text-xl font-bold"
          whileHover={{ scale: 1.05 }}
        >
          <div className="p-2 rounded-xl border border-primary/30 glass-card">
            <Code2 className="w-6 h-6" />
          </div>
          <span className="text-glow">Ahmed Boudhina</span>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative font-body text-lg text-foreground/80 hover:text-primary transition-colors group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}

          <ThemeToggle />
        </div>

        {/* Mobile Right Actions */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />

          <button
            className="text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden glass-card mx-4 mt-2 rounded-lg"
      >
        <div className="py-4 px-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="font-body text-lg text-foreground/80 hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
