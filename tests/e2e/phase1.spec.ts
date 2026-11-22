import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, type Page, test } from "@playwright/test";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";

/**
 * E2E de la Fase 1 (roadmap): registrarse → verificar correo → crear proyecto.
 * El enlace de verificación se obtiene del buzón dev de Convex
 * (convex/devMailbox.ts, activo con ENABLE_DEV_MAILBOX=1 en el deployment).
 */

function urlDeConvex(): string {
  const envLocal = readFileSync(path.join(process.cwd(), ".env.local"), "utf8");
  const linea = envLocal
    .split(/\r?\n/)
    .find((l) => l.startsWith("NEXT_PUBLIC_CONVEX_URL="));
  const url = linea
    ?.split("=")
    .slice(1)
    .join("=")
    .trim()
    .replace(/^["']|["']$/g, "");
  if (!url) {
    throw new Error("Falta NEXT_PUBLIC_CONVEX_URL en .env.local");
  }
  return url;
}

async function enlaceDeVerificacion(
  convexUrl: string,
  email: string,
): Promise<string> {
  const cliente = new ConvexHttpClient(convexUrl);
  const objetivo = email.toLowerCase();
  for (let intento = 0; intento < 30; intento++) {
    const correo = await cliente.query(api.devMailbox.latest, {
      kind: "verification",
    });
    if (correo && correo.to.toLowerCase() === objetivo) {
      return correo.url;
    }
    await new Promise((resolver) => setTimeout(resolver, 1000));
  }
  throw new Error("No llegó el correo de verificación al buzón dev");
}

async function registrar(page: Page, email: string, password: string) {
  await page.goto("/register");
  await page.getByLabel("Nombre").fill("Ada Lovelace");
  await page.getByLabel("Correo").fill(email);
  await page.getByLabel("Contraseña").fill(password);
  await page.getByRole("button", { name: "Crear cuenta" }).click();
  await expect(page.getByText("Revisa tu correo")).toBeVisible();
}

test("Fase 1: registrarse → verificar correo → crear proyecto", async ({
  page,
  browser,
}) => {
  test.setTimeout(180_000);

  const convexUrl = urlDeConvex();
  const email = `phase1-${Date.now()}@example.com`;
  const password = "Planify#2026";

  await registrar(page, email, password);

  const enlace = await enlaceDeVerificacion(convexUrl, email);
  await page.goto(enlace);
  await expect(page.getByText("Tu correo quedó verificado")).toBeVisible();

  await page.goto("/login");
  await page.getByLabel("Correo").fill(email);
  await page.getByLabel("Contraseña").fill(password);
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(
    page.getByRole("heading", { name: "Mis proyectos" }),
  ).toBeVisible();

  // Crear el proyecto desde la plantilla
  await page.goto("/projects/new");
  await page.getByLabel("Nombre del proyecto").fill("Proyecto E2E");
  await page.getByRole("button", { name: "Crear proyecto" }).click();
  await expect(
    page.getByRole("heading", { name: "Proyecto E2E" }),
  ).toBeVisible();

  // Navegación por secciones (Definición → … → Revisión)
  for (const seccion of [
    "1. Definición",
    "2. Objetivos",
    "3. Requisitos",
    "4. Historias",
    "5. Tareas",
    "6. Revisión",
  ]) {
    await expect(page.getByText(seccion)).toBeVisible();
  }

  // Definición general del proyecto
  await page.getByLabel("Problema").fill("Los equipos pierden la trazabilidad");
  await page.getByRole("button", { name: "Guardar definición" }).click();
  await expect(page.getByText("Definición guardada.")).toBeVisible();

  // Omitir una sección opcional
  await page.getByRole("button", { name: "Omitir sección" }).first().click();
  await expect(
    page.getByRole("button", { name: "Habilitar sección" }).first(),
  ).toBeVisible();

  // Privacidad: sin sesión no se ve ni la lista ni el proyecto
  const projectId = new URL(page.url()).pathname.split("/")[2];
  const anonimo = await browser.newContext();
  const paginaAnonima = await anonimo.newPage();
  await paginaAnonima.goto("/projects");
  await expect(paginaAnonima).toHaveURL(/\/login/);
  await paginaAnonima.goto(`/projects/${projectId}`);
  await expect(paginaAnonima).toHaveURL(/\/login/);
  await anonimo.close();
});
