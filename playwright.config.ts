import { defineConfig, devices } from "@playwright/test";

const port = process.env.PLAYWRIGHT_PORT ?? "3005";
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${port}`;

const reuseExistingServer = process.env.PW_REUSE_SERVER === "1";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: "list",
  use: {
    ...devices["Desktop Chrome"],
    baseURL,
  },
  ...(reuseExistingServer
    ? {}
    : {
        webServer: {
          command: "npm run build && npm run start",
          url: baseURL,
          reuseExistingServer: false,
          timeout: 180_000,
          stdout: "pipe",
          stderr: "pipe",
          env: {
            ...process.env,
            HOSTNAME: "127.0.0.1",
            PORT: port,
          },
        },
      }),
});
