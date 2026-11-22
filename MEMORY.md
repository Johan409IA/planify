# MEMORY.md — Planify

Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no aporte.

## Estado actual
- **Fase 0 (Cimientos) completada** (2026-11-22): Next 16.4.1 + React 19.3.1 + Tailwind 4 + shadcn/ui + Biome 2.5.15 + TS 7.0.2 + Node 24.15.0 + pnpm 12.11.2 exactos. Lint, typecheck, 7 tests unitarios, build, humo e2e y CI de GitHub en verde.
- Backend: Convex (deployment dev `ardent-ant-931`, equipo `jotascript`) con las tablas de identidad de Better Auth (`user/session/account/verification/jwks`), desplegadas vía `npx convex dev --once`.
- Componente `@convex-dev/better-auth` 0.12.6 como carpeta local `convex/betterAuth/` (con `_generated/`), registro en `convex/convex.config.ts`, rutas en `convex/http.ts`, proxy en `app/api/auth/[...all]/route.ts`.
- `better-auth` fijado a **1.6.15** (el componente exige `>=1.6.11 <1.7.0`). Drizzle eliminado por decisión del usuario: Convex nativo, sin SQL.
- CI creado (`.github/workflows/ci.yml`: lint + typecheck + tests; sin `convex codegen` porque `convex/_generated` y `convex/betterAuth/_generated` se versionan). Vitest: `vitest.config.mts` (`.mts` evita aviso ESM/CJS); pruebas en memoria con `convex-test` 0.0.73 + `@edge-runtime/vm` 5.0.0 (edge-runtime solo en ese archivo). CI en verde (run 44979395559).
- El diseño SQL del dominio (FK compuestas, índices únicos, BIGINT) queda pendiente de reescribirse a semántica Convex al planificar la Fase 1 (nota en roadmap §3).

## Decisiones (y por qué)
- Supabase→Convex por límite del plan gratuito del usuario; docs migradas sin menciones restantes (solo skill interna).
- Better Auth como identidad + componente oficial `@convex-dev/better-auth` (mantenido por Convex) — guía better-auth.com/docs/integrations/convex.
- Esquema de identidad **generado** con `pnpm dlx auth generate --config ./convex/betterAuth/auth.ts --output ./convex/betterAuth/schema.ts -y`; nunca a mano.
- Secretos solo en el deployment (`npx convex env set BETTER_AUTH_SECRET/SITE_URL`); `.env.local` solo `NEXT_PUBLIC_*` + `CONVEX_DEPLOYMENT`; `.env.example` versionado sin valores.
- Next 16 Cache Components exige `<Suspense>` alrededor del `getToken()` del layout: shell async `AuthenticatedShell` en `app/layout.tsx` (build falla sin él).
- Biome `noNonNullAssertion` activo: fail-fast con throw en vez de `!` en env vars.
- Fuente de verdad: `PLANIFY.md` · TypeScript 7 · Biome sobre ESLint · permisos de build en `pnpm-workspace.yaml`.

## Aprendizajes y errores a evitar
- No borrar `<!-- BEGIN:nextjs-agent-rules -->` / `nextjs-agent-feedback` de `AGENTS.md`: `next dev` los reescribe.
- Los prompts interactivos de CLI cierran con `-y`/`-f` (no hay TTY); `pnpm peers check` se cuelga en este entorno.
- Verificar archivos inexistentes con `existsSync()`, no con `readFileSync().toThrow` (propiedad inerte que falla igual).
- Releer cada edición larga: al escribir rápido se cuelan erratas en documentos.
- `next dev` puede tardar >120 s en este Windows (fs lento): subir `webServer.timeout` de Playwright o arrancar `pnpm dev` antes con `reuseExistingServer: true`.
- `npx convex codegen` descarga el estado del deployment: no sirve en CI sin credenciales. Solución: versionar `_generated` y excluirlo en `biome.json`.
- `convex-test` requiere `environment: edge-runtime` (docblock por archivo) y `server.deps.inline` con `convex-test` y `@convex-dev/better-auth`; el primer test tarda ~4-7 s, por eso `testTimeout: 30_000`.

## Próximos pasos
- Planificar Fase 1 en `docs/plans/`: modelo Convex de `projects`/`project_members`/`project_sections` + `CreateProjectService`.
- CI en verde al primer push; los correos dev de verification/recuperación se imprimen en consola (F1).
