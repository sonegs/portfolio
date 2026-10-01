import { InlineLink } from "@/components/InlineLink";
import { Rule } from "@/components/Rule";
import { profile } from "@/content";
import { getT, type Language } from "@/i18n";

function SheetFooter({ lang }: { lang: Language }) {
  const t = getT(lang);
  const links = [
    { text: t("LINK_EMAIL"), url: `mailto:${profile.email}` },
    { text: "GitHub", url: profile.github },
    { text: "LinkedIn", url: profile.linkedin },
  ];

  return (
    <footer className="pt-24 md:pt-32">
      <Rule delay={80} />
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 pt-5">
        <p className="label text-[0.68rem] text-ink-soft">
          {t("COPYRIGHT", { year: new Date().getFullYear(), name: profile.name })}
        </p>
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
