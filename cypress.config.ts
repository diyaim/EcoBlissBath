const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
  },
  reporter: "mocha-junit-reporter",
  reporterOptions: {
    mochaFile: "reports/junit/test-results-[hash].xml",
    toConsole: false
  }
});
