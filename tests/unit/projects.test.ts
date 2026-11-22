/// <reference types="vite/client" />
// @vitest-environment edge-runtime

import { register } from "@convex-dev/better-auth/test";
import { convexTest } from "convex-test";
import { describe, expect, it } from "vitest";
import { api } from "../../convex/_generated/api";
import schema from "../../convex/schema";

/**
 * Integridad de la Fase 1 (según roadmap):
 * - No se crea un proyecto con propietario inexistente.
 * - Como máximo un `owner` por proyecto.
 * - `projects.ownerId` coincide con la membresía `owner` tras crear.
 * - Secciones según plantilla; las obligatorias no se deshabilitan.
 * - Privacidad: sin sesión ni membresía no hay acceso.
 */

const MODULES = import.meta.glob("../../convex/**/*.*s");

function entorno() {
  const t = convexTest(schema, MODULES);
  const auth = register(t);

  async function crearUsuario(email: string, name = "Ada Lovelace") {
    const now = Date.now();
    const user = await t.mutation(auth.adapter.create, {
      input: {
        model: "user",
        data: {
          name,
          email,
          emailVerified: true,
          createdAt: now,
          updatedAt: now,
        },
      },
    });
    const session = await t.mutation(auth.adapter.create, {
      input: {
        model: "session",
        data: {
          token: `token-${email}`,
          expiresAt: now + 3_600_000,
          createdAt: now,
          updatedAt: now,
          userId: user._id,
        },
      },
    });
    return { user, session };
  }

  function sesionDe(user: { _id: string }, session: { _id: string }) {
    return t.withIdentity({ subject: user._id, sessionId: session._id });
  }

  return { t, auth, crearUsuario, sesionDe };
}

async function crearProyectoDeEjemplo() {
  const entornoActual = entorno();
  const { user, session } = await entornoActual.crearUsuario("ada@example.com");
  const caller = entornoActual.sesionDe(user, session);
  const projectId = await caller.mutation(api.projects.createFromTemplate, {
    name: "Gestor de prácticas",
    description: "Proyecto de ejemplo",
  });
  return { ...entornoActual, user, session, caller, projectId };
}

describe("Fase 1: creación de proyectos desde plantilla", () => {
  it("sincroniza projects.ownerId con la membresía owner y copia las secciones", async () => {
    const { t, caller, projectId, user } = await crearProyectoDeEjemplo();

    const detalle = await caller.query(api.projects.getById, { projectId });
    expect(detalle?.project.ownerId).toBe(user._id);
    expect(detalle?.project.status).toBe("draft");
    expect(detalle?.project.templateKey).toBe("base");
    expect(detalle?.project.templateVersion).toBe("1.0.0");
    expect(detalle?.role).toBe("owner");

    const membresias = await t.run(async (ctx) =>
      ctx.db
        .query("project_members")
        .withIndex("by_project_and_user", (q) => q.eq("projectId", projectId))
        .collect(),
    );
    expect(membresias).toHaveLength(1);
    expect(membresias[0]?.role).toBe("owner");
    expect(membresias[0]?.userId).toBe(user._id);

    const secciones = detalle?.sections ?? [];
    expect(secciones.map((s) => s.sectionKey)).toEqual([
      "definition",
      "objectives",
      "requirements",
      "user_stories",
      "tasks",
      "review",
    ]);
    expect(secciones.every((s) => s.isEnabled)).toBe(true);
    expect(
      secciones.filter((s) => s.isRequired).map((s) => s.sectionKey),
    ).toEqual(["definition", "review"]);
    expect(secciones.map((s) => s.position)).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("no crea un proyecto con propietario inexistente y no deja datos a medias", async () => {
    const { t, auth, crearUsuario } = entorno();
    await crearUsuario("ada@example.com");

    const now = Date.now();
    const sesionFantasma = await t.mutation(auth.adapter.create, {
      input: {
        model: "session",
        data: {
          token: "token-fantasma",
          expiresAt: now + 3_600_000,
          createdAt: now,
          updatedAt: now,
          userId: "usuario-fantasma",
        },
      },
    });
    const fantasma = t.withIdentity({
      subject: "usuario-fantasma",
      sessionId: sesionFantasma._id,
    });

    await expect(
      fantasma.mutation(api.projects.createFromTemplate, { name: "Fantasma" }),
    ).rejects.toThrow(/Unauthenticated/i);

    const proyectos = await t.run((ctx) => ctx.db.query("projects").collect());
    expect(proyectos).toHaveLength(0);
    const secciones = await t.run((ctx) =>
      ctx.db.query("project_sections").collect(),
    );
    expect(secciones).toHaveLength(0);
  });

  it("actualiza la definición general del proyecto", async () => {
    const { t, caller, projectId } = await crearProyectoDeEjemplo();

    await caller.mutation(api.projects.updateDefinition, {
      projectId,
      name: "Gestor de prácticas v2",
      problem: "Los equipos pierden la trazabilidad",
      solutionProposal: null,
    });

    const proyecto = await t.run((ctx) => ctx.db.get("projects", projectId));
    expect(proyecto?.name).toBe("Gestor de prácticas v2");
    expect(proyecto?.problem).toBe("Los equipos pierden la trazabilidad");
    expect(proyecto?.solutionProposal).toBeNull();
    expect(proyecto?.targetAudience).toBeUndefined();
  });

  it("no permite deshabilitar una sección obligatoria, sí una opcional", async () => {
    const { caller, projectId } = await crearProyectoDeEjemplo();

    await expect(
      caller.mutation(api.projects.toggleSection, {
        projectId,
        sectionKey: "definition",
        isEnabled: false,
      }),
    ).rejects.toThrow(/required_section/);

    await caller.mutation(api.projects.toggleSection, {
      projectId,
      sectionKey: "objectives",
      isEnabled: false,
    });

    const detalle = await caller.query(api.projects.getById, { projectId });
    const porClave = new Map(detalle?.sections.map((s) => [s.sectionKey, s]));
    expect(porClave.get("definition")?.isEnabled).toBe(true);
    expect(porClave.get("objectives")?.isEnabled).toBe(false);

    await caller.mutation(api.projects.toggleSection, {
      projectId,
      sectionKey: "objectives",
      isEnabled: true,
    });
    const restaurado = await caller.query(api.projects.getById, { projectId });
    expect(
      restaurado?.sections.find((s) => s.sectionKey === "objectives")
        ?.isEnabled,
    ).toBe(true);
  });

  it("lista solo los proyectos propios con su rol", async () => {
    const { caller, projectId } = await crearProyectoDeEjemplo();

    const lista = await caller.query(api.projects.listMine, {});
    expect(lista).toHaveLength(1);
    expect(lista[0]?._id).toBe(projectId);
    expect(lista[0]?.role).toBe("owner");
  });
});

describe("Fase 1: privacidad y autorización", () => {
  it("un usuario sin membresía no lee ni modifica el proyecto", async () => {
    const { crearUsuario, sesionDe, projectId } =
      await crearProyectoDeEjemplo();
    const { user, session } = await crearUsuario("bob@example.com");
    const bob = sesionDe(user, session);

    await expect(
      bob.query(api.projects.getById, { projectId }),
    ).rejects.toThrow(/forbidden/);
    await expect(
      bob.mutation(api.projects.updateDefinition, { projectId, name: "Hack" }),
    ).rejects.toThrow(/forbidden/);
    await expect(
      bob.mutation(api.projects.toggleSection, {
        projectId,
        sectionKey: "tasks",
        isEnabled: false,
      }),
    ).rejects.toThrow(/forbidden/);

    const lista = await bob.query(api.projects.listMine, {});
    expect(lista).toHaveLength(0);
  });

  it("un usuario sin sesión no consulta ni muta nada", async () => {
    const { t, projectId } = await crearProyectoDeEjemplo();

    await expect(
      t.mutation(api.projects.createFromTemplate, { name: "Anónimo" }),
    ).rejects.toThrow(/Unauthenticated/i);
    await expect(t.query(api.projects.getById, { projectId })).rejects.toThrow(
      /Unauthenticated|forbidden/,
    );
    const listaAnonima = await t.query(api.projects.listMine, {});
    expect(listaAnonima).toEqual([]);
  });
});
