import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Contratos de integridad de la Fase 1 (según roadmap):
 * - `projects` con owner como texto y plantilla versionada.
 * - `project_members` con unicidad (projectId, userId) y roles fijos.
 * - `project_sections` con unicidad (projectId, sectionKey) y position.
 * - Sin CHECK/FK SQL: las invariantes viven en las mutaciones y en estos tests.
 */

const domainSchemaPath = path.join(process.cwd(), "convex", "schema.ts");
const source = readFileSync(domainSchemaPath, "utf8");

describe("esquema de dominio (projects, project_members, project_sections)", () => {
  it("declara las tres tablas de la Fase 1", () => {
    for (const table of ["projects", "project_members", "project_sections"]) {
      expect(source).toMatch(new RegExp(`^  ${table}: defineTable`, "m"));
    }
  });

  it("proyectos: owner como texto (id de Better Auth) y plantilla versionada", () => {
    expect(source).toContain("ownerId: v.string()");
    expect(source).toContain("templateKey: v.string()");
    expect(source).toContain("templateVersion: v.string()");
    for (const estado of ["draft", "in_review", "ready", "archived"]) {
      expect(source).toContain(`v.literal("${estado}")`);
    }
    expect(source).not.toMatch(/BIGINT|bigserial/i);
  });

  it("proyectos: campos de aprobación y ciclo de eliminación", () => {
    for (const campo of [
      "approvedBy",
      "approvedAt",
      "deletionRequestedAt",
      "purgeAfter",
    ]) {
      expect(source).toContain(`${campo}: v.optional`);
    }
  });

  it("membresías: unicidad (projectId, userId) e índices por rol y usuario", () => {
    expect(source).toContain(
      'index("by_project_and_user", ["projectId", "userId"])',
    );
    expect(source).toContain(
      'index("by_project_and_role", ["projectId", "role"])',
    );
    expect(source).toContain('index("by_user", ["userId"])');
    for (const rol of ["owner", "editor", "reader"]) {
      expect(source).toContain(`v.literal("${rol}")`);
    }
  });

  it("secciones: claves desde la plantilla y unicidad/orden por índices", () => {
    expect(source).toContain(
      'index("by_project_and_key", ["projectId", "sectionKey"])',
    );
    expect(source).toContain(
      'index("by_project_and_position", ["projectId", "position"])',
    );

    const plantilla = readFileSync(
      path.join(process.cwd(), "convex", "projectTemplate.ts"),
      "utf8",
    );
    expect(plantilla).toContain('TEMPLATE_KEY = "base"');
    expect(plantilla).toContain('TEMPLATE_VERSION = "1.0.0"');
    for (const seccion of [
      "definition",
      "objectives",
      "requirements",
      "user_stories",
      "tasks",
      "review",
    ]) {
      expect(plantilla).toContain(`"${seccion}"`);
    }
  });

  it("membresías y secciones referencian proyectos por documento de Convex", () => {
    const referencias = source.match(/projectId: v\.id\("projects"\)/g) ?? [];

    expect(referencias).toHaveLength(2);
  });
});
