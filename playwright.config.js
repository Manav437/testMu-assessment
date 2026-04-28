const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
    testDir: "./tests",

    fullyParallel: true,
    workers: 2,

    timeout: 60000,

    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },

        actionTimeout: 15000,
        navigationTimeout: 30000,
    },

    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
});
