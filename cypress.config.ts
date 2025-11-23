import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on(
        "before:browser:launch",
        (browser: any, launchOptions: any) => {
          if (browser.family === "chromium") {
            launchOptions.args.push("--disable-password-manager");
            launchOptions.args.push("--disable-save-password-bubble");
            launchOptions.args.push("--disable-features=PasswordManager");
          }
          return launchOptions;
        }
      );
    },
  },
});