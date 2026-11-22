import { type ReactNode, Suspense } from "react";
import { ProjectNav } from "@/components/projects/project-nav";
import { Badge } from "@/components/ui/badge";
import { obtenerDetalleProyecto } from "@/lib/projects-server";

const ETIQUETAS_ESTADO: Record<string, string> = {
  draft: "Borrador",
  in_review: "En revisión",
  ready: "Preparado",
  archived: "Archivado",
};

async function ContenidoProyecto({
  projectId,
  children,
}: {
  projectId: string;
  children: ReactNode;
}) {
  const detalle = await obtenerDetalleProyecto(projectId);

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="flex w-full max-w-3xl flex-col gap-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{detalle.project.name}</h1>
          <Badge variant="secondary">
            {ETIQUETAS_ESTADO[detalle.project.status] ?? detalle.project.status}
          </Badge>
        </div>
        <ProjectNav
          projectId={projectId}
          sections={detalle.sections.map((seccion) => ({
            sectionKey: seccion.sectionKey,
            isEnabled: seccion.isEnabled,
          }))}
        />
      </div>
      {children}
    </div>
  );
}

export default async function ProjectLayout(props: {
  children: ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await props.params;

  return (
    <Suspense fallback={<p className="p-6 text-sm">Cargando proyecto…</p>}>
      <ContenidoProyecto projectId={projectId}>
        {props.children}
      </ContenidoProyecto>
    </Suspense>
  );
}
