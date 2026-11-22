import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SectionKey } from "@/convex/projectTemplate";
import { obtenerDetalleProyecto } from "@/lib/projects-server";
import { labelDeSeccion } from "@/lib/sections";

async function ContenidoSeccion({
  projectId,
  sectionKey,
}: {
  projectId: string;
  sectionKey: SectionKey;
}) {
  const detalle = await obtenerDetalleProyecto(projectId);
  const seccion = detalle.sections.find((s) => s.sectionKey === sectionKey);
  const habilitada = seccion?.isEnabled ?? true;

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>{labelDeSeccion(sectionKey)}</CardTitle>
        <CardDescription>
          {habilitada
            ? "Esta sección se completa en las siguientes fases del MVP."
            : "Esta sección está omitida en este proyecto."}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-zinc-600 dark:text-zinc-400">
        {habilitada
          ? "Aquí podrás crear y organizar los elementos de esta etapa de la planificación."
          : "Puedes habilitarla de nuevo desde la Definición del proyecto."}
      </CardContent>
    </Card>
  );
}

/** Placeholder de sección para la Fase 1: la ruta orienta, no bloquea. */
export function SectionPlaceholderPage({
  projectId,
  sectionKey,
}: {
  projectId: string;
  sectionKey: SectionKey;
}) {
  return (
    <Suspense fallback={<p className="text-sm">Cargando sección…</p>}>
      <ContenidoSeccion projectId={projectId} sectionKey={sectionKey} />
    </Suspense>
  );
}
