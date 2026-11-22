# Changelog

Todos los cambios notables de este proyecto se documentan aquí.
El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [Unreleased]

### Added
- Fase 1 — Cuentas y proyectos desde plantilla: registro, inicio de sesión, verificación de correo y recuperación de contraseña con Better Auth; esquema Convex de `projects`, `project_members` y `project_sections`; `CreateProjectService` transaccional con plantilla base versionada; lista/creación de proyectos, definición general y navegación por secciones.
- Buzón dev en Convex (`convex/devMailbox.ts`, env `ENABLE_DEV_MAILBOX`) para el E2E de verificación de correo; los correos de desarrollo también se imprimen en consola.
- Pruebas de integridad de la Fase 1 (convex-test) y E2E de registro → verificación → creación de proyecto (Playwright).
- Plan de la fase en `docs/plans/fase-1.md`.

### Security
- Next.js actualizado de 16.4.1 a 16.4.6 (parche de seguridad publicado; versión exacta fijada).

### Changed
- Contrato de Fase 0 actualizado: `convex/schema.ts` ahora existe (dominio) y se verifica que no defina tablas de identidad.

### Added (Fase 0)
- Scaffold de Next.js 16 (App Router), React 19, TypeScript y Tailwind CSS 4.
- Documentación inicial para humanos y agentes: `README.md`, `AGENTS.md`, `MEMORY.md`, `docs/architecture.md`. El diseño de producto permanece en `PLANIFY.md`.

### Changed (Fase 0)
- Linter y formateador: Biome 2.5.15. Scripts `lint`, `lint:fix` y `format` en `package.json`.

### Removed
- ESLint 9 y `eslint-config-next` (la versión de ESLint del lockfile estaba deprecada).
