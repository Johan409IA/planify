import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
    testTimeout: 30_000,
    server: {
      deps: {
        inline: ["convex-test", "@convex-dev/better-auth"],
      },
    },
  },
});
