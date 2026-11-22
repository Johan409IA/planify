import { defineApp } from "convex/server";
import { v } from "convex/values";
import betterAuth from "./betterAuth/convex.config";

const app = defineApp({
  env: {
    /** Solo desarrollo: activa el buzón dev para pruebas E2E. */
    ENABLE_DEV_MAILBOX: v.optional(v.string()),
  },
});

app.use(betterAuth);

export default app;
