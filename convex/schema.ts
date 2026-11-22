import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { SECTION_KEYS } from "./projectTemplate";

/** Texto de definición del proyecto: opcional y limpiable (null). */
export const definitionalText = v.optional(v.union(v.null(), v.string()));

export const projectStatus = v.union(
  v.literal("draft"),
  v.literal("in_review"),
  v.literal("ready"),
  v.literal("archived"),
);

export const projectRole = v.union(
  v.literal("owner"),
  v.literal("editor"),
  v.literal("reader"),
);

export const sectionKey = v.union(...SECTION_KEYS.map((key) => v.literal(key)));

/**
 * Tablas de dominio de Planify. La identidad (user/session/account/verification)
 * vive solo en convex/betterAuth/schema.ts, generado por Better Auth.
 * Las FK de identidad son cadenas (v.string()), nunca IDs de documento de dominio.
 */
export default defineSchema({
  projects: defineTable({
    ownerId: v.string(),
    name: v.string(),
    description: definitionalText,
    problem: definitionalText,
    solutionProposal: definitionalText,
    targetAudience: definitionalText,
    successCriteria: definitionalText,
    scopeIn: definitionalText,
    scopeOut: definitionalText,
    templateKey: v.string(),
    templateVersion: v.string(),
    status: projectStatus,
    approvedBy: v.optional(v.string()),
    approvedAt: v.optional(v.number()),
    deletionRequestedAt: v.optional(v.number()),
    purgeAfter: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_owner", ["ownerId"])
    .index("by_status", ["status"]),

  project_members: defineTable({
    projectId: v.id("projects"),
    userId: v.string(),
    role: projectRole,
    joinedAt: v.number(),
    addedBy: v.optional(v.string()),
  })
    .index("by_project_and_user", ["projectId", "userId"])
    .index("by_project_and_role", ["projectId", "role"])
    .index("by_user", ["userId"]),

  project_sections: defineTable({
    projectId: v.id("projects"),
    sectionKey,
    isEnabled: v.boolean(),
    isRequired: v.boolean(),
    position: v.number(),
  })
    .index("by_project_and_key", ["projectId", "sectionKey"])
    .index("by_project_and_position", ["projectId", "position"]),

  /**
   * Buzón de correos solo para desarrollo/pruebas (E2E). Reemplazado por un
   * proveedor real en la Fase 8; inactivo salvo ENABLE_DEV_MAILBOX=1.
   */
  dev_emails: defineTable({
    kind: v.union(v.literal("verification"), v.literal("reset_password")),
    to: v.string(),
    subject: v.string(),
    url: v.string(),
    createdAt: v.number(),
  }).index("by_kind_and_created", ["kind", "createdAt"]),
});
