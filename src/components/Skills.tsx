import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Core Languages",
    titleClass: "text-primary",
    borderClass: "border-primary/30",
    barClass: "bg-gradient-to-r from-primary to-primary/60",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Java", level: 80 },
      { name: "C++", level: 75 },
    ],
  },
  {
    title: "Frontend Development",
    titleClass: "text-secondary",
    borderClass: "border-secondary/30",
    barClass: "bg-gradient-to-r from-secondary to-secondary/60",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "Angular", level: 78 },
      { name: "Tailwind CSS", level: 85 },
      { name: "HTML/CSS", level: 92 },
    ],
  },
  {
    title: "Backend & Databases",
    titleClass: "text-accent",
    borderClass: "border-accent/30",
    barClass: "bg-gradient-to-r from-accent to-accent/60",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 82 },
      { name: "Spring Boot", level: 78 },
      { name: "PostgreSQL", level: 82 },
      { name: "MongoDB", level: 80 },
    ],
  },
  {
    title: "DevOps & Workflow",
    titleClass: "text-primary",
    borderClass: "border-primary/30",
    barClass: "bg-gradient-to-r from-primary to-primary/60",
    skills: [
      { name: "Docker", level: 78 },
      { name: "Jenkins", level: 72 },
      { name: "Grafana", level: 70 },
      { name: "Prometheus", level: 70 },
      { name: "Git/GitHub", level: 88 },
    ],
  },
];

const tools = [
  "Git",
  "GitHub",
  "Jira",
  "Docker",
  "Jenkins",
  "Grafana",
  "Prometheus",
  "Nexus",
  "Postman",
  "VS Code",
  "Figma",
  "Linux",
  "Zod",
  "tRPC",
  "shadcn/ui",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Laravel",
  "Spring Boot",
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 cyber-grid opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-foreground">Technical </span>
            <span className="gradient-text text-glow">Arsenal</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            Languages, frameworks, and tools I use to build modern and scalable
            digital products
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className={`glass-card p-6 rounded-2xl border ${category.borderClass}`}
            >
              <h3
                className={`text-xl font-display font-bold ${category.titleClass} mb-6`}
              >
                {category.title}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-body text-foreground">
                        {skill.name}
                      </span>
                      <span className="font-body text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.1,
                        }}
                        className={`h-full ${category.barClass} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-8 rounded-2xl neon-border"
        >
          <h3 className="text-xl font-display font-bold text-primary mb-6 text-center">
            Tools & Technologies
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-4 py-2 glass-card rounded-full font-body text-foreground border border-primary/30 hover:border-primary hover:text-primary transition-all cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex gap-8 glass-card px-8 py-4 rounded-2xl">
            <div className="text-center">
              <p className="text-3xl font-display font-bold text-primary">5+</p>
              <p className="text-muted-foreground font-body text-sm">
                Projects
              </p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-3xl font-display font-bold text-secondary">
                3+
              </p>
              <p className="text-muted-foreground font-body text-sm">
                Work Experiences
              </p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-3xl font-display font-bold text-accent">20+</p>
              <p className="text-muted-foreground font-body text-sm">
                Technologies
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
