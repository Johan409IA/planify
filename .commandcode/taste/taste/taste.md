# planify
- Se comunica en español; prefiere respuestas y notas en español. Confidence: 0.8
- Al iniciar un proyecto, prefiere fijar versiones exactas de las dependencias (sin rangos como `^`) y generar el lockfile desde el arranque. Confidence: 0.9
- Fija también la versión de Node de forma exacta (por ejemplo, `.nvmrc` + `engines` exacto). Confidence: 0.7
- Prefiere usar las últimas versiones estables de paquetes y dependencias, incluso si la documentación del proyecto (p. ej. PLANIFY.md) está desactualizada; en ese caso, actualizar la documentación para reflejar las versiones elegidas. Confidence: 0.9
- Prefiere invocar el CLI `ctx7` directamente (instalado globalmente) en lugar de `npx ctx7@latest`, siguiendo el AGENTS.md global de CommandCode. Confidence: 0.8
- Para la base de datos de pruebas, prefiere separación a nivel de esquema dentro de la infraestructura existente en vez de crear un proyecto/servicio externo nuevo (p. ej., no crearía un proyecto aparte en Convex solo para tests). Confidence: 0.7
- Ejecuta los CLIs de devDependencies del proyecto con `pnpm <cli>` (p. ej. `pnpm convex dev --once`), nunca con `npx <cli>` — el proyecto usa pnpm y las herramientas son dependencias locales de desarrollo. Confidence: 0.95
- Al terminar de usar procesos en segundo plano (servidores dev, `convex logs`, watchers), matarlos siempre; el usuario corrige si quedan procesos de terminal huérfanos abiertos. Confidence: 0.85
