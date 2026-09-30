import { InlineLink } from "@/components/common";
import { Rule } from "@/components/common";
import { profile } from "@/content";
import type { Translate } from "@/i18n";

function SheetFooter({ t }: { t: Translate }) {
  const year = new Date().getFullYear();
  const copyright = t("COPYRIGHT", { year, name: profile.name });
  const links = [
    { text: t("LINK_EMAIL"), url: `mailto:${profile.email}` },
    { text: "GitHub", url: profile.github },
    { text: "LinkedIn", url: profile.linkedin },
  ];

  return (
    <footer className="pt-24 md:pt-32">
      <Rule delay={80} />
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 pt-5">
        <p className="label text-[0.68rem] text-ink-soft">{copyright}</p>
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

export default SheetFooter;
