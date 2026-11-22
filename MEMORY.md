# MEMORY.md — Planify

Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no aporte.

## Estado actual
- **Fase 1 (Cuentas y proyectos desde plantilla) completada** (2026-11-22). Fase 0 cerrada antes. Verificación: lint, typecheck, 21 tests unitarios, build y E2E en verde.
- Stack actualizado: Next.js **16.4.6** (parche de seguridad, 16.4.1 → 16.4.6; versión exacta). React 19.3.1, TS 7.0.2, Node 24.15.0, pnpm 12.11.2.
- Esquema Convex de dominio en `convex/schema.ts` (camelCase): `projects`, `project_members`, `project_sections` + `dev_emails` (solo dev). La identidad sigue solo en `convex/betterAuth/schema.ts` (generado; el CLI nuevo `auth@1.7.27` cambia el formato, sin cambios funcionales).
- Servicios en `convex/projects.ts` (`createFromTemplate`, `updateDefinition`, `toggleSection`, `listMine`, `getById`) + `convex/lib/authorization.ts` (`requireProjectRole`). Plantilla base versionada en `convex/projectTemplate.ts` (`base@1.0.0`, 6 secciones; obligatorias: definition y review).
- Better Auth: `requireEmailVerification`, verificación y recuperación con correos por consola + buzón dev (`convex/devMailbox.ts`, env `ENABLE_DEV_MAILBOX=1` ya activada en el deployment dev; `autoSignInAfterVerification`).
- Server Actions en `app/actions/projects.ts` (Zod en `lib/validation/projects.ts`) → `fetchAuthMutation`. Auth (signUp/signIn/etc.) vía `authClient` → Route Handler de Better Auth.
- Frontend: `(auth)` login/register/forgot/reset/verify; `(app)` con guardia por layout (no middleware), lista/creación de proyectos, layout de proyecto con navegación de 6 secciones, definición + toggles, placeholders Fase 2. RSC leen con `fetchAuthQuery` (`lib/projects-server.ts` → 404 sin membresía).
- Plan de la fase: `docs/plans/fase-1.md`. Roadmap F1 y CHANGELOG actualizados.

## Decisiones (y por qué)
- Convex nativo sin SQL (decisión de Fase 0); campos camelCase, equivalente 1:1 con `PLANIFY.md` §31. Invariantes (unicidad, un owner, sync ownerId↔membresía) en mutaciones + tests (`tests/unit/projects.test.ts`).
- Plantilla: Definición y Revisión obligatorias; cadena opcional pero habilitada por defecto (decisión del usuario).
- E2E de verificación usa el buzón dev (consulta `devMailbox.latest` vía `ConvexHttpClient`); en Fase 8 se sustituye por proveedor real.
- `pnpm convex ...` en vez de `npx convex ...` (dependencia local de desarrollo).
- Contrato Fase 0 actualizado: `convex/schema.ts` existe pero no define tablas de identidad.
- Better Auth: identidad por `authComponent.getAuthUser(ctx)` (lanza "Unauthenticated") y `getAnyUserById`; nunca aceptar `userId` como argumento (guideline Convex).
- `env.ENABLE_DEV_MAILBOX` se declara en `convex.config.ts` con `defineApp({ env })` y se lee de `./_generated/server` (no `process.env`).

## Aprendizajes y errores a evitar
- `/projects/[projectId]` sin `page.tsx` da 404 aunque el layout exista: la raíz de un segmento necesita página (ahora redirige a /definition).
- Los logs de tareas en segundo plano no se capturan en este entorno: para depurar el servidor, escribir a archivo (`appendFileSync`) o reproducir por HTTP (script temporal; Better Auth exige cabecera `origin` en POST y con `requireEmailVerification` el registro no crea sesión: la cookie llega con la verificación).
- Con Cache Components, `searchParams` de una página debe leerse bajo `<Suspense>` (evita el aviso de URL data y mantiene instant navigation).
- `next typegen` puede reformatear `tsconfig.json`: ejecutar `pnpm lint:fix` tras typecheck si Biome se queja.
- `pnpm dlx auth generate` tarda >2 min la primera vez; subir el timeout.
- Los `revalidatePath` no hicieron falta: las páginas con datos de runtime se renderizan por request (Cache Components).
- Recordatorio de Fase 0: no borrar bloques `nextjs-agent-rules`/`agent-feedback` de `AGENTS.md`; `convex/_generated` se versiona.

## Próximos pasos
- Fase 2 en `docs/plans/`: `planning_items` + tablas de detalle, CRUD por tipo, criterios de aceptación y backlog; pruebas de integridad antes de pantallas (roadmap).
