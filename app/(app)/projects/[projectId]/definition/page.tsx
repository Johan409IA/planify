import { Suspense } from "react";
import { DefinitionForm } from "@/components/projects/definition-form";
import { SectionToggles } from "@/components/projects/section-toggles";
import { obtenerDetalleProyecto } from "@/lib/projects-server";

async function ContenidoDefinicion({ projectId }: { projectId: string }) {
  const detalle = await obtenerDetalleProyecto(projectId);
  const proyecto = detalle.project;

  return (
    <div className="flex w-full max-w-3xl flex-col gap-6">
      <DefinitionForm
        projectId={projectId}
        valores={{
          name: proyecto.name,
          description: proyecto.description ?? "",
          problem: proyecto.problem ?? "",
          solutionProposal: proyecto.solutionProposal ?? "",
          targetAudience: proyecto.targetAudience ?? "",
          successCriteria: proyecto.successCriteria ?? "",
          scopeIn: proyecto.scopeIn ?? "",
          scopeOut: proyecto.scopeOut ?? "",
        }}
      />
      <SectionToggles
        projectId={projectId}
        sections={detalle.sections.map((seccion) => ({
          sectionKey: seccion.sectionKey,
          isEnabled: seccion.isEnabled,
          isRequired: seccion.isRequired,
        }))}
      />
    </div>
  );
}

export default async function DefinitionPage(
  props: PageProps<"/projects/[projectId]/definition">,
) {
  const { projectId } = await props.params;

  return (
    <Suspense fallback={<p className="text-sm">Cargando definición…</p>}>
      <ContenidoDefinicion projectId={projectId} />
    </Suspense>
  );
}
