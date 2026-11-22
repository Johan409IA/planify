import { createClient } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import type { GenericCtx } from "@convex-dev/better-auth/utils";
import type { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth";
import { components, internal } from "../_generated/api";
import type { DataModel } from "../_generated/dataModel";
import authConfig from "../auth.config";
import schema from "./schema";

// Better Auth Component
export const authComponent = createClient<DataModel, typeof schema>(
  components.betterAuth,
  {
    local: { schema },
    verbose: false,
  },
);

/**
 * En desarrollo los correos se imprimen en consola y se registran en el
 * buzón dev (convex/devMailbox.ts) para las pruebas E2E. En la Fase 8 se
 * sustituyen por un proveedor real de correo.
 */
const registrarCorreoDev = async (
  ctx: GenericCtx<DataModel>,
  kind: "verification" | "reset_password",
  to: string,
  subject: string,
  url: string,
) => {
  console.log(`[Planify·correo-dev] ${kind} → ${to}: ${url}`);
  if ("runMutation" in ctx) {
    await ctx.runMutation(internal.devMailbox.record, {
      kind,
      to,
      subject,
      url,
    });
  }
};

// Better Auth Options
export const createAuthOptions = (ctx: GenericCtx<DataModel>) => {
  return {
    appName: "Planify",
    baseURL: process.env.SITE_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      sendResetPassword: async ({ user, url }) => {
        await registrarCorreoDev(
          ctx,
          "reset_password",
          user.email,
          "Recupera tu contraseña de Planify",
          url,
        );
      },
    },
    emailVerification: {
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user, url }) => {
        await registrarCorreoDev(
          ctx,
          "verification",
          user.email,
          "Verifica tu correo de Planify",
          url,
        );
      },
    },
    plugins: [convex({ authConfig })],
  } satisfies BetterAuthOptions;
};

// For `auth` CLI
export const options = createAuthOptions({} as GenericCtx<DataModel>);

// Better Auth Instance
export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth(createAuthOptions(ctx));
};
