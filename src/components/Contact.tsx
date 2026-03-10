import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Send, Mail, MapPin, Github, Linkedin } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    emailjs.init({
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      blockHeadless: true,
      limitRate: {
        id: "contact-form",
        throttle: 10000,
      },
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    try {
      setIsSending(true);

      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
      );

      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/BOUDHINAA",
      label: "GitHub",
      color: "hover:text-foreground",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ahmed-boudhina/",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
  ];

  return (
    <section
      id="contact"
      className="py-32 relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute inset-0 cyber-grid opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-foreground">Get In </span>
            <span className="gradient-text-secondary text-glow-secondary">
              Touch
            </span>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            Have a project in mind, a freelance opportunity, or want to
            collaborate? Let’s connect.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-card p-8 rounded-2xl neon-border">
              <h3 className="text-2xl font-display font-bold text-primary mb-6">
                Let&apos;s Build Something Great
              </h3>
              <p className="text-muted-foreground font-body mb-8 leading-relaxed">
                I’m always open to discussing full stack development, modern web
                applications, AI-powered products, and new opportunities. Feel
                free to reach out if you want to work together.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-foreground">
                  <div className="p-3 glass-card rounded-lg text-primary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-body font-semibold">Location</p>
                    <p className="text-muted-foreground font-body text-sm">
                      Tunisia
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-foreground">
                  <div className="p-3 glass-card rounded-lg text-secondary">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-body font-semibold">Email</p>
                    <a
                      href="mailto:ahmedboudhina@live.com"
                      className="text-muted-foreground font-body text-sm hover:text-primary transition-colors"
                    >
                      ahmedboudhina@live.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-secondary/30">
              <h4 className="text-lg font-display font-bold text-secondary mb-4">
                Connect With Me
              </h4>
              <div className="flex gap-4 flex-wrap">
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    className={`flex items-center gap-2 p-3 glass-card rounded-lg text-muted-foreground ${color} transition-colors`}
                  >
                    <Icon size={20} />
                    <span className="font-body text-sm hidden sm:inline">
                      {label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form
              id="contact-form"
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-card p-8 rounded-2xl border border-primary/30 space-y-6"
            >
              <input
                type="hidden"
                name="time"
                value={new Date().toLocaleString()}
              />

              <div>
                <label className="block font-body font-semibold text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block font-body font-semibold text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block font-body font-semibold text-foreground mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSending}
                whileHover={{ scale: isSending ? 1 : 1.02 }}
                whileTap={{ scale: isSending ? 1 : 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-display font-bold rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                {isSending ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
