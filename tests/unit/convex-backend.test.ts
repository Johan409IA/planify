/// <reference types="vite/client" />
// @vitest-environment edge-runtime

import { register } from "@convex-dev/better-auth/test";
import { defineSchema } from "convex/server";
import { convexTest } from "convex-test";
import { describe, expect, it } from "vitest";

const schema = defineSchema({});
const modules = import.meta.glob("../../convex/**/*.*s");

describe("base de datos de pruebas en memoria (convex-test)", () => {
  it("registra el componente betterAuth y persiste un usuario", async () => {
    const t = convexTest(schema, modules);
    const auth = register(t);
    const now = Date.now();

    await t.mutation(auth.adapter.create, {
      input: {
        model: "user",
        data: {
          name: "Ada Lovelace",
          email: "ada@example.com",
          emailVerified: true,
          createdAt: now,
          updatedAt: now,
        },
      },
    });

    const user = await t.query(auth.adapter.findOne, {
      model: "user",
      where: [{ field: "email", value: "ada@example.com" }],
    });

    expect(user).toMatchObject({
      email: "ada@example.com",
      name: "Ada Lovelace",
      emailVerified: true,
    });
  });

  it("cada instancia arranca con una base limpia", async () => {
    const t = convexTest(schema, modules);
    const auth = register(t);

    const user = await t.query(auth.adapter.findOne, {
      model: "user",
      where: [{ field: "email", value: "ada@example.com" }],
    });

    expect(user).toBeNull();
  });
});
