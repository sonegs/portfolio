import type { career } from "@/content";
import type { Translate } from "@/i18n";

function CareerTimeline({ children }: { children: React.ReactNode }) {
  return <ol className="timeline pt-8">{children}</ol>;
}

function Entry({ stage, t }: { stage: (typeof career)[number]; t: Translate }) {
  return (
    <li className="grid grid-cols-12 gap-x-6 pb-10 last:pb-0" data-current={stage.to === null}>
      <span className="label col-span-12 pt-[0.15rem] text-[0.68rem] text-ink-soft md:col-span-3">
        {stage.from} — {stage.to ?? t("TODAY")}
      </span>
      <h3 className="col-span-12 pt-2 text-xl md:col-span-4 md:pt-0 md:text-2xl">
        {t(`CAREER_${stage.key}_ROLE`)}
        <span className="block text-base text-ink-soft md:text-lg">{t(`CAREER_${stage.key}_COMPANY`)}</span>
      </h3>
      <p className="col-span-12 min-w-0 max-w-[48ch] pt-2 text-ink-soft md:col-span-5 md:pt-0">
        {t(`CAREER_${stage.key}_DETAIL`)}
      </p>
    </li>
  );
}

CareerTimeline.Entry = Entry;

export { CareerTimeline };
