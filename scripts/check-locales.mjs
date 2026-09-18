// i18next returns the key itself when it is missing, so a mistake shows up on the
// page and not in the build. This check catches it: both languages holding the same
// keys, and every key the data builds from a template actually translated.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { career, careInstructions, composition, repositories } from "../src/content.ts";

const localesDir = "public/locales";
const languages = readdirSync(localesDir);
const messages = Object.fromEntries(
  languages.map((language) => [
    language,
    Object.keys(JSON.parse(readFileSync(join(localesDir, language, "common.json"), "utf8"))),
  ]),
);

const sources = readdirSync("src", { recursive: true })
  .filter((file) => /\.tsx?$/.test(file))
  .map((file) => readFileSync(join("src", file), "utf8"))
  .join("\n");

const isKey = (value) => /^[A-Z][A-Z_]*$/.test(value);

const used = [
  ...[...sources.matchAll(/\bt\("([^"]+)"/g)].map(([, key]) => key),
  ...repositories.map((repository) => `REPO_${repository.key}_DESCRIPTION`),
  ...career.flatMap((stage) => [
    `CAREER_${stage.key}_ROLE`,
    `CAREER_${stage.key}_COMPANY`,
    `CAREER_${stage.key}_DETAIL`,
  ]),
  ...composition.map((item) => item.material).filter(isKey),
  ...careInstructions,
];

const [reference, ...rest] = languages;
const problems = [
  ...rest.flatMap((language) => [
    ...messages[reference]
      .filter((key) => !messages[language].includes(key))
      .map((key) => `${language}: missing ${key}`),
    ...messages[language]
      .filter((key) => !messages[reference].includes(key))
      .map((key) => `${reference}: missing ${key}`),
  ]),
  ...[...new Set(used)]
    .filter((key) => isKey(key) && !messages[reference].includes(key))
    .map((key) => `src uses ${key} and it is not translated`),
];

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`${messages[reference].length} keys x ${languages.length} languages: ok`);
