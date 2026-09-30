import type { Config } from "jest";
import nextJest from "next/jest.js";

// next/jest wires the compiler, stubs stylesheets, images and next/font, and keeps
// node_modules out of the transform.
const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
