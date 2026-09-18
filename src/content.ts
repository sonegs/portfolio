// Data that is never translated: proper nouns, dates, technologies and percentages.
// The copy lives in public/locales/<language>/common.json.
// Convention: a value in SCREAMING_SNAKE_CASE is a translation key.

export const profile = {
  name: "Miguel Cobo Martínez",
  email: "sonegs@hotmail.com",
  github: "https://github.com/sonegs",
  linkedin: "https://www.linkedin.com/in/miguelcobomartinez",
  focus: "React · TypeScript · Next.js",
};

// First year of professional work: the header renders it as a count of years.
export const careerStart = 2016;

export const repositories = [
  { key: "SHOPPING_LIST", name: "shopping-list", stack: "Next.js · TypeScript", year: "2026" },
  { key: "CV_APP", name: "nextjs-cv-app", stack: "Next.js · TypeScript", year: "2024" },
  { key: "WARDROBE", name: "react_wardrobe", stack: "React · SASS · Cypress", year: "2022" },
  { key: "DRONES", name: "traffic-drones", stack: "React · JavaScript", year: "2021" },
];

export const career = [
  { key: "SENIOR", from: "2023", to: null },
  { key: "MAYORAL", from: "2019", to: "2023" },
  { key: "AGENCY", from: "2016", to: "2019" },
];

export const composition = [
  { material: "React / Next.js", percentage: 45 },
  { material: "TypeScript", percentage: 25 },
  { material: "Angular / Ionic", percentage: 15 },
  { material: "Node", percentage: 10 },
  { material: "COMPOSITION_OTHER", percentage: 5 },
];

export const careInstructions = ["CARE_ACCESSIBILITY", "CARE_DEPENDENCIES", "CARE_REVIEW", "CARE_MOTION"];
