# MEMORY.md — Planify

Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no aporte.

## Estado actual
- Fase: definición del MVP en `PLANIFY.md` (2026-10-11). Código: scaffold Next.js 16.4 + React 19.3 + Tailwind 4. Aún no hay módulos de dominio, Drizzle, Better Auth ni pantallas de producto.
- Linter/formateador: Biome 2.5.15 (`pnpm lint` / `lint:fix` / `format`). ESLint y `eslint-config-next` se eliminaron.

## Decisiones (y por qué)
- Fuente de verdad: `PLANIFY.md` — consolida producto, esquema y stack; no duplicar ese detalle aquí.
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
- Cablear stack previsto (Drizzle, Better Auth, Zod, shadcn) y migraciones según `PLANIFY.md` §24–31.
- Pruebas de integridad del esquema **antes** de construir pantallas (§26, §34).
- Añadir `.env.example` cuando existan variables reales. Vitest/Playwright aún no están en `package.json`.
