const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportHeight: 1000,
    viewportWidth: 1920,
    blockHosts: ["*mc.yandex.ru"],
    baseUrl:"https://login.qa.studio"
  },
});

// Все параметры конфига: https://docs.cypress.io/guides/references/configuration
