import { defineConfig, devices } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

// Este arnés solo admite el Docker local de Color Club, nunca un proyecto remoto.
const local = JSON.parse(execFileSync("supabase", ["status", "--output", "json"], {
  cwd: resolve(process.cwd(), "../color-club"), encoding: "utf8", stdio: ["ignore", "pipe", "ignore"],
}));
if (local.API_URL !== "http://127.0.0.1:55321") throw new Error("Se requiere el Docker local de Color Club en 55321.");

export default defineConfig({
  testDir: "./e2e",
  testMatch: "moderation.spec.ts",
  workers: 1,
  timeout: 60_000,
  use: { baseURL: "http://127.0.0.1:3011", trace: "retain-on-failure" },
  webServer: {
    command: "npm run build && npm run start -- --hostname 127.0.0.1 --port 3011",
    url: "http://127.0.0.1:3011",
    reuseExistingServer: false,
    timeout: 120_000,
    env: { NEXT_PUBLIC_SUPABASE_URL: local.API_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY: local.ANON_KEY },
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 13"], browserName: "chromium" } },
  ],
});
