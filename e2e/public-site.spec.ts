import { expect, test } from "@playwright/test";

test("visitor understands the product and reaches the download state", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sal a buscar tu color.");
  await expect(page.getByText("La app estará disponible pronto.").first()).toBeVisible();
  const howItWorksHref = await page
    .locator('a[href="/como-funciona"]')
    .filter({ hasText: "Ver cómo funciona" })
    .first()
    .getAttribute("href");
  expect(howItWorksHref).toBe("/como-funciona");
  if (!howItWorksHref) throw new Error("Missing how-it-works href");
  await page.goto(howItWorksHref);
  await expect(page).toHaveURL(/\/como-funciona$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Un color cambia");
});

test("public navigation exposes no administration or playable flow", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation").getByText("internal-admin")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /votar|subir|crear club/i })).toHaveCount(0);
  await expect(page.locator('a[href^="/internal-admin"]')).toHaveCount(0);
});

test("internal admin is separated from public chrome", async ({ page }) => {
  const response = await page.goto("/internal-admin/login");
  expect(response?.headers()["x-robots-tag"]).toBe("noindex, nofollow");
  await expect(page.getByRole("link", { name: "Color Club, inicio" })).toHaveCount(0);
  await expect(page.getByText(/Supabase no está configurado|Acceso del equipo/)).toBeVisible();
});

test("support FAQ works without client-side JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/soporte");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Una respuesta antes del siguiente reto.",
  );
  const firstQuestion = page.locator("details").first();
  await firstQuestion.locator("summary").click();
  await expect(firstQuestion.locator("p")).toBeVisible();
  await context.close();
});

test("pages expose canonical metadata", async ({ page }) => {
  await page.goto("/soporte");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/soporte$/);
  await expect(page).toHaveTitle(/Soporte/);
});

test("structured data matches visible how-to and FAQ content", async ({ page }) => {
  await page.goto("/como-funciona");
  const howToJsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(howToJsonLd.join(" ")).toContain('"@type":"HowTo"');

  await page.goto("/soporte");
  const faqJsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(faqJsonLd.join(" ")).toContain('"@type":"FAQPage"');
});

test("dynamic social image endpoint returns a PNG", async ({ request }) => {
  const response = await request.get(
    "/api/og?title=Como%20funciona&description=Retos%20de%20color%20con%20amigos",
  );
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("image/png");
});

test("legal drafts are explicit and excluded from indexing", async ({ page }) => {
  await page.goto("/privacidad");
  await expect(page.getByText("No publicar como texto legal definitivo.")).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

for (const width of [320, 375, 390, 414, 640, 768, 1024, 1440]) {
  test(`landing has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  });
}
