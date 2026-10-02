import type { Config } from "jest";
import nextJest from "next/jest.js";

// next/jest wires the compiler, stubs stylesheets, images and next/font, and keeps
// node_modules out of the transform.
const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // next/jest rewrites the alias in import specifiers but not in a jest.mock() path,
  // so the resolver needs it spelled out too.
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
};

export default createJestConfig(config);
