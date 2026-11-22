import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Contratos de integridad de la Fase 0 (según roadmap):
 * - Las tablas de identidad son las generadas por Better Auth.
 * - No existe una tabla `users` paralela.
 * - Las FK de identidad son texto (v.string), nunca BIGINT.
 * - No quedan restos de Drizzle ni de SQL manual.
 */

const authSchemaPath = path.join(
  process.cwd(),
  "convex",
  "betterAuth",
  "schema.ts",
);
const convexConfigPath = path.join(process.cwd(), "convex", "convex.config.ts");

describe("esquema de identidad (Better Auth × Convex)", () => {
  it("declara las tablas de identidad generadas por Better Auth", () => {
    const source = readFileSync(authSchemaPath, "utf8");

    for (const table of ["user", "session", "account", "verification"]) {
      expect(source).toMatch(new RegExp(`^  ${table}: defineTable`, "m"));
    }
  });

  it("no define una tabla users paralela", () => {
    const source = readFileSync(authSchemaPath, "utf8");

    expect(source).not.toMatch(/^ {2}users: defineTable/m);
  });

  it("usa IDs de tipo texto para las FK de identidad", () => {
    const source = readFileSync(authSchemaPath, "utf8");

    expect(source).toContain("userId: v.string()");
    expect(source).not.toMatch(/BIGINT|bigserial/i);
  });

  it("registra el componente betterAuth en la app de Convex", () => {
    const source = readFileSync(convexConfigPath, "utf8");

    expect(source).toContain("app.use(betterAuth)");
  });

  it("no queda ningún archivo de Drizzle ni de esquema SQL manual", () => {
    for (const segments of [
      ["convex", "schema.ts"],
      ["drizzle.config.ts"],
    ] as const) {
      expect(existsSync(path.join(process.cwd(), ...segments))).toBe(false);
    }
  });
});
