import { afterEach, describe, expect, it, vi } from "vitest";

const publicEnvKeys = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_APP_STORE_URL",
  "NEXT_PUBLIC_PLAY_STORE_URL",
  "NEXT_PUBLIC_WAITLIST_URL",
] as const;

afterEach(() => {
  for (const key of publicEnvKeys) delete process.env[key];
  vi.resetModules();
});

describe("public configuration", () => {
  it("does not create fake store links when no URL is configured", async () => {
    const { getDownloadOptions } = await import("@/lib/site");
    expect(getDownloadOptions()).toEqual([]);
  });

  it("uses the waitlist only when stores are unavailable", async () => {
    process.env.NEXT_PUBLIC_WAITLIST_URL = "https://example.com/waitlist";
    const { getDownloadOptions } = await import("@/lib/site");
    expect(getDownloadOptions()).toEqual([
      {
        href: "https://example.com/waitlist",
        label: "Avisadme cuando esté lista",
        store: "waitlist",
      },
    ]);
  });

  it("prioritises real store links over the waitlist", async () => {
    process.env.NEXT_PUBLIC_APP_STORE_URL = "https://apps.apple.com/example";
    process.env.NEXT_PUBLIC_PLAY_STORE_URL = "https://play.google.com/store/apps/example";
    process.env.NEXT_PUBLIC_WAITLIST_URL = "https://example.com/waitlist";
    const { getDownloadOptions } = await import("@/lib/site");
    expect(getDownloadOptions()).toHaveLength(2);
    expect(getDownloadOptions().map((option) => option.store)).toEqual([
      "app-store",
      "play-store",
    ]);
  });
});
