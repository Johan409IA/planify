import { SectionPlaceholderPage } from "@/components/projects/section-placeholder-page";

export default async function RevisionPage(
  props: PageProps<"/projects/[projectId]/review">,
) {
  const { projectId } = await props.params;
  return <SectionPlaceholderPage projectId={projectId} sectionKey="review" />;
}
