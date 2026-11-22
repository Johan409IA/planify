import { SectionPlaceholderPage } from "@/components/projects/section-placeholder-page";

export default async function HistoriasPage(
  props: PageProps<"/projects/[projectId]/user_stories">,
) {
  const { projectId } = await props.params;
  return (
    <SectionPlaceholderPage projectId={projectId} sectionKey="user_stories" />
  );
}
