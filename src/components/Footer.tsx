import { motion } from "framer-motion";
import { Code2, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-5" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.a
            href="#home"
            className="flex items-center gap-2 text-primary font-display text-lg font-bold"
            whileHover={{ scale: 1.05 }}
          >
            <Code2 className="w-6 h-6" />
            <span className="text-glow">AHMED BOUDHINA</span>
          </motion.a>

          <p className="flex items-center gap-2 text-muted-foreground font-body text-sm text-center">
            Built with{" "}
            <Heart className="w-4 h-4 text-secondary animate-pulse" /> by Ahmed
            Boudhina
          </p>

          <p className="text-muted-foreground font-body text-sm text-center">
            © {new Date().getFullYear()} Ahmed Boudhina. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
