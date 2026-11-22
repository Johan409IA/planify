import { SectionPlaceholderPage } from "@/components/projects/section-placeholder-page";

export default async function ObjetivosPage(
  props: PageProps<"/projects/[projectId]/objectives">,
) {
  const { projectId } = await props.params;
  return (
    <SectionPlaceholderPage projectId={projectId} sectionKey="objectives" />
  );
}
