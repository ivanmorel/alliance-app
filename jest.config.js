module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["js"],
  transform: {
    "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
  },
  testRegex: "(\\.(e2e|test|spec))\\.(ts|tsx|js)$",
  transformIgnorePatterns: [
    "/node_modules/(?!(@react-native|react-native)).*/",
  ],
  setupFiles: ["./e2e/mocks.js"],
  setupFilesAfterEnv: ["./e2e/init.js"],
  cacheDirectory: ".jest/cache",
  testTimeout: 60000,
};
