import { SectionPlaceholderPage } from "@/components/projects/section-placeholder-page";

export default async function RequisitosPage(
  props: PageProps<"/projects/[projectId]/requirements">,
) {
  const { projectId } = await props.params;
  return (
    <SectionPlaceholderPage projectId={projectId} sectionKey="requirements" />
  );
}
