# AGENTS.md — Planify

Planify ayuda a equipos de estudiantes a planificar software con trazabilidad manual (objetivos → requisitos → historias → tareas). Fuente de verdad funcional y técnica: `PLANIFY.md`.

## Stack y estructura
- Next.js 16 App Router, React 19, TypeScript 5, Tailwind 4, Biome 2.5.15, pnpm. Previsto: shadcn/ui, Zod, Drizzle, PostgreSQL (Supabase), Better Auth, Vitest, Playwright.
- Hoy el repo es el scaffold (`app/`). El dominio y el esquema viven en `PLANIFY.md`; no inventes el modelo.

## Comandos
- Instalar: `pnpm install` · Dev: `pnpm dev` · Build: `pnpm build` · Start: `pnpm start`
- Lint: `pnpm lint` · Corregir: `pnpm lint:fix` · Formato: `pnpm format`

## Convenciones
- Identificadores en inglés; UI y documentación en español.
- Mutaciones de UI: Server Actions → servicios de servidor. Route Handlers solo para Better Auth (u HTTP externo real).
- Drizzle y credenciales de Supabase solo en el servidor. Formateo y lint: Biome (`biome.json`).

## Reglas de dominio / trampas conocidas
- Las relaciones las crea el usuario; no hay IA ni inferencia automática en el MVP.
- `planning_items` es la tabla común trazable; FKs de identidad son `TEXT` (Better Auth). No tabla `users` paralela.
- No mezclar Better Auth con Supabase Auth. `projects.owner_id` es canónico; sincronizar el rol `owner` en la misma transacción.
- El enlace de invitación no da acceso hasta aceptar (transacción atómica). Fuera del MVP: API pública, microservicios, Redis, grafo, IA, plantillas de usuarios.

## Forma de trabajar
- Alinea cada cambio con `PLANIFY.md`. Alcance o esquema: planificar primero (`docs/plans/`). Cambios pequeños y verificables.

## Memoria
- Al empezar, lee `MEMORY.md` para conocer el estado del proyecto y las decisiones tomadas.
- Al terminar una tarea, actualízalo: estado actual, decisiones importantes (con su porqué) y errores a evitar.
- Mantenlo breve (máximo ~50 líneas): resume o elimina lo que ya no aporte.
- Si algo se convierte en una regla permanente, propón moverlo a `AGENTS.md` en lugar de dejarlo en la memoria.
- No guardes nunca datos sensibles (claves, tokens, datos personales).

## Límites
- ✅ Siempre: leer `PLANIFY.md` y `MEMORY.md` al empezar; actualizar `MEMORY.md` al terminar cada tarea; consultar `node_modules/next/dist/docs/` antes de código Next.js.
- ⚠️ Pregunta antes: dependencias nuevas, ampliar el MVP, cambiar el esquema o mezclar proveedores de auth.
- 🚫 Nunca: secretos en repo/docs; Drizzle o credenciales en el cliente; Laravel/Vue/MySQL; API REST interna para el flujo del MVP.

## Verificación
- `pnpm lint`. Si toca UI: `pnpm dev` y el flujo afectado. No hay script de test todavía.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
