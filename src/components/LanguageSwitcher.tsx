import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const current = i18n.resolvedLanguage ?? i18n.language ?? "en";
  const isEnglish = current.startsWith("en");
  const isFrench = current.startsWith("fr");

  return (
    <div
      className="inline-flex items-center gap-1 rounded-xl border border-border/70 bg-card/75 backdrop-blur-md p-1 shadow-sm"
      role="group"
      aria-label={t("nav.languageSwitcher", "Language switcher")}
    >
      <button
        type="button"
        lang="en"
        aria-label={t("nav.languageEnglish", "Switch to English")}
        aria-pressed={isEnglish}
        onClick={() => void i18n.changeLanguage("en")}
        className={`min-w-[44px] px-3 py-1.5 rounded-lg text-xs md:text-sm font-body font-semibold tracking-wide transition-all duration-200 whitespace-nowrap ${
          isEnglish
            ? "bg-primary text-primary-foreground border border-primary shadow-[0_6px_18px_hsl(var(--primary)/0.18)]"
            : "text-foreground/75 hover:text-primary hover:bg-muted/70"
        }`}
      >
        EN
      </button>

      <button
        type="button"
        lang="fr"
        aria-label={t("nav.languageFrench", "Passer en français")}
        aria-pressed={isFrench}
        onClick={() => void i18n.changeLanguage("fr")}
        className={`min-w-[44px] px-3 py-1.5 rounded-lg text-xs md:text-sm font-body font-semibold tracking-wide transition-all duration-200 whitespace-nowrap ${
          isFrench
            ? "bg-primary text-primary-foreground border border-primary shadow-[0_6px_18px_hsl(var(--primary)/0.18)]"
            : "text-foreground/75 hover:text-primary hover:bg-muted/70"
        }`}
      >
        FR
      </button>
    </div>
  );
}
