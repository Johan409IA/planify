import { SectionPlaceholderPage } from "@/components/projects/section-placeholder-page";

export default async function TareasPage(
  props: PageProps<"/projects/[projectId]/tasks">,
) {
  const { projectId } = await props.params;
  return <SectionPlaceholderPage projectId={projectId} sectionKey="tasks" />;
}
