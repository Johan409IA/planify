import { ConvexError, v } from "convex/values";
import { env, internalMutation, query } from "./_generated/server";

const TIPOS = v.union(v.literal("verification"), v.literal("reset_password"));

/**
 * Buzón dev: guarda los correos de verificación/recuperación para que el E2E
 * pueda abrir el enlace real. Solo activo con ENABLE_DEV_MAILBOX=1 en el
 * deployment; se sustituye por un proveedor real en la Fase 8.
 */
export const record = internalMutation({
  args: {
    kind: TIPOS,
    to: v.string(),
    subject: v.string(),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    if (env.ENABLE_DEV_MAILBOX !== "1") {
      return;
    }
    await ctx.db.insert("dev_emails", { ...args, createdAt: Date.now() });
  },
});

export const latest = query({
  args: { kind: TIPOS },
  handler: async (ctx, args) => {
    if (env.ENABLE_DEV_MAILBOX !== "1") {
      throw new ConvexError("dev_mailbox_disabled");
    }
    const correos = await ctx.db
      .query("dev_emails")
      .withIndex("by_kind_and_created", (q) => q.eq("kind", args.kind))
      .order("desc")
      .take(1);
    return correos[0] ?? null;
  },
});
