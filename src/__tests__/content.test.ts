import { career, careerStart, education, profile, repositories, skills, testimonials } from "@/content";

describe("career", () => {
  it("should run newest first, which is the order the page trusts", () => {
    const starts = career.map((stage) => Number(stage.from));
    const descending = [...starts].sort((a, b) => b - a);

    expect(starts).toEqual(descending);
  });

  it("should leave exactly one stage open, or the timeline lights up the wrong node", () => {
    expect(career.filter((stage) => stage.to === null)).toHaveLength(1);
  });

  it("should start counting experience no later than the oldest stage", () => {
    const oldest = Math.min(...career.map((stage) => Number(stage.from)));

    expect(careerStart).toBeLessThanOrEqual(oldest);
  });
});

describe("education", () => {
  it("should run newest first, the same way the career does", () => {
    const starts = education.map((entry) => Number(entry.from));
    const descending = [...starts].sort((a, b) => b - a);

    expect(starts).toEqual(descending);
  });

  it("should never end before it starts", () => {
    for (const entry of education) {
      expect(Number(entry.to)).toBeGreaterThanOrEqual(Number(entry.from));
    }
  });
});

describe("skills", () => {
  it("should add up to a whole, or the bars lie about a proportion", () => {
    const total = skills.reduce((sum, skill) => sum + skill.percentage, 0);

    expect(total).toBe(100);
  });
});

describe("keys", () => {
  it("should keep every key unique, since each one builds a translation lookup", () => {
    const keys = [
      ...repositories.map((r) => r.key),
      ...career.map((c) => c.key),
      ...testimonials.map((t) => t.key),
      ...education.map((e) => e.key),
    ];

    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe("profile", () => {
  it("should link to real profiles, not to the root of the site", () => {
    expect(profile.github).toMatch(/github\.com\/.+/);
    expect(profile.linkedin).toMatch(/linkedin\.com\/in\/.+/);
  });
});
