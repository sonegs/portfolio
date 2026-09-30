import Image from "next/image";
import portrait from "@/assets/portrait.jpg";
import { profile } from "@/content";
import type { Translate } from "@/i18n";

// Square and square-cornered like the rest of the sheet, sized by the grid column it
// sits in. It is the LCP element, so it is preloaded rather than lazily fetched.
export function Portrait({ t }: { t: Translate }) {
  return (
    <Image
      src={portrait}
      alt={t("PORTRAIT_ALT", { name: profile.name })}
      sizes="(min-width: 768px) 22vw, 45vw"
      className="w-full max-w-[12rem] border border-rule/60 md:max-w-none"
      placeholder="blur"
      preload
    />
  );
}
