import { ConvexError } from "convex/values";
import type { Doc, Id } from "../_generated/dataModel";
import type { MutationCtx, QueryCtx } from "../_generated/server";
import { authComponent } from "../betterAuth/auth";

export type ProjectRole = "owner" | "editor" | "reader";

type DomainCtx = QueryCtx | MutationCtx;

/**
 * Autorización de proyecto reutilizable: identidad + membresía + rol.
 * Lanza ConvexError con un código estable que las Server Actions traducen.
 */
export async function requireProjectRole(
  ctx: DomainCtx,
  projectId: Id<"projects">,
  roles: readonly ProjectRole[],
): Promise<Doc<"project_members">> {
  const user = await authComponent.getAuthUser(ctx);
  const membership = await ctx.db
    .query("project_members")
    .withIndex("by_project_and_user", (q) =>
      q.eq("projectId", projectId).eq("userId", user._id),
    )
    .unique();

  if (!membership) {
    throw new ConvexError("forbidden");
  }
  if (!roles.includes(membership.role)) {
    throw new ConvexError("forbidden");
  }
  return membership;
}
