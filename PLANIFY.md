# Planify — Información y decisiones del proyecto

**Fecha de consolidación:** 2026-10-11
**Estado:** definición funcional y diseño técnico preliminar del MVP

## 1. Descripción del proyecto

Planify es una aplicación web colaborativa orientada inicialmente a equipos de estudiantes que desarrollan proyectos académicos de software.

Su propósito es ayudar a transformar una idea inicial en una planificación organizada, revisable y trazable antes de comenzar el desarrollo.

Planify centraliza los elementos principales de la planificación y permite relacionarlos manualmente para que el equipo pueda comprender:

- qué objetivo origina un requisito;
- qué historias responden a un requisito;
- qué tareas se necesitan para implementar una historia;
- qué elementos todavía tienen relaciones obligatorias faltantes.

Planify no será un sistema de gestión académica, un gestor genérico de tareas ni un repositorio de documentos. Su diferenciador será la trazabilidad manual entre los elementos de planificación.

## 2. Usuario inicial y contexto

### Usuario objetivo inicial

Equipos de estudiantes que desarrollan proyectos de software en cursos universitarios.

El MVP no dependerá de docentes, cursos ni grupos académicos. Cada equipo podrá crear su propio proyecto e invitar a sus compañeros.

El soporte para docentes y la gestión académica podrán evaluarse posteriormente.

### Problema principal

Los equipos pierden la relación entre requisitos, diseños, decisiones y tareas porque la información suele estar distribuida en documentos, herramientas y notas separadas.

El problema central de Planify será la dificultad para saber cómo se conecta lo que el equipo quiere construir con el trabajo necesario para implementarlo.

La dispersión de información y las distintas interpretaciones del proyecto son problemas secundarios.

## 3. Propuesta de valor

Planify combinará:

1. Plantillas guiadas para ayudar a los estudiantes a organizar una planificación de software.
2. Un núcleo de trazabilidad manual para conectar objetivos, requisitos, historias de usuario y tareas.
3. Comprobaciones estructurales para detectar elementos o relaciones obligatorias faltantes.
4. Una revisión final mediante la cual el propietario confirma que el equipo está preparado para iniciar el desarrollo.

La inteligencia artificial no formará parte de la propuesta inicial. Las relaciones serán creadas explícitamente por los integrantes.

## 4. Resultado esperado

Un proyecto estará preparado para comenzar el desarrollo cuando:

- tenga el contenido mínimo requerido;
- sus elementos principales estén suficientemente definidos;
- las relaciones obligatorias de trazabilidad estén completas;
- no existan incumplimientos estructurales bloqueantes;
- el propietario haya confirmado la revisión del equipo.

La aprobación no significa que Planify garantice la calidad de las decisiones ni que el proyecto esté libre de riesgos. Significa que el equipo revisó la planificación y acepta comenzar con el alcance definido.

## 5. Alcance general previsto

La visión completa de Planify contempla:

1. Definición del proyecto: problema, propuesta, público objetivo, objetivos, criterios de éxito y alcance.
2. Requisitos y análisis: casos de uso, reglas de negocio, requisitos, historias de usuario y criterios de aceptación.
3. Flujos: flujos de usuario y procesos.
4. Diseño de interfaz: pantallas, prototipos y referencias.
5. Arquitectura y planificación técnica: arquitectura, stack, diagramas, decisiones técnicas y justificaciones.
6. Equipo y roles.
7. Backlog de tareas.

Los módulos completos de diseño, arquitectura, diagramas técnicos y gestión detallada del equipo no forman parte del MVP.

## 6. Alcance del MVP

El MVP debe validar el recorrido central:

```text
Idea → Objetivos → Requisitos → Historias de usuario → Tareas → Revisión
```

### Funciones obligatorias

- Crear un proyecto desde una plantilla base.
- Permitir omitir secciones opcionales de la plantilla.
- Registrar la definición general del proyecto.
- Crear objetivos, requisitos, historias de usuario y tareas.
- Crear tareas funcionales y tareas técnicas independientes.
- Establecer relaciones manuales entre elementos.
- Consultar relaciones entrantes y salientes desde cada elemento.
- Mostrar una matriz de trazabilidad básica.
- Detectar relaciones obligatorias faltantes.
- Crear integrantes y administrar roles básicos.
- Incorporar integrantes mediante enlaces de invitación controlados.
- Autenticar usuarios con correo y contraseña.
- Revisar las condiciones de preparación.
- Registrar la aprobación del propietario.
- Mantener la privacidad y la integridad básica de los datos.

### Funciones que pueden simplificarse o aplazarse

Si el calendario se reduce, se priorizarán las funciones de creación, relación, consulta y validación. Se podrán aplazar:

- comentarios;
- interfaz visible del historial de actividades;
- enlaces externos;
- otras funciones complementarias que no sean necesarias para validar la trazabilidad.

Los metadatos básicos de creación, modificación y autoría sí se conservarán cuando sean necesarios para permisos e integridad.

## 7. Entidades principales

### Entidades de planificación

- **Proyecto:** espacio de trabajo de un producto de software.
- **Objetivo:** resultado que el proyecto busca conseguir.
- **Requisito:** necesidad o capacidad que debe satisfacer el producto.
- **Historia de usuario:** necesidad expresada desde la perspectiva de un usuario.
- **Tarea:** trabajo necesario para implementar una funcionalidad o preparar el desarrollo.
- **Relación:** conexión entre elementos de planificación.

### Información estructurada del proyecto

En el MVP, los siguientes datos pertenecerán al proyecto y no serán nodos independientes de trazabilidad:

- problema;
- propuesta de solución;
- público objetivo;
- criterios de éxito;
- alcance.

Las reglas de negocio y los casos de uso podrán documentarse dentro de requisitos, pero no serán entidades independientes de trazabilidad en el MVP.

### Entidades de colaboración

El funcionamiento colaborativo requerirá, como mínimo:

- usuarios;
- membresías de proyecto;
- invitaciones;
- registros de aceptación de invitaciones;
- comentarios, si se incluyen en la primera entrega;
- registros básicos de actividad o autoría.

## 8. Plantillas y navegación

Planify ofrecerá plantillas base mantenidas por la plataforma.

Al crear un proyecto, el equipo recibirá una copia de la plantilla. Podrá adaptar esa copia, omitir secciones opcionales y completar la información sin modificar la plantilla original.

Los usuarios no podrán crear ni publicar plantillas propias durante el MVP.

El flujo recomendado será:

```text
Definición → Objetivos → Requisitos → Historias → Tareas → Revisión
```

La ruta orientará al equipo, pero no bloqueará la navegación libre entre secciones.

El primer ingreso mostrará una explicación breve y permitirá explorar un proyecto de ejemplo antes de crear un proyecto propio.

## 9. Roles y colaboración

El MVP tendrá tres roles por proyecto:

| Rol | Permisos principales |
|---|---|
| Propietario | Configura el proyecto, gestiona integrantes, transfiere propiedad, aprueba, archiva, restaura y puede eliminar el proyecto. |
| Editor | Crea y modifica elementos, administra relaciones y organiza el backlog. |
| Lector | Consulta el proyecto y sus comentarios, sin modificar contenido. |

Los permisos se aplicarán al proyecto completo; no habrá permisos independientes por sección en el MVP.

El propietario también podrá editar el contenido.

## 10. Invitaciones

### Regla de acceso

Un enlace de invitación no concede acceso por sí solo.

El flujo será:

```text
Abrir enlace → Autenticarse o registrarse → Aceptar invitación → Validar vigencia → Crear membresía
```

Antes de aceptar la invitación, la persona no podrá consultar datos del proyecto ni aparecer como integrante.

### Estado del enlace

Los estados del enlace serán:

- `activo`;
- `revocado`;
- `expirado`;
- `agotado`.

Un enlace puede ser aceptado varias veces y continuar activo mientras tenga usos disponibles.

### Registro de aceptación

Cada aceptación registrará:

- invitación utilizada;
- usuario que aceptó;
- proyecto asociado;
- rol asignado;
- fecha y hora.

El backend debe volver a verificar la vigencia al momento de aceptar, aunque el enlace haya sido válido al abrirse.

### Aceptación atómica

La aceptación debe realizarse dentro de una transacción segura:

1. Verificar estado, expiración y usos disponibles.
2. Comprobar que el usuario no tenga una membresía existente.
3. Crear la membresía con el rol asignado.
4. Registrar la aceptación.
5. Incrementar el contador de usos.
6. Marcar el enlace como `agotado` si alcanzó el límite.

Las operaciones deben protegerse frente a aceptaciones simultáneas. Si existe un solo uso disponible, solo una solicitud podrá consumirlo.

La base de datos debe impedir duplicados mediante restricciones equivalentes a:

```text
UNIQUE(project_id, user_id)
UNIQUE(invitation_id, user_id)
```

Repetir una solicitud ya procesada no debe crear otra membresía ni otro registro de aceptación.

## 11. Trazabilidad

### Cadena principal

```text
Objetivo → Requisito → Historia de usuario → Tarea
```

En la interfaz, la acción podrá llamarse `Relacionado con`, pero Planify reconocerá internamente las conexiones que forman parte de la cadena principal.

### Reglas estructurales

- Un objetivo puede relacionarse con varios requisitos.
- Un requisito puede relacionarse con varios objetivos y varias historias.
- Una historia puede relacionarse con varios requisitos y varias tareas.
- Una tarea técnica puede existir sin historia de usuario.
- Las relaciones secundarias pueden ser flexibles y no necesariamente forman parte de la cadena principal.
- Se evitarán relaciones duplicadas entre los mismos elementos.

La cadena principal mostrará dirección lógica. Las relaciones secundarias podrán mostrarse como asociaciones bidireccionales.

### Creación y consulta

Las relaciones se crearán mediante un botón `Relacionar`, con búsqueda y selección del elemento destino. El usuario podrá iniciar la operación desde cualquiera de los elementos relacionados.

Cada elemento mostrará sus relaciones entrantes y salientes. También existirá una matriz que permita identificar las conexiones principales existentes y faltantes.

## 12. Cobertura de trazabilidad

La cobertura medirá obligaciones estructurales, no la cantidad total de enlaces.

```text
Cobertura =
(obligaciones estructurales satisfechas /
 obligaciones estructurales aplicables) × 100
```

La cobertura se presentará por control cuando sea útil:

- objetivos vinculados con requisitos;
- requisitos vinculados con historias;
- historias con tareas cuando requieren implementación;
- criterios de aceptación completos cuando la regla sea aplicable.

Si no existen obligaciones aplicables, el resultado será `No aplica`, nunca 100 %.

Las tareas técnicas independientes no se contabilizarán como vínculos faltantes si no requieren una historia.

La validación del contenido mínimo del proyecto será independiente de la cobertura. Un proyecto vacío no podrá aprobarse aunque sus controles aparezcan como `No aplica`.

### Cobertura y precisión

Planify podrá comprobar automáticamente:

- que existen relaciones entre tipos permitidos;
- que las relaciones no están duplicadas;
- que se cumplen obligaciones estructurales;
- que existen los elementos mínimos requeridos.

Planify no podrá determinar automáticamente si una relación tiene sentido funcional.

La precisión funcional será evaluada por personas durante las pruebas:

```text
Precisión =
(relaciones funcionalmente correctas evaluadas /
 relaciones revisadas) × 100
```

## 13. Contenido mínimo y preparación

Un proyecto no podrá aprobarse si no contiene como mínimo:

- un objetivo activo;
- un requisito activo;
- una historia de usuario activa;
- criterios de aceptación completos cuando correspondan;
- tareas para las historias que requieran implementación;
- relaciones obligatorias de la cadena principal.

### Tipos de resultado de las comprobaciones

| Situación | Resultado |
|---|---|
| Contenido mínimo faltante | Bloquea |
| Relación obligatoria faltante | Bloquea |
| Elemento opcional incompleto | No bloquea |
| Elemento marcado como no aplicable mediante regla válida | No bloquea |
| Tarea técnica independiente sin historia | No bloquea |
| Relación secundaria faltante | No bloquea |
| Elemento archivado | No cuenta como activo |

### Estados del proyecto

- `borrador`: el equipo está elaborando la planificación;
- `en revisión`: el equipo está comprobando contenido y relaciones;
- `preparado`: el propietario confirmó que el proyecto puede iniciar desarrollo;
- `archivado`: el proyecto se conserva, pero deja de estar activo.

La aprobación requiere:

```text
contenido mínimo completo
+ criterios obligatorios completos
+ incumplimientos bloqueantes = 0
+ confirmación del propietario
```

## 14. Cambios que reabren un proyecto preparado

Un proyecto en estado `preparado` volverá a `en revisión` si se modifica información que pueda afectar la planificación o la trazabilidad.

| Cambio | ¿Reabre? |
|---|---:|
| Modificar descripción, alcance u objetivo | Sí |
| Crear, modificar o archivar un requisito | Sí |
| Crear, modificar o archivar una historia | Sí |
| Modificar sustancialmente una tarea | Sí |
| Crear, eliminar o modificar una relación relevante | Sí |
| Archivar un elemento necesario | Sí |
| Cambiar prioridad u orden de una tarea | No |
| Cambiar estado de una tarea | No |
| Añadir o editar un comentario | No |
| Modificar datos de perfil | No |
| Cambiar integrantes o roles | No, salvo que afecte permisos críticos del propietario |

Se considera modificación sustancial de una tarea cambiar su título, descripción, tipo, justificación o relación con un elemento trazable.

La aprobación registrará quién la realizó y cuándo.

## 15. Backlog

Las tareas tendrán estados fijos:

- `pendiente`;
- `en progreso`;
- `bloqueada`;
- `completada`.

La prioridad será opcional y podrá ser `baja`, `media` o `alta`.

El equipo podrá ordenar manualmente las tareas. La prioridad no reordenará automáticamente el backlog.

Las historias pueden tener varias tareas funcionales. También pueden existir tareas técnicas independientes para investigación, configuración, documentación o preparación del entorno.

## 16. Comentarios, enlaces externos e historial

Los comentarios, si se incluyen en la primera entrega, estarán asociados a requisitos, historias y tareas.

- Propietarios y editores pueden comentar.
- Lectores pueden consultar comentarios, pero no crearlos ni modificarlos.
- Cada usuario puede editar o eliminar sus propios comentarios.
- No habrá menciones, notificaciones avanzadas ni chat.

Los enlaces a Figma, Drive, GitHub y documentación externa quedan fuera del MVP si amenazan el calendario.

Los enlaces públicos de solo lectura también quedan fuera del MVP. Un docente deberá incorporarse como usuario con rol de lector mediante una invitación autenticada.

No habrá subida directa de archivos ni sincronización con herramientas externas.

El historial completo de versiones queda fuera. Se conservarán únicamente los metadatos y registros básicos necesarios para autoría, permisos e integridad.

## 17. Privacidad y autenticación

- Los proyectos serán privados por defecto.
- El acceso requerirá autenticación y membresía autorizada.
- El MVP usará correo y contraseña.
- Se incluirán recuperación de contraseña y verificación del correo.
- Google y otros proveedores quedan para versiones posteriores.
- No existirá acceso anónimo ni acceso por enlace público.

El propietario podrá transferir la propiedad a un editor mediante confirmación explícita. El propietario anterior pasará a ser editor, salvo que se cambie posteriormente su rol.

Un propietario no podrá abandonar el proyecto ni eliminar su cuenta si mantiene proyectos activos sin resolver primero la propiedad.

## 18. Archivado

Los elementos de planificación se archivarán en lugar de eliminarse inmediatamente.

Los elementos archivados:

- no aparecen en las vistas activas por defecto;
- conservan sus relaciones e historial disponible;
- pueden consultarse como archivados;
- no cuentan como elementos activos para la preparación;
- muestran a los elementos relacionados que el vínculo apunta a un elemento archivado.

Solo el propietario podrá restaurar un proyecto archivado. Los editores podrán solicitar la restauración, pero no ejecutarla directamente.

## 19. Validación con estudiantes

La validación tendrá dos etapas:

### Primera etapa: prueba técnica

Se utilizará un proyecto pequeño y controlado para comprobar:

- creación de elementos;
- relaciones;
- advertencias;
- matriz;
- permisos;
- invitaciones;
- operaciones básicas de preparación.

### Segunda etapa: validación con usuarios

Se probará Planify con equipos reales de estudiantes y proyectos de distinta complejidad.

Se observarán:

- tiempo para crear relaciones;
- cobertura de las obligaciones estructurales;
- precisión funcional de una muestra de relaciones;
- tiempo para consultar el origen o las conexiones de un elemento;
- vínculos omitidos o creados incorrectamente;
- esfuerzo percibido;
- abandonos o confusiones durante el flujo.

### Objetivos iniciales

- Al menos 80 % de participantes nuevos puede crear una relación sin asistencia.
- La relación se crea en un máximo de 60 segundos.
- El flujo requiere como máximo cuatro acciones principales después de abrir el elemento origen.
- Cobertura estructural inicial: al menos 80 %.
- Precisión funcional inicial: al menos 80 %.
- Consulta del origen o de las conexiones: menos de 60 segundos.

Estos valores serán revisados mediante una prueba piloto y deberán fijarse antes de la validación principal.

## 20. Criterio de cierre del MVP

El MVP estará listo cuando:

1. Un equipo pueda crear un proyecto desde una plantilla.
2. Pueda completar objetivos, requisitos, historias y tareas.
3. Pueda crear y consultar relaciones manuales.
4. Pueda visualizar la matriz de trazabilidad.
5. Pueda identificar relaciones y contenido faltantes.
6. Pueda colaborar mediante autenticación, invitaciones y roles.
7. El propietario pueda revisar y aprobar un proyecto válido.
8. Las pruebas técnicas no tengan errores críticos.
9. Las pruebas con estudiantes muestren que la trazabilidad aporta valor suficiente frente al esfuerzo de mantenerla.

Completar funcionalidades no será suficiente: el MVP debe demostrar el recorrido principal y la utilidad real de la trazabilidad manual.

## 21. Fuera del MVP

Quedan explícitamente fuera:

- gestión de cursos, docentes y grupos;
- inteligencia artificial;
- archivos adjuntos y almacenamiento propio;
- editores visuales de diagramas;
- integraciones sincronizadas;
- enlaces externos a recursos;
- enlaces públicos de solo lectura;
- acceso anónimo;
- invitaciones individualizadas por correo;
- historial completo de versiones y restauración;
- notificaciones avanzadas;
- analítica avanzada;
- metodologías configurables;
- tipos de relación personalizados;
- estados de tarea personalizados;
- plantillas creadas y publicadas por usuarios.

## 22. Riesgos principales

### Riesgo de adopción

Crear y mantener relaciones manuales puede resultar demasiado costoso para los estudiantes.

### Riesgo de alcance

Autenticación, membresías, invitaciones, permisos, matriz y validaciones pueden convertir el MVP en una aplicación más grande de lo previsto.

### Riesgo de interpretación

La cobertura estructural puede dar una falsa sensación de calidad si se confunde con precisión funcional. La interfaz y la documentación deben mantener ambas métricas separadas.

### Riesgo de aprobación artificial

Las reglas de preparación no deben permitir que un proyecto vacío sea aprobado simplemente porque no tiene incumplimientos aplicables.

## 23. Decisiones pendientes de diseño identificadas inicialmente

Esta sección conserva el listado original de temas que motivaron la revisión técnica. Sus resoluciones se incorporan en las secciones 24 a 29.

Estas decisiones no cambian el alcance funcional, pero deben cerrarse antes de implementar:

- tecnología y arquitectura de la aplicación;
- esquema exacto de base de datos;
- mecanismo mediante el cual un editor puede solicitar transferencia de propiedad;
- estrategia concreta de bloqueo o actualización atómica para aceptar invitaciones;
- definición final de los criterios de aceptación obligatorios por tipo de historia;
- diseño visual de la matriz de trazabilidad;
- umbrales definitivos después de la prueba piloto;
- política de conservación y eliminación definitiva de datos.

## 24. Stack tecnológico moderno propuesto

Se propone reemplazar el stack Laravel + Vue + Inertia + MySQL por un stack TypeScript full-stack, manteniendo la arquitectura monolítica modular y el modelo relacional.

- Arquitectura monolítica modular.
- Runtime: Node.js 24 LTS.
- Framework full-stack: Next.js 16.x con App Router.
- UI: React 19.x y TypeScript 7.x (TypeScript 5.x descartado: sigue la rama estable actual 7.x; `next build` usa su comprobador CLI, compatible con TypeScript 7).
- Estilos: Tailwind CSS 4.x.
- Componentes: shadcn/ui.
- Validación: Zod.
- Persistencia: Supabase Database, usando PostgreSQL administrado por Supabase.
- ORM y migraciones: Drizzle ORM + Drizzle Kit.
- Autenticación: Better Auth, con correo/contraseña, verificación de correo y recuperación de contraseña.
- Pruebas unitarias e integración: Vitest.
- Pruebas de navegador: `@playwright/test` como dependencia de desarrollo del proyecto.
- Gestión de paquetes: pnpm.
- Entorno local: no requiere Docker Compose; el desarrollo puede conectarse a un proyecto Supabase remoto.
- Sin microservicios, base de datos de grafos, Redis, API pública ni IA en el MVP.

### Organización arquitectónica

Los módulos internos serán identidad y acceso, proyectos, planificación, trazabilidad, preparación y colaboración/propiedad.

Next.js alojará la interfaz y el backend en una sola aplicación:

- App Router y Server Components para las lecturas de páginas.
- Server Actions o Route Handlers para operaciones de aplicación.
- Servicios de dominio en módulos independientes para reglas de negocio.
- Drizzle únicamente en el servidor, nunca desde componentes del navegador.
- Better Auth expuesto mediante su Route Handler de autenticación.

Las operaciones críticas de invitaciones, transferencia, aprobación y purga se ejecutarán en servicios de aplicación transaccionales, no directamente desde componentes de interfaz.

### Motivo de la propuesta

Este stack es más uniforme para el proyecto porque utiliza TypeScript de extremo a extremo, reduce la separación entre frontend y backend, permite expresar las claves foráneas compuestas directamente sobre PostgreSQL y conserva una arquitectura sencilla de desplegar.

Drizzle se elige sobre un ORM más abstracto porque el modelo de Planify depende de restricciones SQL explícitas, claves foráneas compuestas, índices y migraciones revisables. Las relaciones declaradas por el ORM no sustituirán las restricciones reales de PostgreSQL.

Supabase se utilizará principalmente como proveedor de PostgreSQL administrado. La aplicación no dependerá del Data API de Supabase para las operaciones principales: Next.js ejecutará las consultas desde el servidor mediante Drizzle.

En el MVP se mantendrá **Better Auth** como sistema de autenticación de la aplicación. No se combinarán Better Auth y Supabase Auth para las mismas cuentas, sesiones o permisos. Supabase Auth podrá evaluarse posteriormente como alternativa, pero no forma parte de esta decisión.

### Conexión a Supabase

- La cadena de conexión se almacenará únicamente en variables de entorno del servidor.
- Nunca se expondrán la contraseña de PostgreSQL, la clave `service_role` ni credenciales equivalentes al navegador.
- Para migraciones y operaciones administrativas se utilizará la conexión directa recomendada por Supabase.
- Para un backend persistente se preferirá la conexión directa o el pooler en modo sesión, según la red disponible.
- Si el despliegue utiliza funciones serverless, se evaluará el pooler en modo transacción y se desactivarán las prepared statements cuando corresponda.
- Las operaciones críticas seguirán siendo transacciones reales de PostgreSQL.

Aunque la aplicación no use el Data API desde el navegador, las tablas expuestas en el esquema público deberán tener una política de seguridad definida y RLS habilitado antes de exponerlas mediante APIs de Supabase.

Las operaciones que modifiquen varias entidades, como aceptación de invitaciones, transferencias de propiedad, aprobación y eliminación definitiva, deberán ejecutarse dentro de transacciones de PostgreSQL mediante Drizzle.

### Fuentes técnicas consultadas

- [Next.js App Router](https://nextjs.org/docs/app)
- [Guía de autenticación de Next.js](https://nextjs.org/docs/app/guides/authentication)
- [Better Auth con Next.js](https://better-auth.com/docs/integrations/next)
- [Better Auth: correo y contraseña](https://better-auth.com/docs/authentication/email-password)
- [Better Auth: adaptador Drizzle y generación de esquema](https://better-auth.com/docs/adapters/drizzle)
- [Better Auth: esquema de base de datos](https://better-auth.com/docs/concepts/database)
- [Drizzle ORM: PostgreSQL](https://orm.drizzle.team/docs/get-started/postgresql-existing)
- [Drizzle ORM: migraciones](https://orm.drizzle.team/docs/migrations)
- [Drizzle ORM: claves e índices](https://orm.drizzle.team/docs/indexes-constraints)
- [PostgreSQL 18](https://www.postgresql.org/docs/current/)
- [Supabase: conexión a PostgreSQL](https://supabase.com/docs/guides/database/connecting-to-postgres)
- [Supabase: Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase: SSR con Next.js](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vitest](https://vitest.dev/guide/)
- [Playwright](https://playwright.dev/docs/intro)
- [Next.js: mutaciones con Server Actions](https://nextjs.org/docs/app/getting-started/mutating-data)
- [Next.js: Backend for Frontend y Route Handlers](https://nextjs.org/docs/app/guides/backend-for-frontend)

> `playwright` será utilizado desde la instalación local del proyecto mediante `pnpm exec playwright ...`. No se dependerá de una instalación global de `playwright-cli`. La dependencia proporciona el runner, las aserciones, la configuración y el CLI local; los navegadores se instalarán como parte del entorno de pruebas según la documentación oficial.

## 25. Modelo de `planning_items`

### 25.1. Propósito

`planning_items` será la tabla común para los elementos trazables del MVP:

- `objective`;
- `requirement`;
- `user_story`;
- `task`.

Esto permite que las relaciones de trazabilidad apunten a una entidad común, mientras que los campos específicos se almacenan en tablas de detalle.

### 25.2. Estructura común

| Campo | Regla |
|---|---|
| `id` | Clave primaria |
| `project_id` | Obligatorio; proyecto propietario |
| `item_type` | `objective`, `requirement`, `user_story` o `task` |
| `title` | Obligatorio |
| `description` | Texto descriptivo |
| `lifecycle_status` | `active` o `archived` |
| `created_by` | Usuario creador; nullable para anonimización posterior |
| `updated_by` | Último usuario que modificó el elemento |
| `created_at` | Fecha de creación |
| `updated_at` | Fecha de modificación |
| `archived_at` | Nullable; fecha de archivado |

Debe existir un índice único sobre `(project_id, id)`. Aunque `id` sea la clave primaria, este índice es necesario para que otras tablas puedan utilizar claves foráneas compuestas que validen simultáneamente el proyecto y el elemento.

### 25.3. Tablas de detalle

#### `requirement_details`

- `item_id` es clave primaria y clave foránea hacia `planning_items`.
- `requirement_kind`: `functional`, `nonfunctional`, `business_rule` o `use_case`.
- `priority` es opcional.

Las reglas de negocio y los casos de uso serán categorías de requisitos, no nodos independientes.

#### `user_story_details`

- `item_id` es clave primaria y clave foránea hacia `planning_items`.
- `user_role`;
- `user_need`;
- `user_benefit`;
- `requires_implementation`, verdadero por defecto.

Solo existirá un tipo de historia de usuario en el MVP.

#### `story_acceptance_criteria`

Cada criterio será un registro independiente con:

- `id`;
- `story_item_id`;
- `criterion_text`, obligatorio y no vacío;
- `position`;
- `created_at` y `updated_at`.

Una historia podrá guardarse incompleta durante la planificación, pero no podrá contribuir a una aprobación válida si no cumple las reglas de criterios de aceptación.

#### `task_details`

- `item_id` es clave primaria y clave foránea hacia `planning_items`.
- `task_kind`: `functional` o `technical`.
- `work_status`: `pending`, `in_progress`, `blocked` o `completed`.
- `priority`: `low`, `medium`, `high` o `NULL`.
- `position`: orden manual dentro del backlog.

No habrá asignación obligatoria de responsables por tarea en el MVP.

### 25.4. Integridad de las relaciones

`traceability_links` tendrá:

| Campo | Regla |
|---|---|
| `id` | Clave primaria |
| `project_id` | Proyecto del vínculo |
| `source_item_id` | Elemento de origen |
| `target_item_id` | Elemento de destino |
| `link_kind` | `primary` o `secondary` |
| `note` | Justificación opcional |
| `created_by` | Usuario creador |
| `created_at` | Fecha de creación |

Las dos referencias a elementos utilizarán claves foráneas compuestas:

```text
(project_id, source_item_id)
  → planning_items(project_id, id)

(project_id, target_item_id)
  → planning_items(project_id, id)
```

Estas restricciones impiden que una relación conecte elementos de proyectos diferentes, incluso si los identificadores de elementos fueran válidos por separado.

También se aplicará:

```text
UNIQUE(project_id, source_item_id, target_item_id)
```

El backend impedirá que un elemento se relacione consigo mismo. Para relaciones secundarias, el backend normalizará el orden de los extremos antes de guardar para evitar duplicados invertidos.

La base de datos garantiza integridad referencial; el backend valida las combinaciones de tipos permitidas y determina si una relación es principal o secundaria.

### 25.5. Reglas de archivado

Archivar un `planning_item` no eliminará el registro ni sus relaciones. El elemento:

- dejará de aparecer en vistas activas por defecto;
- conservará su historial y sus vínculos;
- no contará como elemento activo para las comprobaciones de preparación;
- se mostrará como archivado en los elementos relacionados.

## 26. Migraciones recomendadas para `planning_items`

Las migraciones deben ejecutarse en un orden que permita crear las claves foráneas sin referencias incompletas:

1. Crear `projects` y `users`.
2. Crear `planning_items` con `project_id`, `item_type`, estados y auditoría usando Drizzle Kit y SQL generado revisable.
3. Crear el índice único `(project_id, id)`.
4. Crear `requirement_details`, `user_story_details`, `story_acceptance_criteria` y `task_details`.
5. Crear `traceability_links` con sus dos claves foráneas compuestas.
6. Crear `project_members`, invitaciones, aceptaciones y demás entidades colaborativas.
7. Añadir índices de consulta para proyecto, tipo, estado y relaciones.

Las migraciones deberán evitar depender únicamente de validaciones de Drizzle o del backend. Las restricciones únicas, las claves foráneas y los índices serán la última barrera de integridad.

### Pruebas de integridad mínimas

Antes de construir las pantallas, deben existir pruebas para comprobar que:

- un elemento pertenece a un único proyecto;
- no puede crearse un `planning_item` con un proyecto inexistente;
- una relación con un `source_item_id` de otro proyecto es rechazada;
- una relación con un `target_item_id` de otro proyecto es rechazada;
- una relación hacia un elemento inexistente es rechazada;
- no se permiten relaciones duplicadas;
- no se permite una relación de un elemento consigo mismo;
- archivar un elemento no elimina sus relaciones;
- una relación hacia un elemento archivado se conserva;
- las tablas de detalle no pueden apuntar a un `planning_item` inexistente;
- una historia puede tener varios criterios ordenados;
- una tarea técnica puede existir sin historia de usuario.

También debe comprobarse que las reglas de preparación ignoran elementos archivados y no exigen una historia para tareas técnicas independientes.

## 27. Ciclo de vida y eliminación de proyectos

### 27.1. Estados funcionales

El estado funcional del proyecto continuará siendo:

- `draft`;
- `in_review`;
- `ready`;
- `archived`.

La eliminación pendiente será un ciclo separado, representado por `deletion_requested_at` y `purge_after`. No debe confundirse con `archived`.

Cuando `deletion_requested_at` tenga valor, el proyecto estará pendiente de eliminación y no estará disponible para el uso normal de sus integrantes.

### 27.2. Flujo de eliminación

```text
Proyecto activo o archivado
→ Solicitud explícita del propietario
→ Período de recuperación de 30 días
→ Purga física controlada
```

La solicitud requerirá confirmación explícita, por ejemplo, escribiendo el nombre del proyecto.

Al solicitar la eliminación:

- se registra `deletion_requested_at`;
- se calcula `purge_after = deletion_requested_at + 30 días`;
- se bloquea el uso normal del proyecto;
- se revocan o invalidan las invitaciones activas;
- se conserva la información para permitir la recuperación durante el período.

El propietario podrá cancelar la solicitud dentro de los 30 días. Al cancelarla, se limpian los campos de eliminación pendiente y el proyecto vuelve a estar disponible con su estado funcional anterior.

### 27.3. Purga física

Después de `purge_after`, un proceso controlado eliminará físicamente el proyecto y sus datos dependientes:

- `planning_items`;
- tablas de detalle;
- criterios de aceptación;
- `traceability_links`;
- `project_members`;
- invitaciones y aceptaciones;
- solicitudes de transferencia;
- comentarios y actividad, si existen;
- configuraciones de secciones.

La purga debe ejecutarse con una transacción o con un proceso reintentable que registre su progreso. Debe respetar las claves foráneas y comprobar que no quedan registros dependientes.

Se recomienda usar `ON DELETE CASCADE` únicamente en tablas cuyo ciclo de vida dependa completamente de `projects`, complementándolo con un servicio de purga que valide el estado antes de eliminar.

No se eliminarán proyectos automáticamente por inactividad.

### 27.4. Pruebas del ciclo de eliminación

Las pruebas de integridad deben verificar que:

- solo el propietario puede solicitar la eliminación;
- la solicitud requiere confirmación explícita;
- un proyecto pendiente de eliminación no permite operaciones normales;
- el propietario puede cancelar la eliminación antes de `purge_after`;
- la cancelación restaura el estado funcional anterior;
- la purga no ocurre antes de la fecha programada;
- la purga elimina todos los dependientes;
- no quedan relaciones, membresías, invitaciones ni detalles huérfanos;
- una purga repetida es segura e idempotente;
- un proyecto archivado puede entrar en eliminación;
- un proyecto pendiente no puede recibir una transferencia de propiedad;
- una restauración desde una copia de seguridad no reintroduce proyectos cuya purga ya fue completada.

## 28. Eliminación de cuentas y conservación

Un propietario debe transferir la propiedad o eliminar permanentemente sus proyectos antes de completar la eliminación de su cuenta.

La solicitud de eliminación de cuenta tendrá un período de recuperación de 30 días. Después:

- se eliminarán credenciales y datos de contacto personales;
- se revocarán sesiones y accesos;
- se eliminarán membresías correspondientes;
- el contenido de proyectos de otros propietarios se conservará;
- la autoría histórica se anonimizará como `Usuario eliminado` cuando corresponda.

Los tokens de invitación se almacenarán únicamente como hash. Las invitaciones revocadas, agotadas o expiradas no podrán aceptarse.

Las copias de seguridad tendrán una retención máxima inicial de 30 días. La restauración deberá respetar las purgas ya completadas para no reintroducir datos eliminados.

## 29. Decisiones actualizadas

Con esta revisión dejan de estar pendientes los siguientes puntos:

- mecanismo de transferencia de propiedad mediante solicitud y aprobación;
- aceptación atómica de invitaciones con `SELECT ... FOR UPDATE` y restricciones únicas;
- criterios de aceptación obligatorios para historias;
- diseño inicial de la matriz en tres tramos;
- separación entre cobertura estructural automática y precisión funcional humana;
- ciclo de archivado, recuperación y purga física de proyectos.

Continúan sujetos a validación o elección final:

- diseño visual detallado de pantallas;
- umbrales finales después de la prueba piloto;
- revisión legal de conservación y protección de datos;
- implementación concreta del proceso de purga y de copias de seguridad.

## 30. Fuente de verdad para identidad y autenticación

### 30.1. Better Auth como esquema oficial

Planify no mantendrá una tabla `users` manual independiente de Better Auth.

La fuente de verdad para identidad será el esquema generado por Better Auth para Drizzle. Antes de crear las migraciones de la aplicación se deberá:

1. Configurar el adaptador de Better Auth para Drizzle con `provider: "pg"`.
2. Generar el esquema oficial mediante el CLI de Better Auth:

   ```text
   npx auth@latest generate --output src/db/auth-schema.ts
   ```

3. Revisar el esquema generado y conservarlo como referencia de las tablas de autenticación.
4. Generar las migraciones de Drizzle a partir de ese esquema.
5. Ejecutar la comprobación del esquema de Better Auth antes de integrar cambios de autenticación.

El comando y la salida exacta podrán variar con la versión instalada; la regla importante es que el esquema generado por Better Auth sea la fuente oficial y no una copia manual desactualizada.

### 30.2. Entidades de Better Auth

Better Auth requiere como mínimo las entidades conceptuales:

- `user`;
- `session`;
- `account`;
- `verification`.

Los identificadores de Better Auth son cadenas (`string`), que en PostgreSQL/Drizzle se representarán como `text`. Por tanto, todas las claves foráneas de Planify que apunten a una identidad utilizarán `text` y no `BIGINT`:

- `projects.owner_id`;
- `project_members.user_id`;
- `project_members.added_by`;
- `project_invitations.created_by`;
- `project_invitation_acceptances.user_id`;
- `ownership_transfer_requests.requested_by`;
- `ownership_transfer_requests.current_owner_at_request`;
- `ownership_transfer_requests.resolved_by`;
- `planning_items.created_by`;
- `planning_items.updated_by`;
- `traceability_links.created_by`.

Las tablas de Better Auth conservarán los campos y tipos producidos por el generador. Si Planify necesita nombres plurales o nombres de columnas distintos, se configurarán mediante `modelName` y `fields` de Better Auth, y se volverá a generar el esquema; no se cambiarán manualmente solo en la base de datos.

No se utilizará simultáneamente una tabla `users` propia y la tabla de usuario de Better Auth para representar la misma identidad.

### 30.3. Autenticación y Supabase

Supabase se utilizará como PostgreSQL administrado, pero Better Auth seguirá siendo el sistema de usuarios, sesiones y cuentas del MVP. No se mezclará la tabla `auth.users` de Supabase Auth con la tabla `user` de Better Auth.

## 31. Esquema relacional completo del MVP

Los tipos de dominio siguientes usan `BIGINT GENERATED BY DEFAULT AS IDENTITY`. Los identificadores de usuarios siempre usan `TEXT`, porque proceden de Better Auth.

### 31.1. `projects`

| Columna | Tipo | Nulable | Regla |
|---|---|---:|---|
| `id` | BIGINT | No | PK |
| `owner_id` | TEXT | No | FK a `user.id`; fuente canónica del propietario |
| `name` | VARCHAR(160) | No | Nombre del proyecto |
| `description` | TEXT | Sí | Descripción general |
| `problem` | TEXT | Sí | Problema |
| `solution_proposal` | TEXT | Sí | Propuesta |
| `target_audience` | TEXT | Sí | Público objetivo |
| `success_criteria` | TEXT | Sí | Criterios de éxito |
| `scope_in` | TEXT | Sí | Alcance incluido |
| `scope_out` | TEXT | Sí | Alcance excluido |
| `template_key` | VARCHAR(100) | No | Plantilla utilizada |
| `template_version` | VARCHAR(40) | No | Versión congelada en el proyecto |
| `status` | VARCHAR(20) | No | `draft`, `in_review`, `ready`, `archived` |
| `approved_by` | TEXT | Sí | FK a `user.id`; `ON DELETE SET NULL` |
| `approved_at` | TIMESTAMPTZ | Sí | Fecha de aprobación |
| `deletion_requested_at` | TIMESTAMPTZ | Sí | Inicio de recuperación |
| `purge_after` | TIMESTAMPTZ | Sí | Fecha mínima de purga |
| `created_at` | TIMESTAMPTZ | No | Auditoría |
| `updated_at` | TIMESTAMPTZ | No | Auditoría |

Restricciones e índices:

- `status` tendrá un `CHECK` con los cuatro valores permitidos.
- `purge_after` será posterior a `deletion_requested_at` cuando ambos existan.
- Índices sobre `(owner_id)`, `(status)` y `(purge_after)`.
- `owner_id` no se eliminará en cascada si se elimina una cuenta; la cuenta deberá transferir o eliminar sus proyectos antes de purgarse.

`projects.owner_id` es la fuente canónica del propietario. La membresía con rol `owner` es una representación derivada que debe mantenerse sincronizada.

### 31.2. `project_members`

| Columna | Tipo | Nulable | Regla |
|---|---|---:|---|
| `id` | BIGINT | No | PK |
| `project_id` | BIGINT | No | FK a `projects`; `ON DELETE CASCADE` |
| `user_id` | TEXT | No | FK a `user.id`; `ON DELETE RESTRICT` mientras sea miembro activo |
| `role` | VARCHAR(20) | No | `owner`, `editor`, `reader` |
| `joined_at` | TIMESTAMPTZ | No | Fecha de incorporación |
| `added_by` | TEXT | Sí | FK a `user.id`; `ON DELETE SET NULL` |

Restricciones e índices:

- `UNIQUE(project_id, user_id)`.
- `CHECK(role IN ('owner', 'editor', 'reader'))`.
- Índices sobre `(project_id, role)` y `(user_id)`.
- Índice único parcial: una sola membresía con `role = 'owner'` por proyecto.

La transferencia actualizará `projects.owner_id` y las filas de membresía dentro de la misma transacción. No se aceptará una transferencia que deje cero o más de un propietario.

### 31.3. `project_sections`

| Columna | Tipo | Nulable | Regla |
|---|---|---:|---|
| `id` | BIGINT | No | PK |
| `project_id` | BIGINT | No | FK a `projects`; `ON DELETE CASCADE` |
| `section_key` | VARCHAR(80) | No | Identificador estable de sección |
| `is_enabled` | BOOLEAN | No | `true` por defecto |
| `is_required` | BOOLEAN | No | `false` por defecto |
| `position` | INTEGER | No | Orden no negativo |

Restricciones e índices:

- `UNIQUE(project_id, section_key)`.
- `CHECK(position >= 0)`.
- Una sección requerida no podrá deshabilitarse.
- Índice sobre `(project_id, position)`.

### 31.4. `project_invitations`

| Columna | Tipo | Nulable | Regla |
|---|---|---:|---|
| `id` | BIGINT | No | PK |
| `project_id` | BIGINT | No | FK a `projects`; `ON DELETE CASCADE` |
| `created_by` | TEXT | Sí | FK a `user.id`; `ON DELETE SET NULL` |
| `token_hash` | TEXT | No | Único; nunca se almacena el token plano |
| `role` | VARCHAR(20) | No | Solo `editor` o `reader` |
| `status` | VARCHAR(20) | No | `active`, `revoked`, `expired`, `exhausted` |
| `max_uses` | INTEGER | No | Mayor que cero |
| `uses_count` | INTEGER | No | Entre cero y `max_uses` |
| `expires_at` | TIMESTAMPTZ | No | Fecha de expiración |
| `revoked_at` | TIMESTAMPTZ | Sí | Fecha de revocación |
| `created_at` | TIMESTAMPTZ | No | Auditoría |
| `updated_at` | TIMESTAMPTZ | No | Auditoría |

Restricciones e índices:

- `UNIQUE(token_hash)`.
- `CHECK(max_uses > 0)`.
- `CHECK(uses_count >= 0 AND uses_count <= max_uses)`.
- `CHECK(role IN ('editor', 'reader'))`.
- Índices sobre `(project_id, status)` y `(expires_at)`.

La aceptación se ejecutará en una transacción con bloqueo de la invitación. El enlace se vuelve `exhausted` al consumir el último uso.

### 31.5. `project_invitation_acceptances`

| Columna | Tipo | Nulable | Regla |
|---|---|---:|---|
| `id` | BIGINT | No | PK |
| `invitation_id` | BIGINT | No | FK a `project_invitations`; `ON DELETE CASCADE` |
| `project_id` | BIGINT | No | FK a `projects`; `ON DELETE CASCADE` |
| `user_id` | TEXT | Sí | FK a `user.id`; `ON DELETE SET NULL` para anonimización |
| `assigned_role` | VARCHAR(20) | No | Rol recibido |
| `accepted_at` | TIMESTAMPTZ | No | Fecha de aceptación |

Restricciones e índices:

- `UNIQUE(invitation_id, user_id)` cuando `user_id` no sea nulo.
- `CHECK(assigned_role IN ('editor', 'reader'))`.
- Índices sobre `(project_id, user_id)` y `(invitation_id)`.
- La aplicación impedirá aceptar una invitación si ya existe una membresía para `(project_id, user_id)`.

### 31.6. `ownership_transfer_requests`

| Columna | Tipo | Nulable | Regla |
|---|---|---:|---|
| `id` | BIGINT | No | PK |
| `project_id` | BIGINT | No | FK a `projects`; `ON DELETE CASCADE` |
| `requested_by` | TEXT | Sí | FK a `user.id`; `ON DELETE SET NULL` |
| `current_owner_at_request` | TEXT | Sí | FK a `user.id`; `ON DELETE SET NULL` |
| `status` | VARCHAR(20) | No | `pending`, `approved`, `rejected`, `cancelled`, `expired` |
| `reason` | TEXT | Sí | Motivo de la solicitud |
| `requested_at` | TIMESTAMPTZ | No | Fecha de solicitud |
| `expires_at` | TIMESTAMPTZ | No | Vigencia de 14 días |
| `resolved_by` | TEXT | Sí | FK a `user.id`; `ON DELETE SET NULL` |
| `resolved_at` | TIMESTAMPTZ | Sí | Fecha de resolución |

Restricciones e índices:

- Índice único parcial para permitir una sola solicitud pendiente por proyecto:

  ```sql
  CREATE UNIQUE INDEX ownership_transfer_one_pending
  ON ownership_transfer_requests (project_id)
  WHERE status = 'pending';
  ```

- Índices sobre `(project_id, status)`, `(requested_by)` y `(expires_at)`.
- `CHECK` para los estados permitidos.
- `expires_at > requested_at`.

### 31.7. Auditoría y autoría

Los campos de autoría de las tablas de Planify utilizarán el mismo tipo `TEXT` de Better Auth. Si una cuenta se elimina, los campos que deban conservar historial podrán pasar a `NULL` y la aplicación mostrará `Usuario eliminado`.

## 32. Transferencia de propiedad

### 32.1. Fuente de verdad

Se conservarán `projects.owner_id` y la membresía con `role = 'owner'` por razones de consulta y autorización, pero su relación será una invariante:

```text
projects.owner_id = project_members.user_id
cuando project_members.role = 'owner'
```

`projects.owner_id` será la fuente canónica. Toda operación que cambie el propietario deberá actualizar ambos lugares en una única transacción.

### 32.2. Flujo

1. Un editor solicita convertirse en propietario.
2. Se crea una fila `ownership_transfer_requests` en estado `pending`.
3. El propietario actual revisa la solicitud.
4. El propietario puede aprobarla o rechazarla.
5. El editor puede cancelarla mientras continúe pendiente.
6. Una tarea o comprobación de lectura puede marcarla como `expired` después de 14 días.
7. Si se aprueba, el solicitante pasa a `owner` y el propietario anterior pasa a `editor`.
8. La solicitud registra quién la resolvió y cuándo.

### 32.3. Propietario cambiado mientras existe una solicitud

La aprobación debe bloquear el proyecto y comprobar dentro de la misma transacción:

- que la solicitud sigue `pending`;
- que no ha expirado;
- que el proyecto no está archivado ni pendiente de eliminación;
- que `projects.owner_id` sigue siendo `current_owner_at_request`;
- que el solicitante sigue siendo un editor activo.

Si el propietario cambió, la solicitud no se aprobará con datos antiguos. Se marcará como `expired` o `rejected` con una razón de conflicto y el editor deberá crear una nueva solicitud.

La transferencia actualizará atómicamente:

```text
projects.owner_id
rol owner del propietario anterior → editor
rol editor del solicitante → owner
ownership_transfer_requests.status → approved
ownership_transfer_requests.resolved_by
ownership_transfer_requests.resolved_at
```

No se permitirá que el propietario abandone el proyecto sin transferirlo o resolver sus proyectos activos.

## 33. Arquitectura de mutaciones en Next.js

### Server Actions

Las mutaciones iniciadas desde la interfaz utilizarán Server Actions:

- crear o editar elementos;
- crear o eliminar relaciones;
- cambiar estados del backlog;
- archivar elementos;
- crear invitaciones;
- aceptar invitaciones desde el flujo autenticado;
- solicitar, aprobar, rechazar o cancelar transferencias;
- revisar y aprobar el proyecto.

Cada Server Action validará la entrada, comprobará la sesión y autorización, e invocará un servicio de servidor. No contendrá reglas críticas directamente mezcladas con JSX o componentes de presentación.

### Route Handlers

Los Route Handlers se reservarán para:

- el endpoint de Better Auth;
- webhooks o integraciones futuras que realmente necesiten HTTP;
- endpoints externos explícitos que se decidan posteriormente.

No se creará una API REST interna para reemplazar las Server Actions del flujo normal del MVP.

### Servicios de servidor

Las reglas críticas residirán en servicios del servidor, por ejemplo:

- `AcceptProjectInvitationService`;
- `TransferProjectOwnershipService`;
- `ApproveProjectReadinessService`;
- `PurgeProjectService`;
- `TraceabilityCoverageService`.

Estos servicios serán los responsables de transacciones, autorización de dominio, validaciones estructurales y actualización coordinada de varias tablas.

Los Server Components se utilizarán principalmente para lecturas y renderizado. La base de datos y las credenciales de Supabase nunca se importarán en componentes del navegador.

## 34. Pruebas adicionales antes de construir pantallas

Antes de implementar la interfaz deben existir pruebas para:

- que todos los FK de identidad aceptan el tipo `TEXT` generado por Better Auth;
- que no se cree una tabla de usuarios paralela;
- que una membresía no pueda apuntar a un usuario inexistente;
- que exista como máximo un propietario por proyecto;
- que `projects.owner_id` y el rol `owner` no puedan quedar desincronizados mediante los servicios de dominio;
- que no exista más de una solicitud de transferencia `pending` por proyecto;
- que una solicitud no pueda aprobarse después de expirar;
- que una solicitud falle si el propietario actual ya no coincide;
- que aprobar una transferencia actualice proyecto, membresías y solicitud de forma atómica;
- que rechazar o cancelar una solicitud no cambie la propiedad;
- que el endpoint de Better Auth sea el único Route Handler de autenticación;
- que las mutaciones de interfaz pasen por Server Actions y servicios de servidor;
- que las transacciones críticas se reviertan completamente ante un error.

