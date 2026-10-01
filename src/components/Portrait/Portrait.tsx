import Image from "next/image";
import portrait from "@/assets/portrait.jpg";
import { profile } from "@/content";
import { getT, type Language } from "@/i18n";

function Portrait({ lang }: { lang: Language }) {
  const t = getT(lang);

  return (
    <div className="portrait max-w-[12rem] border border-rule/60 md:max-w-none">
      <Image
        src={portrait}
        alt={t("PORTRAIT_ALT", { name: profile.name })}
        sizes="(min-width: 768px) 22vw, 45vw"
        className="w-full"
        placeholder="blur"
        preload
      />
    </div>
  );
}

export default Portrait;
