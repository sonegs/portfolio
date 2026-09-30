import type { career } from "@/content";
import type { Translate } from "@/i18n";

function CareerTimeline({ children }: { children: React.ReactNode }) {
  return <ol className="timeline pt-8">{children}</ol>;
}

function Entry({ stage, t }: { stage: (typeof career)[number]; t: Translate }) {
  const isCurrent = stage.to === null;
  const period = `${stage.from} — ${stage.to ?? t("TODAY")}`;
  const role = t(`CAREER_${stage.key}_ROLE`);
  const company = t(`CAREER_${stage.key}_COMPANY`);
  const paragraphs = t(`CAREER_${stage.key}_DETAIL`).split("\n\n");

  return (
    <li className="grid grid-cols-12 gap-x-6 pb-10 last:pb-0" data-current={isCurrent}>
      <span className="label col-span-12 pt-[0.15rem] text-[0.68rem] text-ink-soft md:col-span-3">{period}</span>
      <h3 className="col-span-12 pt-2 text-xl md:col-span-4 md:pt-0 md:text-2xl">
        {role}
        <span className="block text-base text-ink-soft md:text-lg">{company}</span>
      </h3>
      <div className="col-span-12 min-w-0 max-w-[48ch] space-y-3 pt-2 text-ink-soft md:col-span-5 md:pt-0">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </li>
  );
}

CareerTimeline.Entry = Entry;

export { CareerTimeline };
