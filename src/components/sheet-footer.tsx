import { InlineLink } from "@/components/inline-link";
import { Rule } from "@/components/rule";
import { profile } from "@/content";
import type { Translate } from "@/i18n";

export function SheetFooter({ t }: { t: Translate }) {
  const links = [
    { text: t("LINK_EMAIL"), url: `mailto:${profile.email}` },
    { text: "GitHub", url: profile.github },
    { text: "LinkedIn", url: profile.linkedin },
  ];

  return (
    <footer className="pt-24 md:pt-32">
      <Rule delay={80} />
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 pt-5">
        <p className="display text-[clamp(2rem,7vw,4.5rem)]">{t("LETS_TALK")}</p>
        <ul className="flex flex-wrap gap-x-8 gap-y-2 text-lg">
          {links.map((link) => (
            <li key={link.text}>
              <InlineLink href={link.url}>{link.text}</InlineLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
