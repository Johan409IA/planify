import type { SectionKey } from "@/convex/projectTemplate";

/** Navegación de proyecto: la ruta orienta (Definición → … → Revisión), no bloquea. */
export const SECCIONES: readonly { key: SectionKey; label: string }[] = [
  { key: "definition", label: "Definición" },
  { key: "objectives", label: "Objetivos" },
  { key: "requirements", label: "Requisitos" },
  { key: "user_stories", label: "Historias" },
  { key: "tasks", label: "Tareas" },
  { key: "review", label: "Revisión" },
];

export function labelDeSeccion(sectionKey: SectionKey): string {
  return SECCIONES.find((s) => s.key === sectionKey)?.label ?? sectionKey;
}
