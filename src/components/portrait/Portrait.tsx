import Image from "next/image";
import portrait from "@/assets/portrait.jpg";
import { profile } from "@/content";
import type { Translate } from "@/i18n";

// Square, clipped to the same hair of radius as every other box, and sized by the grid
// column it sits in. It is the LCP element, so it is preloaded rather than lazily fetched.
// `.portrait` carries the greyscale and the dye blend that put it in the palette.
function Portrait({ t }: { t: Translate }) {
  const alt = t("PORTRAIT_ALT", { name: profile.name });
  const sizes = "(min-width: 768px) 22vw, 45vw";

  return (
    <div className="portrait max-w-[12rem] border border-rule/60 md:max-w-none">
      <Image src={portrait} alt={alt} sizes={sizes} className="w-full" placeholder="blur" preload />
    </div>
  );
}

export default Portrait;
