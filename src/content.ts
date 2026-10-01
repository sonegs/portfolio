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

// First year of professional work: the header counts the years from here.
export const careerStart = 2020;

export const repositories = [
  { key: "SHOPPING_LIST", name: "shopping-list", stack: "Next.js · TypeScript", year: "2026" },
  { key: "CV_APP", name: "nextjs-cv-app", stack: "Next.js · TypeScript", year: "2024" },
  { key: "WARDROBE", name: "react_wardrobe", stack: "React · SASS · Cypress", year: "2022" },
  { key: "DRONES", name: "traffic-drones", stack: "React · JavaScript", year: "2021" },
];

export const testimonials = [{ key: "JESUS_CORTES", name: "Jesus Cortes Cruz", role: "Senior Frontend Engineer" }];

export const career = [
  { key: "MAYORAL", from: "2022", to: null },
  { key: "PYMES", from: "2020", to: "2022" },
];

export const education = [
  { key: "MASTER_FRONTEND", school: "Lemoncoders", from: "2021", to: "2022" },
  { key: "JS_BOOTCAMP", school: "Lemoncoders", from: "2020", to: "2020" },
  { key: "TESTING", school: "Tatianna Nieves Course", from: "2019", to: "2019" },
  { key: "DAW", school: "ILERNA FP Online", from: "2018", to: "2020" },
  { key: "SMR", school: "IES Virgen del Carmen", from: "2008", to: "2010" },
];

export const composition = [
  { material: "React / Next.js", percentage: 60 },
  { material: "TypeScript", percentage: 25 },
  { material: "PHP / MySQL", percentage: 10 },
  { material: "Angular", percentage: 5 },
];

export const careInstructions = ["CARE_ACCESSIBILITY", "CARE_DEPENDENCIES", "CARE_REVIEW", "CARE_MOTION"];
