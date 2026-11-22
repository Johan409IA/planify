import { ConvexError, v } from "convex/values";
import type { Doc } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./betterAuth/auth";
import { requireProjectRole } from "./lib/authorization";
import {
  BASE_TEMPLATE,
  TEMPLATE_KEY,
  TEMPLATE_VERSION,
} from "./projectTemplate";
import { sectionKey } from "./schema";

const NOMBRE_MAX = 200;
const DEFINICION_MAX = 10_000;

/**
 * CreateProjectService: en una sola transacción crea el proyecto, la
 * membresía `owner` sincronizada con `projects.ownerId` y las secciones
 * copiadas de la plantilla base versionada.
 */
export const createFromTemplate = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.union(v.null(), v.string())),
  },
  handler: async (ctx, args) => {
    const nombre = args.name.trim();
    if (nombre.length === 0 || nombre.length > NOMBRE_MAX) {
      throw new ConvexError("invalid_name");
    }

    // Equivalente de la FK a user.id: lanza "Unauthenticated" si no hay
    // sesión con un usuario existente en Better Auth.
    const user = await authComponent.getAuthUser(ctx);
    const now = Date.now();

    const projectId = await ctx.db.insert("projects", {
      ownerId: user._id,
      name: nombre,
      description: args.description ?? null,
      templateKey: TEMPLATE_KEY,
      templateVersion: TEMPLATE_VERSION,
      status: "draft",
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("project_members", {
      projectId,
      userId: user._id,
      role: "owner",
      joinedAt: now,
      addedBy: user._id,
    });

    for (const seccion of BASE_TEMPLATE) {
      await ctx.db.insert("project_sections", {
        projectId,
        sectionKey: seccion.sectionKey,
        isEnabled: seccion.isEnabled,
        isRequired: seccion.isRequired,
        position: seccion.position,
      });
    }

    return projectId;
  },
});

/** updateProjectDefinition: la definición general la editan owner y editor. */
export const updateDefinition = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.optional(v.string()),
    description: v.optional(v.union(v.null(), v.string())),
    problem: v.optional(v.union(v.null(), v.string())),
    solutionProposal: v.optional(v.union(v.null(), v.string())),
    targetAudience: v.optional(v.union(v.null(), v.string())),
    successCriteria: v.optional(v.union(v.null(), v.string())),
    scopeIn: v.optional(v.union(v.null(), v.string())),
    scopeOut: v.optional(v.union(v.null(), v.string())),
  },
  handler: async (ctx, args) => {
    await requireProjectRole(ctx, args.projectId, ["owner", "editor"]);

    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    if (args.name !== undefined) {
      const nombre = args.name.trim();
      if (nombre.length === 0 || nombre.length > NOMBRE_MAX) {
        throw new ConvexError("invalid_name");
      }
      patch.name = nombre;
    }
    for (const campo of [
      "description",
      "problem",
      "solutionProposal",
      "targetAudience",
      "successCriteria",
      "scopeIn",
      "scopeOut",
    ] as const) {
      const valor = args[campo];
      if (valor === undefined) continue;
      if (valor !== null && valor.length > DEFINICION_MAX) {
        throw new ConvexError("invalid_definition");
      }
      patch[campo] = valor;
    }

    await ctx.db.patch(args.projectId, patch as Partial<Doc<"projects">>);
  },
});

/** toggleSection: habilitar/omitir secciones; las obligatorias no se omiten. */
export const toggleSection = mutation({
  args: {
    projectId: v.id("projects"),
    sectionKey,
    isEnabled: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireProjectRole(ctx, args.projectId, ["owner", "editor"]);

    const seccion = await ctx.db
      .query("project_sections")
      .withIndex("by_project_and_key", (q) =>
        q.eq("projectId", args.projectId).eq("sectionKey", args.sectionKey),
      )
      .unique();

    if (!seccion) {
      throw new ConvexError("not_found");
    }
    if (!args.isEnabled && seccion.isRequired) {
      throw new ConvexError("required_section");
    }

    await ctx.db.patch(seccion._id, { isEnabled: args.isEnabled });
  },
});

/** Proyectos del usuario autenticado con su rol (privados por defecto). */
export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      return [];
    }

    const membresias = await ctx.db
      .query("project_members")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .take(100);

    const proyectos = [];
    for (const membresia of membresias) {
      const proyecto = await ctx.db.get(membresia.projectId);
      if (proyecto) {
        proyectos.push({ ...proyecto, role: membresia.role });
      }
    }
    return proyectos;
  },
});

/** Detalle del proyecto con secciones ordenadas; exige membresía. */
export const getById = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const membresia = await requireProjectRole(ctx, args.projectId, [
      "owner",
      "editor",
      "reader",
    ]);

    const proyecto = await ctx.db.get(args.projectId);
    if (!proyecto) {
      return null;
    }

    const secciones = await ctx.db
      .query("project_sections")
      .withIndex("by_project_and_position", (q) =>
        q.eq("projectId", args.projectId),
      )
      .take(50);

    return { project: proyecto, sections: secciones, role: membresia.role };
  },
});
