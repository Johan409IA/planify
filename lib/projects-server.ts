import { notFound } from "next/navigation";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { fetchAuthQuery } from "@/lib/auth-server";

/**
 * Detalle del proyecto para Server Components. Sin sesión o sin membresía → 404
 * (los proyectos son privados por defecto).
 */
export async function obtenerDetalleProyecto(projectId: string) {
  let detalle = null;
  try {
    detalle = await fetchAuthQuery(api.projects.getById, {
      projectId: projectId as Id<"projects">,
    });
  } catch {
    notFound();
  }
  if (!detalle) {
    notFound();
  }
  return detalle;
}
