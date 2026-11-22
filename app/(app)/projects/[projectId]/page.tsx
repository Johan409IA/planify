import { redirect } from "next/navigation";

/** La raíz del proyecto lleva a la primera sección de la plantilla. */
export default async function ProjectIndexPage(
  props: PageProps<"/projects/[projectId]">,
) {
  const { projectId } = await props.params;
  redirect(`/projects/${projectId}/definition`);
}
