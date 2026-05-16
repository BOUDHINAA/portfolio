import { motion } from "framer-motion";
import { Github, Linkedin, ChevronDown, Download } from "lucide-react";
import Scene3D from "./Scene3D";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden light-stars pt-28 pb-12 md:pt-32 md:pb-16 lg:pt-24"
    >
     

      <div className="absolute inset-0 cyber-grid opacity-25 dark:opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-5 md:mb-6"
          >
            <div className="relative">
              <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/60 shadow-[0_16px_40px_hsl(var(--primary)/0.16)] dark:shadow-[0_0_30px_hsl(var(--primary)/0.28)] bg-card/70 backdrop-blur-md mx-auto">
                <img
                  src={`${import.meta.env.BASE_URL}photo.webp`}
                  alt="Ahmed Boudhina"
                  className="w-full h-full object-cover object-[50%_35%] scale-[1.02]"
                />
              </div>

              <div className="absolute -inset-2 rounded-full border border-primary/30 animate-pulse" />
              <div className="absolute -inset-4 rounded-full border border-secondary/20 animate-[spin_24s_linear_infinite]" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-primary font-display text-[11px] md:text-sm mb-4 tracking-[0.22em] md:tracking-[0.25em]"
          >
            WELCOME TO MY DIGITAL SPACE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-5 md:mb-6 leading-tight"
          >
            <span className="text-foreground">Ahmed </span>
            <span className="gradient-text text-glow">Boudhina</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap justify-center gap-2 md:gap-3 mb-7 md:mb-8 max-w-3xl"
          >
            <span className="px-3 md:px-4 py-2 glass-card light-panel rounded-full text-primary font-body text-sm md:text-base font-semibold border border-primary/30">
              ⚛️ Full-Stack Developer
            </span>
            <span className="px-3 md:px-4 py-2 glass-card light-panel rounded-full text-secondary font-body text-sm md:text-base font-semibold border border-secondary/30">
              🚀 Web Engineer
            </span>
            <span className="px-3 md:px-4 py-2 glass-card light-panel rounded-full text-accent font-body text-sm md:text-base font-semibold border border-accent/30">
              🧠 AI-Powered Products
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full max-w-3xl mb-8 md:mb-10"
          >
            <div className="glass-card light-panel rounded-3xl px-5 py-5 md:px-8 md:py-6 border border-border/70">
              <p className="text-base md:text-xl text-muted-foreground font-body leading-relaxed">
                I build modern web applications with a strong focus on clean
                interfaces, scalable architecture, and interactive user
                experiences. From production-ready full-stack platforms to
                gamified AI-driven products, I enjoy turning ideas into polished
                digital experiences.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-5 mb-10 md:mb-12 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="group relative px-6 md:px-8 py-3.5 md:py-4 bg-primary text-primary-foreground font-display font-bold rounded-xl overflow-hidden transition-all hover:scale-[1.03] shadow-[0_10px_24px_hsl(var(--primary)/0.2)] dark:shadow-[0_0_20px_hsl(var(--primary)/0.22)]"
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href={`${import.meta.env.BASE_URL}files/Ahmed_Boudhina_CV.pdf`}
              download
              className="px-6 md:px-8 py-3.5 md:py-4 border-2 border-primary/60 text-primary font-display font-bold rounded-xl bg-card/75 backdrop-blur-md hover:bg-primary hover:text-primary-foreground transition-all hover:scale-[1.03] flex items-center justify-center gap-2 shadow-sm"
            >
              <Download size={18} />
              Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex gap-4 md:gap-5"
          >
            {[
              {
                icon: Github,
                href: "https://github.com/BOUDHINAA",
                color: "hover:text-foreground",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/ahmed-boudhina/",
                color: "hover:text-blue-500 dark:hover:text-blue-400",
              },
            ].map(({ icon: Icon, href, color }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12, y: -4 }}
                className={`p-3 glass-card light-panel rounded-2xl text-muted-foreground ${color} transition-colors border border-border/70`}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-primary"
        >
          <ChevronDown size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
}
