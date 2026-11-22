/**
 * Plantilla base versionada. Al crear un proyecto se copia tal cual;
 * la plantilla original nunca se modifica (PLANIFY.md §8).
 */
export const TEMPLATE_KEY = "base";
export const TEMPLATE_VERSION = "1.0.0";

export const SECTION_KEYS = [
  "definition",
  "objectives",
  "requirements",
  "user_stories",
  "tasks",
  "review",
] as const;

export type SectionKey = (typeof SECTION_KEYS)[number];

export interface TemplateSection {
  sectionKey: SectionKey;
  position: number;
  isEnabled: boolean;
  isRequired: boolean;
}

export const BASE_TEMPLATE: readonly TemplateSection[] = [
  { sectionKey: "definition", position: 0, isEnabled: true, isRequired: true },
  { sectionKey: "objectives", position: 1, isEnabled: true, isRequired: false },
  {
    sectionKey: "requirements",
    position: 2,
    isEnabled: true,
    isRequired: false,
  },
  {
    sectionKey: "user_stories",
    position: 3,
    isEnabled: true,
    isRequired: false,
  },
  { sectionKey: "tasks", position: 4, isEnabled: true, isRequired: false },
  { sectionKey: "review", position: 5, isEnabled: true, isRequired: true },
];
