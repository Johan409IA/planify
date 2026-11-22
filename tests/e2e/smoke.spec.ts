import { expect, test } from "@playwright/test";

test("la portada carga cuando la app corre en local", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Planify/);
});
