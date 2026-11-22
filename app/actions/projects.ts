"use server";

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { fetchAuthMutation, isAuthenticated } from "@/lib/auth-server";
import {
  createProjectSchema,
  toggleSectionSchema,
  updateDefinitionSchema,
} from "@/lib/validation/projects";

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function mensajeDeError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Error inesperado";
}

function primerErrorDeZod(issues: { message: string }[]): string {
  return issues[0]?.message ?? "Datos inválidos";
}

/** createProjectFromTemplate: crea proyecto + membresía owner + secciones. */
export async function createProjectFromTemplate(
  input: unknown,
): Promise<ActionResult<{ projectId: string }>> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "unauthenticated" };
  }
  const parsed = createProjectSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: primerErrorDeZod(parsed.error.issues) };
  }
  try {
    const projectId = await fetchAuthMutation(
      api.projects.createFromTemplate,
      parsed.data,
    );
    return { ok: true, data: { projectId } };
  } catch (error) {
    return { ok: false, error: mensajeDeError(error) };
  }
}

/** updateProjectDefinition: definición general (owner o editor). */
export async function updateProjectDefinition(
  input: unknown,
): Promise<ActionResult<{ ok: true }>> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "unauthenticated" };
  }
  const parsed = updateDefinitionSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: primerErrorDeZod(parsed.error.issues) };
  }
  try {
    await fetchAuthMutation(api.projects.updateDefinition, {
      ...parsed.data,
      projectId: parsed.data.projectId as Id<"projects">,
    });
    return { ok: true, data: { ok: true } };
  } catch (error) {
    return { ok: false, error: mensajeDeError(error) };
  }
}

/** toggleSection: habilitar/omitir secciones de la plantilla. */
export async function toggleSection(
  input: unknown,
): Promise<ActionResult<{ ok: true }>> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "unauthenticated" };
  }
  const parsed = toggleSectionSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: primerErrorDeZod(parsed.error.issues) };
  }
  try {
    await fetchAuthMutation(api.projects.toggleSection, {
      ...parsed.data,
      projectId: parsed.data.projectId as Id<"projects">,
    });
    return { ok: true, data: { ok: true } };
  } catch (error) {
    return { ok: false, error: mensajeDeError(error) };
  }
}
