import { useTranslation } from "react-i18next";

export default function ScrollSignature() {
  const { t } = useTranslation();
  const words = [t("studio.marquee1"), t("studio.marquee2"), t("studio.marquee3")];
  return <div className="studio-marquee" aria-label={words.join(". ")}><div className="marquee-track" aria-hidden="true">{[0,1,2,3].map(copy => <div className="marquee-copy" key={copy}>{words.map(word => <span key={word}>{word}<i>✳</i></span>)}</div>)}</div></div>;
}
