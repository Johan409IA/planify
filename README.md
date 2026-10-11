# Planify

Planify es una aplicación web colaborativa para equipos de estudiantes que desarrollan proyectos académicos de software. Ayuda a transformar una idea en una planificación organizada, revisable y trazable **antes** de empezar a construir: objetivos, requisitos, historias de usuario y tareas, unidos por relaciones **manuales**.

No es un gestor genérico de tareas, un sistema de gestión académica ni un repositorio de documentos. El diferenciador es la trazabilidad entre elementos de planificación.

El código de aplicación todavía es el scaffold de Next.js. El diseño funcional y técnico del MVP está en [`PLANIFY.md`](./PLANIFY.md) (fuente de verdad).

## Requisitos

- [Node.js](https://nodejs.org/) 24 LTS (previsto en `PLANIFY.md`; aún no hay campo `engines` en `package.json`)
- [pnpm](https://pnpm.io/) 12.x (el repo declara `packageManager` en `package.json`)

## Instalación

```sh
pnpm install
```

## Uso / cómo levantarlo

```sh
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

Otros scripts del `package.json`:

| Script | Qué hace |
|---|---|
| `pnpm build` | Compila para producción |
| `pnpm start` | Sirve el build de producción |
| `pnpm lint` | Lint y comprobación de formato con Biome |
| `pnpm lint:fix` | Aplica correcciones seguras de Biome |
| `pnpm format` | Formatea con Biome |

Aún no hay `.env.example` ni variables de entorno obligatorias: Supabase, Drizzle y Better Auth no están cableados.

## Tests

No hay script de test en `package.json`. El MVP prevé Vitest (unidad/integración) y Playwright (navegador); ver `PLANIFY.md` §24.

## Recorrido del MVP (previsto)

```text
Idea → Objetivos → Requisitos → Historias de usuario → Tareas → Revisión
```

Roles por proyecto: **propietario**, **editor** y **lector**. Un enlace de invitación no concede acceso hasta autenticarse y aceptar.

## Documentación adicional

- Fuente de verdad del producto: [`PLANIFY.md`](./PLANIFY.md)
- Arquitectura: [`docs/architecture.md`](./docs/architecture.md)
- Reglas para agentes: [`AGENTS.md`](./AGENTS.md)
- Memoria de sesión: [`MEMORY.md`](./MEMORY.md)
- Historial de cambios: [`CHANGELOG.md`](./CHANGELOG.md)
