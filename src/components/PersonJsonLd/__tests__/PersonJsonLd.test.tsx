import { PersonJsonLd } from "@/components/PersonJsonLd";
import { render } from "@testing-library/react";
import { career, profile } from "@/content";
import { getT, type Language } from "@/i18n";

type Person = {
  "@context": string;
  "@type": string;
  name: string;
  jobTitle: string;
  url: string;
  image: string;
  worksFor: { name: string };
};

function readPerson(lang: Language = "es"): Person {
  const { container } = render(<PersonJsonLd lang={lang} />);
  const script = container.querySelector('script[type="application/ld+json"]');

  return JSON.parse(script?.innerHTML ?? "{}") as Person;
}

describe("PersonJsonLd", () => {
  it("should describe a schema.org Person", () => {
    const person = readPerson();

    expect(person["@context"]).toBe("https://schema.org");
    expect(person["@type"]).toBe("Person");
    expect(person.name).toBe(profile.name);
  });

  it("should take the employer from the open-ended career row, not from a hardcoded name", () => {
    const current = career.find((entry) => entry.to === null);

    expect(readPerson().worksFor.name).toBe(getT("es")(`CAREER_${current?.key}_COMPANY`));
  });

  it("should translate the job title with the language it is given", () => {
    expect(readPerson("es").jobTitle).toBe(getT("es")("ROLE"));
    expect(readPerson("en").jobTitle).toBe(getT("en")("ROLE"));
  });

  it("should point at absolute urls, since crawlers do not resolve relative ones", () => {
    const person = readPerson();

    expect(person.url).toMatch(/^https?:\/\//);
    expect(person.image).toMatch(/^https?:\/\//);
  });

  it("should escape angle brackets so the payload cannot close its own script tag", () => {
    const { container } = render(<PersonJsonLd lang="es" />);

    expect(container.querySelector("script")?.innerHTML).not.toContain("<");
  });
});
