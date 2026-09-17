module.exports = function () {
  return {
    autoDetect: true,
    files: {
      override: (filePatterns) => [
        ...filePatterns,
        "packages/ui/src/**/*.{ts,tsx}",
        "packages/ui/vitest.setup.ts",
        "packages/ui/src/styles.css",
        "!packages/ui/src/**/*.test.{ts,tsx}",
      ],
    },
    tests: {
      override: () => ["packages/ui/src/**/*.test.{ts,tsx}"],
    },
    testFramework: {
      configFile: "./packages/ui/vitest.wallaby.config.ts",
    },
  };
};
