import { test, expect, type Page } from "@playwright/test";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";

// Las credenciales y los objetos se crean para cada ejecución; no se usa la demo.
test.describe.configure({ mode: "serial" });
let admin: SupabaseClient;
let moderator: SupabaseClient;
let member: SupabaseClient;
let local: { API_URL: string; ANON_KEY: string; SERVICE_ROLE_KEY: string };
const password = randomUUID();
const accounts: { id: string; email: string }[] = [];
const reportIds: string[] = [];
const club = randomUUID();
const season = randomUUID();
const challenge = randomUUID();
const participant = randomUUID();
const message = randomUUID();
const photoPath = `${participant}/evidence.png`;
const otherPath = `${participant}/not-reported.png`;
let collageReport: string;
let messageReport: string;
let profileReport: string;

function check<T extends { error: unknown }>(result: T): T {
  if (result.error) throw new Error(`Fallo del fixture local: ${JSON.stringify(result.error)}`);
  return result;
}

test.beforeAll(async () => {
  local = JSON.parse(execFileSync("supabase", ["status", "--output", "json"], {
    cwd: resolve(process.cwd(), "../color-club"), encoding: "utf8", stdio: ["ignore", "pipe", "ignore"],
  }));
  if (local.API_URL !== "http://127.0.0.1:55321") throw new Error("Solo se permiten pruebas locales.");
  admin = createClient(local.API_URL, local.SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  for (const role of ["moderator", "member", "support", "owner", "inactive"]) {
    const email = `moderation-${role}-${randomUUID()}@example.test`;
    const { data } = check(await admin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { display_name: "Prueba de moderación" } }));
    accounts.push({ id: data.user!.id, email });
    if (role !== "member") check(await admin.from("platform_admins").insert({ user_id: data.user!.id, role: role === "inactive" ? "owner" : role, status: role === "inactive" ? "inactive" : "active" }));
  }
  moderator = createClient(local.API_URL, local.ANON_KEY, { auth: { persistSession: false } });
  member = createClient(local.API_URL, local.ANON_KEY, { auth: { persistSession: false } });
  check(await moderator.auth.signInWithPassword({ email: accounts[0].email, password }));
  check(await member.auth.signInWithPassword({ email: accounts[1].email, password }));
  check(await admin.from("clubs").insert({ id: club, name: "Moderación local", admin_id: accounts[1].id }));
  check(await admin.from("seasons").insert({ id: season, club_id: club }));
  check(await admin.from("challenges").insert({ id: challenge, club_id: club, season_id: season, mode: "shared_color", shared_color: "#3A8D67", duration_preset: "24h", starts_at: new Date(Date.now() - 3600000).toISOString(), ends_at: new Date(Date.now() + 3600000).toISOString(), voting_ends_at: new Date(Date.now() + 7200000).toISOString(), status: "voting", created_by: accounts[1].id }));
  check(await admin.from("challenge_participants").insert({ id: participant, challenge_id: challenge, user_id: accounts[1].id, status: "submitted" }));
  check(await admin.from("photos").insert({ participant_id: participant, photo_url: photoPath, slot_order: 1 }));
  check(await admin.from("club_messages").insert({ id: message, club_id: club, sender_id: accounts[1].id, body: "Mensaje de evidencia local" }));
  const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aZ1sAAAAASUVORK5CYII=", "base64");
  for (const path of [photoPath, otherPath]) check(await admin.storage.from("collages").upload(path, png, { contentType: "image/png" }));
  for (const [subject_type, subject_id, content_snapshot] of [
    ["collage", participant, { photos: [photoPath] }],
    ["club_message", message, { body: "Mensaje de evidencia local", club_id: club }],
    ["profile", null, { display_name: "Prueba" }],
  ] as const) {
    const id = randomUUID(); reportIds.push(id);
    check(await admin.from("user_reports").insert({ id, reporter_id: accounts[0].id, reported_user_id: accounts[1].id, subject_type, subject_id, reason: "privacy", details: "Caso sintético para pruebas locales", content_snapshot }));
  }
  [collageReport, messageReport, profileReport] = reportIds;
});

test.afterAll(async () => {
  if (!admin) return;
  // Borrados estrictamente limitados a los identificadores creados por este arnés.
  check(await admin.storage.from("collages").remove([photoPath, otherPath]));
  check(await admin.from("account_deletion_cleanup").delete().in("deletion_id", reportIds));
  check(await admin.from("platform_admin_audit_log").delete().in("resource_id", reportIds));
  check(await admin.from("user_reports").delete().in("id", reportIds));
  check(await admin.from("clubs").delete().eq("id", club));
  for (const account of accounts) check(await admin.auth.admin.deleteUser(account.id));
});

async function login(page: Page, index = 0) {
  await page.goto("/internal-admin/login");
  await page.getByLabel("Email").fill(accounts[index].email);
  await page.getByLabel("Contraseña").fill(password);
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page).not.toHaveURL(/\/login$/);
}

test("anónimo, miembro y soporte no acceden a denuncias", async ({ page }) => {
  await page.goto("/internal-admin/reports");
  await expect(page).toHaveURL(/\/login$/);
  for (const index of [1, 2, 4]) {
    await login(page, index);
    await expect(page.getByText("Tu cuenta no tiene acceso a las denuncias.")).toBeVisible();
    const response = await page.goto(`/internal-admin/reports/${collageReport}`);
    expect(response?.status()).toBe(404);
    await page.goto("/internal-admin");
    await page.getByRole("button", { name: "Salir" }).click();
    await expect(page).toHaveURL(/\/login$/);
  }
});

test("RLS aísla evidencia, revisiones y acceso directo", async () => {
  expect(check(await member.from("user_reports").select("id")).data).toEqual([]);
  expect((await member.rpc("admin_review_report", { target_report_id: collageReport, expected_revision: 0, next_status: "reviewing", decision_note: "No autorizado" })).error?.code).toBe("42501");
  expect((await moderator.storage.from("collages").createSignedUrl(photoPath, 60)).error).toBeNull();
  expect((await moderator.storage.from("collages").createSignedUrl(otherPath, 60)).error).toBeTruthy();
  expect((await moderator.from("user_reports").update({ status: "actioned" }).eq("id", collageReport)).error).toBeTruthy();
});

test("el moderador filtra, ve evidencia y registra revisión", async ({ page }, testInfo) => {
  await login(page);
  await expect(page).toHaveURL(/\/reports$/);
  await expect(page.getByRole("link", { name: "Páginas y SEO" })).toHaveCount(0);
  await page.getByLabel("Contenido", { exact: true }).selectOption("collage");
  await page.getByRole("button", { name: "Filtrar casos" }).click();
  await page.getByRole("link", { name: `Revisar caso ${collageReport.slice(0, 8)}` }).click();
  const response = await page.request.get(`/internal-admin/reports/${collageReport}`);
  expect(response.headers()["cache-control"]).toContain("no-store");
  const image = page.getByRole("img", { name: "Fotografía denunciada 1" });
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
  await page.screenshot({ path: testInfo.outputPath("moderation-detail.png"), fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  if (testInfo.project.name === "mobile") {
    await page.setViewportSize({ width: 320, height: 740 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await expect(page.getByRole("button", { name: "Salir" })).toBeInViewport();
  }
  await page.getByLabel("Motivo de la decisión").fill("Revisión de evidencia iniciada");
  await page.getByRole("button", { name: "Guardar decisión" }).click();
  await expect(page.getByText("Decisión registrada y auditada.")).toBeVisible();
  await expect(page.getByText("En revisión", { exact: true })).toBeVisible();
  const { data } = check(await admin.from("platform_admin_audit_log").select("id").eq("resource_id", collageReport));
  expect(data).toHaveLength(1);
});

test("retirada explícita elimina contenido lógico y audita sin fingir borrado físico", async ({ page }) => {
  await login(page);
  await page.goto(`/internal-admin/reports/${collageReport}`);
  await page.getByLabel("Acción", { exact: true }).selectOption("remove");
  await expect(page.getByText("Retirada irreversible", { exact: true })).toBeVisible();
  await page.getByLabel("Motivo de la decisión").fill("Retirada de evidencia sintética de prueba");
  await page.getByRole("button", { name: "Confirmar retirada" }).click();
  await expect(page.getByText("Caso cerrado", { exact: true })).toHaveCount(0);
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Confirmar retirada" }).click();
  await expect(page.getByText("Caso cerrado", { exact: true })).toBeVisible();
  await expect(page.getByText("Acceso excepcional a fotografías cerrado.", { exact: false })).toBeVisible();
  expect(check(await admin.from("photos").select("id").eq("participant_id", participant)).data).toEqual([]);
  expect(check(await admin.from("account_deletion_cleanup").select("id").eq("deletion_id", collageReport).eq("ready", true)).data).toHaveLength(1);
  expect(check(await admin.from("platform_admin_audit_log").select("id").eq("resource_id", collageReport)).data).toHaveLength(2);
  expect((await moderator.storage.from("collages").createSignedUrl(photoPath, 60)).error).toBeTruthy();
});

test("conflicto concurrente no sobrescribe y descarte cierra sin borrar mensaje", async ({ page }) => {
  await login(page);
  await page.goto(`/internal-admin/reports/${messageReport}`);
  check(await moderator.rpc("admin_review_report", { target_report_id: messageReport, expected_revision: 0, next_status: "reviewing", decision_note: "Revisión desde otra sesión" }));
  await page.getByLabel("Acción", { exact: true }).selectOption("dismissed");
  await page.getByLabel("Motivo de la decisión").fill("Mensaje permitido por las normas");
  await page.getByRole("button", { name: "Guardar decisión" }).click();
  await expect(page.locator(".report-resolution [role='alert']")).toContainText("ha cambiado", { timeout: 20_000 });
  await page.reload();
  await page.getByLabel("Acción", { exact: true }).selectOption("dismissed");
  await page.getByLabel("Motivo de la decisión").fill("Mensaje permitido por las normas");
  await page.getByRole("button", { name: "Guardar decisión" }).click();
  await expect(page.getByText("Caso cerrado", { exact: true })).toBeVisible();
  expect(check(await admin.from("club_messages").select("id").eq("id", message)).data).toHaveLength(1);
  await page.getByRole("button", { name: "Salir" }).click();
  await expect(page).toHaveURL(/\/login$/);
  await page.goto(`/internal-admin/reports/${profileReport}`);
  await expect(page).toHaveURL(/\/login$/);
});

test("owner accede a moderación y la paginación mantiene filtros", async ({ page }) => {
  await login(page, 3);
  await expect(page).toHaveURL(/\/site-content$/);
  const extra = Array.from({ length: 21 }, () => ({ id: randomUUID(), subject_type: "profile", reason: "privacy", details: "Paginación sintética local" }));
  reportIds.push(...extra.map((item) => item.id));
  check(await admin.from("user_reports").insert(extra));
  await page.goto("/internal-admin/reports?status=open&subject=profile");
  await page.getByRole("link", { name: "Siguiente →" }).click();
  await expect(page).toHaveURL(/status=open&subject=profile&page=2/);
  await expect(page.getByText("Página 2 de 2")).toBeVisible();
  await page.getByRole("link", { name: "← Anterior" }).click();
  await expect(page).toHaveURL(/page=1/);
});

test("la invitación vuelve desde la portada y permite elegir contraseña", async ({ page }) => {
  const email = `moderation-invite-${randomUUID()}@example.test`;
  const { data } = check(await admin.auth.admin.generateLink({ type: "invite", email, options: { data: { display_name: "Moderador invitado" } } }));
  accounts.push({ id: data.user.id, email });
  check(await admin.from("platform_admins").insert({ user_id: data.user.id, role: "moderator" }));
  const client = createClient(local.API_URL, local.ANON_KEY, { auth: { persistSession: false } });
  const { data: verified } = check(await client.auth.verifyOtp({ token_hash: data.properties.hashed_token, type: "invite" }));
  const session = verified.session!;
  // Simula el fragmento del retorno de Supabase con una sesión exclusivamente local.
  const hash = new URLSearchParams({ type: "invite", access_token: session.access_token, refresh_token: session.refresh_token, expires_in: "3600", token_type: "bearer" });
  await page.goto(`/#${hash}`);
  await expect(page).toHaveURL(/\/internal-admin\/accept-invite$/);
  await expect(page.getByLabel("Nueva contraseña")).toBeVisible();
  const newPassword = randomUUID();
  await page.getByLabel("Nueva contraseña").fill(newPassword);
  await page.getByLabel("Repite la contraseña").fill(newPassword);
  await page.getByRole("button", { name: "Guardar y entrar" }).click();
  await expect(page).toHaveURL(/\/reports$/);
  await page.getByRole("button", { name: "Salir" }).click();
  await expect(page).toHaveURL(/\/login$/);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Contraseña").fill(newPassword);
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page).toHaveURL(/\/reports$/);
});
