# Plan Fase 1 — Cuentas y proyectos desde plantilla

**Estado:** aprobado (2026-11-22) · **Fuente funcional:** `PLANIFY.md` · **Fuente de alcance:** `roadmap.md` (Fase 1)

## Objetivo

Un usuario se registra, verifica su correo, inicia sesión y crea un proyecto desde una plantilla con su definición general. Solo él ve su proyecto. Sin SQL ni Drizzle: esquema nativo de Convex.

## Decisiones

- Plantilla base: 6 secciones (`definition`, `objectives`, `requirements`, `user_stories`, `tasks`, `review`). Obligatorias (no deshabilitables): `definition` y `review`. Las demás opcionales, habilitadas por defecto.
- E2E de verificación de correo vía **buzón dev en Convex**: el emisor de correos en desarrollo imprime el enlace en consola y lo registra en una consulta solo-dev activada con la env var `ENABLE_DEV_MAILBOX=1` del deployment.
- Auth (registro/login/verificación/recuperación) vía Better Auth client SDK → Route Handler existente (`app/api/auth/[...all]`); las Server Actions solo mutan dominio.
- Guardia de sesión con layout de route group (reutiliza `lib/auth-server.ts`), no middleware.
- Campos en camelCase; equivalente 1:1 con el snake_case de `PLANIFY.md` §31 (reescribir SQL→Convex ya prevista en roadmap §3).

## Modelo de datos (`convex/schema.ts`)

| Tabla | Campos clave | Índices |
|---|---|---|
| `projects` | `ownerId: v.string()` (id de Better Auth), `name`, definición (problem, solutionProposal, targetAudience, successCriteria, scopeIn, scopeOut), `templateKey/templateVersion`, `status` (`draft\|in_review\|ready\|archived`), aprobación y ciclo de eliminación, auditoría | `by_owner`, `by_status` |
| `project_members` | `projectId`, `userId: v.string()`, `role` (`owner\|editor\|reader`), `joinedAt`, `addedBy` | `by_project_and_user`, `by_user`, `by_project_and_role` |
| `project_sections` | `projectId`, `sectionKey` (6 literales), `isEnabled`, `isRequired`, `position` | `by_project_and_key`, `by_project_and_position` |

Invariantes (sin `CHECK`/FK en Convex) → validadas en mutaciones y cubiertas por tests:
- `projects.ownerId` ⇔ una sola membresía `owner`, en la misma transacción.
- Unicidad `(projectId, userId)` de membresía.
- `position >= 0`; `purgeAfter > deletionRequestedAt` cuando existan.
- Existencia del usuario vía `authComponent.getAuthUser(ctx)` / `getAnyUserById(ctx, id)` (equivalente de la FK a `user.id`).

## Servicios Convex (`convex/projects.ts`)

- `createFromTemplate` (mutation, = `CreateProjectService`): proyecto + membresía `owner` + secciones de la plantilla en una transacción.
- `updateDefinition` (mutation): rol `owner|editor`.
- `toggleSection` (mutation): rol `owner|editor`; rechaza deshabilitar secciones `isRequired`.
- `listMine` / `getById` (queries): solo proyectos con membresía — privados por defecto.
- `convex/lib/authorization.ts`: `requireProjectRole(ctx, projectId, roles)` reutilizable por todas las acciones futuras.

## Correos en desarrollo

`requireEmailVerification: true`; `sendVerificationEmail` y `sendResetPassword` imprimen en consola y registran en `convex/devMailbox.ts` cuando `ENABLE_DEV_MAILBOX=1` (env var tipada en `convex.config.ts`). En Fase 8 se sustituye por proveedor real y el buzón queda desactivado.

## Server Actions y validación

`lib/validation/projects.ts` (Zod, compartido cliente/servidor) → `app/actions/projects.ts` (`createProjectFromTemplate`, `updateProjectDefinition`, `toggleSection`) → `fetchAuthMutation`.

## Frontend

- `(auth)`: registro, login, verificación, recuperación y restablecimiento de contraseña.
- `(app)`: guardia de sesión, lista y creación de proyectos, layout de proyecto con navegación `Definición → Objetivos → Requisitos → Historias → Tareas → Revisión`, pantalla de definición con toggles de secciones opcionales y placeholders para Fase 2+.

## Pruebas

- Contrato del esquema (`tests/unit/projects-schema.test.ts`) y actualización del contrato de Fase 0 (`identity-schema.test.ts`: `convex/schema.ts` no define tablas de identidad).
- Integridad con convex-test (`tests/unit/projects.test.ts`): propietario inexistente, un solo `owner`, sincronización `ownerId`↔membresía, secciones (plantilla/obligatorias) y privacidad.
- E2E (`tests/e2e/phase1.spec.ts`): registrarse → verificar correo (buzón dev) → crear proyecto → privacidad.

## Notas de operación

- `pnpm convex dev --once` tras cada cambio de esquema/funciones; `convex/_generated` se versiona (CI lo necesita).
- Activar el buzón en el deployment dev: `pnpm convex env set ENABLE_DEV_MAILBOX 1`.
