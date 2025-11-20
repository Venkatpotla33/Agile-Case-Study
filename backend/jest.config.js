export default {
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".js"],
  moduleFileExtensions: ["js", "json"],
  roots: ["<rootDir>/src"],
  coveragePathIgnorePatterns: ["/node_modules/", "/src/scripts/"],
};

