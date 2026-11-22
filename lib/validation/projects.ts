import { z } from "zod";
import { SECTION_KEYS } from "../../convex/projectTemplate";

const nombre = z.string().trim().min(1, "El nombre es obligatorio").max(200);

const textoDefinicion = z.string().trim().max(10_000).nullish();

export const seccionSchema = z.enum(SECTION_KEYS);

export const createProjectSchema = z.object({
  name: nombre,
  description: textoDefinicion,
});

export const updateDefinitionSchema = z.object({
  projectId: z.string().min(1),
  name: nombre.optional(),
  description: textoDefinicion,
  problem: textoDefinicion,
  solutionProposal: textoDefinicion,
  targetAudience: textoDefinicion,
  successCriteria: textoDefinicion,
  scopeIn: textoDefinicion,
  scopeOut: textoDefinicion,
});

export const toggleSectionSchema = z.object({
  projectId: z.string().min(1),
  sectionKey: seccionSchema,
  isEnabled: z.boolean(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateDefinitionInput = z.infer<typeof updateDefinitionSchema>;
export type ToggleSectionInput = z.infer<typeof toggleSectionSchema>;
