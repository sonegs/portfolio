import type { repositories } from "@/content";
import { profile } from "@/content";
import type { Translate } from "@/i18n";

function RepositoryList({ children }: { children: React.ReactNode }) {
  return <ul>{children}</ul>;
}

// The whole row is the link, so the pointer target matches what the eye reads as one
// thing. `.entry` is what inks the rule underneath and steps the arrow out.
function Item({ repository, t }: { repository: (typeof repositories)[number]; t: Translate }) {
  return (
    <li className="entry group relative border-b border-rule/60">
      <a
        className="grid grid-cols-12 items-baseline gap-x-6 py-5 md:py-6"
        href={`${profile.github}/${repository.name}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3 className="col-span-9 min-w-0 text-xl md:col-span-4 md:text-2xl" translate="no">
          {repository.name}
          <span aria-hidden className="arrow inline-block pl-2 text-dye">
            ↗
          </span>
        </h3>
        <span className="col-span-3 text-right text-ink-soft md:order-last md:col-span-1">{repository.year}</span>
        <p className="col-span-12 min-w-0 max-w-[48ch] pt-2 text-ink-soft md:col-span-4 md:pt-0">
          {t(`REPO_${repository.key}_DESCRIPTION`)}
        </p>
        <span className="col-span-12 pt-2 text-ink-soft md:col-span-3 md:pt-0" translate="no">
          {repository.stack}
        </span>
      </a>
    </li>
  );
}

RepositoryList.Item = Item;

export { RepositoryList };
