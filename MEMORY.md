# MEMORY.md — Planify

Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no aporte.

## Estado actual
- Fase: definición del MVP en `PLANIFY.md` (2026-10-11). Código: scaffold Next.js 16.4.1 + React 19.3.1 + Tailwind 4.3.3. Aún no hay módulos de dominio, Drizzle, Better Auth ni pantallas de producto.
- Linter/formateador: Biome 2.5.15 (`pnpm lint` / `lint:fix` / `format`). ESLint y `eslint-config-next` se eliminaron.
- Stack completo instalado con versiones exactas (sin `^`): zod 4.6.7, drizzle-orm 0.45.4, drizzle-kit 0.31.11, better-auth 1.7.10, vitest 5.0.5, @playwright/test 1.64.1, typescript 7.0.2, @types/node 24.19.2, @types/react(-dom) 19.3.0. Node fijado exacto (24.15.0 en `.nvmrc` + `engines`), pnpm 12.11.2. Lockfile `pnpm-lock.yaml` generado. Build/lint/typecheck en verde (2026-10-15).

## Decisiones (y por qué)
- Fuente de verdad: `PLANIFY.md` — consolida producto, esquema y stack; no duplicar ese detalle aquí.
- TypeScript 7 (no 5.x como decía PLANIFY.md antes): es la rama estable actual; `next build` de Next 16 usa su comprobador CLI y lo soporta. Documentos actualizados.
- `@types/node` alineado al runtime (24.x), no al último (`26.x`), para no tener tipos de una versión mayor que el runtime.
- Permisos de build de pnpm 12 viven en `pnpm-workspace.yaml` (`allowBuilds`), no en el campo `pnpm` de package.json (ya no se lee). `esbuild: true` aprobado; `sharp`/`unrs-resolver` en false.
- TypeScript full-stack (Next.js App Router) en lugar de Laravel + Vue + Inertia + MySQL — un solo lenguaje y monolito desplegable.
- PostgreSQL vía Supabase + Drizzle en servidor; no Data API ni Supabase Auth en el MVP. Better Auth es la identidad (esquema generado, FKs `TEXT`).
- Trazabilidad manual; sin IA. `planning_items` unifica objetivos, requisitos, historias y tareas.
- Mutaciones de UI con Server Actions + servicios transaccionales; sin API REST interna para el flujo del MVP.
- Biome en lugar de ESLint 9 (deprecado en el lockfile).

## Aprendizajes y errores a evitar
- No borrar el bloque `<!-- BEGIN:nextjs-agent-rules -->` de `AGENTS.md`: `next dev` lo reescribe.
- No mezclar Better Auth (`user`) con `auth.users` de Supabase.
- No importar Drizzle ni credenciales de Postgres en el cliente.
- No inventar entidades fuera de `PLANIFY.md` (p. ej. casos de uso o reglas de negocio como nodos de trazabilidad).

## Próximos pasos
- Cablear stack (Drizzle config, Better Auth schema, shadcn) y migraciones según `PLANIFY.md` §24–31.
- Pruebas de integridad del esquema **antes** de construir pantallas (§26, §34).
- Añadir `.env.example` cuando existan variables reales. Vitest y Playwright ya están como deps; falta su configuración (vitest.config, playwright.config) y la BD de pruebas.
