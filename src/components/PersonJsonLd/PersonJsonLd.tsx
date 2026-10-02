import portrait from "@/assets/portrait.jpg";
import { career, profile, skills } from "@/content";
import { getT, type Language } from "@/i18n";
import { siteUrl } from "@/site";

function PersonJsonLd({ lang }: { lang: Language }) {
  const t = getT(lang);
  // The open-ended row is the job he holds now; the others are past employers.
  const current = career.find((entry) => entry.to === null);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: t("ROLE"),
    description: t("SUMMARY"),
    email: `mailto:${profile.email}`,
    url: new URL(`/${lang}`, siteUrl).href,
    image: new URL(portrait.src, siteUrl).href,
    address: t("BASED_IN_VALUE"),
    knowsAbout: skills.map((skill) => t(skill.name)),
    sameAs: [profile.github, profile.linkedin],
    ...(current && { worksFor: { "@type": "Organization", name: t(`CAREER_${current.key}_COMPANY`) } }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
    />
  );
}

export default PersonJsonLd;
