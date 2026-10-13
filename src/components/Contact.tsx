import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Send, Github, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { Reveal } from "./DesignMotion";

export default function Contact() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  useEffect(() => { emailjs.init({ publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY, blockHeadless: true, limitRate: { id: "contact-form", throttle: 10000 } }); }, []);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formRef.current || isSending) return;
    try {
      setIsSending(true);
      await emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, formRef.current);
      toast.success(t("studio.sent"));
      setFormData({ name: "", email: "", message: "" });
    } catch { toast.error(t("studio.sendError")); }
    finally { setIsSending(false); }
  };
  return <section id="contact" className="contact-section section-shell">
    <div className="section-eyebrow"><span>04 / {t("nav.contact")}</span><span>{t("studio.nextChapter")}</span></div>
    <div className="contact-layout"><Reveal className="contact-copy"><h2 className="editorial-heading">{t("studio.contactTitle")}<br /><em>{t("studio.contactEmphasis")}</em><span className="contact-star" aria-hidden="true">✳</span></h2><p>{t("studio.contactDescription")}</p><a href="mailto:ahmedboudhina@live.com" className="contact-email">ahmedboudhina@live.com<ArrowUpRight size={22} /></a><div className="contact-socials"><a href="https://github.com/BOUDHINAA" target="_blank" rel="noreferrer"><Github size={17} />GitHub<ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/in/ahmed-boudhina/" target="_blank" rel="noreferrer"><Linkedin size={17} />LinkedIn<ArrowUpRight size={14} /></a></div></Reveal>
      <Reveal delay={0.1}><form ref={formRef} id="contact-form" onSubmit={handleSubmit} className="studio-form"><input type="hidden" name="time" value={new Date().toLocaleString()} />
        <label htmlFor="contact-name"><span>01</span>{t("studio.nameLabel")}</label><input id="contact-name" name="name" autoComplete="name" value={formData.name} onChange={e => setFormData({...formData, name:e.target.value})} placeholder={t("studio.namePlaceholder")} required />
        <label htmlFor="contact-email"><span>02</span>{t("studio.emailLabel")}</label><input id="contact-email" name="email" type="email" autoComplete="email" value={formData.email} onChange={e => setFormData({...formData, email:e.target.value})} placeholder="you@example.com" required />
        <label htmlFor="contact-message"><span>03</span>{t("studio.messageLabel")}</label><textarea id="contact-message" name="message" value={formData.message} onChange={e => setFormData({...formData, message:e.target.value})} placeholder={t("studio.messagePlaceholder")} rows={3} required />
        <button type="submit" className="pill-button" disabled={isSending}>{t(isSending ? "studio.sending" : "studio.send")}<Send size={17} /></button>
      </form></Reveal></div>
  </section>;
}
