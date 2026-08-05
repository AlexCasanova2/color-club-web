# Color Club Web — Brief De Implementación

## Instrucción Principal

Construye la web oficial de Color Club para promocionar la app, explicar cómo funciona, transmitir confianza y dirigir a las personas a descargarla. La web pública no es una versión web del juego: no permite crear clubs, participar en retos, subir collages, votar ni consultar la actividad personal.

El mismo proyecto incluye un área privada en `/internal-admin/*` para que el equipo autorizado pueda gestionar la aplicación y sus usuarios. Esta administración interna no forma parte de la experiencia promocional y nunca debe ser visible para visitantes normales.

## Ubicación De Los Proyectos

Este documento se ejecutará desde la raíz de `color-club-web/`.

```text
Tandem/
├── color-club/       # App móvil y backend Supabase existentes
└── color-club-web/   # Web promocional y administración interna
```

El proyecto móvil de referencia está en `../color-club/`. Usa estas fuentes, en este orden, para comprobar afirmaciones sobre el producto:

1. `../color-club/supabase/migrations/`, RLS y RPC vigentes.
2. Código actual y `../color-club/src/types/domain.ts`.
3. Este brief.
4. `../color-club/VISUAL_STYLE_GUIDE.md`.
5. `../color-club/README.md`.
6. `../color-club/color-challenge-app-spec.md`, que es histórico.

No copies afirmaciones antiguas sin contrastarlas. No presentes como disponible ninguna función que solo exista en la especificación histórica.

## Objetivos

- Explicar en pocos segundos qué es Color Club.
- Mostrar por qué jugar con amigos resulta divertido y diferente.
- Enseñar el ciclo club → reto → collage → votación → ranking.
- Resolver dudas sobre privacidad, fotos, votación y funcionamiento.
- Llevar al visitante a la descarga de la app.
- Conseguir una buena presencia en buscadores y al compartir enlaces.
- Proporcionar páginas legales y un canal de soporte.
- Dar al equipo una administración privada y segura de la app.

## No Es Una Web Jugable

La parte pública no debe incluir:

- Registro o login de jugadores.
- Home personal, Actividad, Amigos o Cuenta.
- Creación o unión a clubs.
- Detalle interactivo de clubs o retos reales.
- Subida de fotos o edición de collages.
- Votación, resultados personales o rankings privados.
- Chat de club.
- URLs públicas que expongan IDs internos de usuarios, clubs o retos.

Se permiten demostraciones visuales estáticas o animadas con datos ficticios claramente identificables como ejemplo.

## Stack

Implementa la web directamente en la raíz de `color-club-web/` con:

- Next.js con App Router y TypeScript estricto.
- Renderizado estático o de servidor para el contenido promocional.
- Supabase Auth solo para el acceso a administración interna.
- Supabase mediante operaciones protegidas para el panel interno.
- CSS global para tokens y CSS Modules o una solución equivalente sin introducir un design system genérico.
- Ionicons mediante una única integración consistente.
- Tests unitarios, de integración y end-to-end para los flujos críticos.

No importes componentes React Native. Puedes consultar tipos y constantes de `../color-club/`, pero el build de producción de `color-club-web` no debe depender de archivos fuera de su repositorio.

## Variables De Entorno

Variables públicas:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_CLAVE_ANON
NEXT_PUBLIC_APP_STORE_URL=
NEXT_PUBLIC_PLAY_STORE_URL=
NEXT_PUBLIC_SITE_URL=https://TU-DOMINIO
```

No inventes URLs de descarga. Si una tienda todavía no está disponible, oculta ese botón y muestra una alternativa configurada, como una lista de espera o “Próximamente”.

Nunca expongas al navegador:

- `SUPABASE_SERVICE_ROLE_KEY`
- `PUSH_WEBHOOK_SECRET`
- Tokens de EAS, GitHub o proveedores externos

Incluye `.env.example` sin valores reales y documenta qué variables se configuran en cada entorno.

## Arquitectura De Rutas

### Web Pública

| Ruta | Propósito |
| --- | --- |
| `/` | Landing principal y propuesta de valor |
| `/como-funciona` | Explicación completa del juego |
| `/seguridad` | Privacidad, acceso a fotos y protección de datos |
| `/soporte` | Preguntas frecuentes y contacto |
| `/privacidad` | Política de privacidad |
| `/terminos` | Términos de uso |

### Administración Interna

| Ruta | Acceso | Propósito |
| --- | --- | --- |
| `/internal-admin/login` | No autenticado | Acceso exclusivo del equipo |
| `/internal-admin` | `support` o superior | Resumen operativo |
| `/internal-admin/users` | `support` o superior | Usuarios y soporte |
| `/internal-admin/clubs` | `support` o superior | Clubs y actividad |
| `/internal-admin/challenges` | `moderator` o superior | Retos y moderación |
| `/internal-admin/reports` | `moderator` o superior | Cola de reportes |
| `/internal-admin/site-content` | `owner` | Contenido configurable de la web |
| `/internal-admin/admins` | `owner` | Administradores de plataforma |
| `/internal-admin/audit-log` | `owner` | Auditoría administrativa |

Las rutas públicas deben funcionar sin JavaScript para el contenido esencial. Refresh, apertura directa, metadata y páginas 404 deben funcionar en producción.

## Landing Principal

### Navegación

Usa una isla oscura flotante, no una barra convencional a todo el ancho.

- Marca Color Club.
- Enlaces a “Cómo funciona”, “Seguridad” y “Soporte”.
- CTA de descarga contextual.
- Menú compacto y accesible en móvil.
- No muestres enlaces a `/internal-admin` en la navegación pública.

### Hero

El hero debe comunicar el producto sin depender de párrafos largos:

- Kicker: “Retos de color con tus amigos”.
- Título editorial sugerido: “Sal a buscar tu color.”
- Descripción breve: crea un club, recibe un color, fotografía lo que encuentres y votad vuestros collages.
- CTA primario de descarga con la tienda disponible.
- CTA secundario “Ver cómo funciona”.
- Mockup o composición visual inspirada en la app, usando datos ficticios y assets autorizados.
- Formas geométricas suaves limitadas al área protagonista.

El texto final puede ajustarse, pero debe ser directo, natural y español. Evita lenguaje corporativo, promesas infladas y frases genéricas sobre “revolucionar” la creatividad.

### Cómo Funciona

Resume el ciclo en cuatro pasos:

1. Crea un club privado e invita a tus amigos.
2. Lanza un reto y recibe un color.
3. Encuentra, fotografía y monta tu collage.
4. Votad y subid posiciones en el ranking de temporada.

Usa una composición narrativa, no cuatro cards blancas idénticas. Cada paso debe tener un ejemplo visual y una frase corta.

### Modos De Reto

Explica sin sobrecargar:

- Color manual compartido.
- Color aleatorio compartido.
- Color aleatorio individual por participante.
- Collages configurables de 2, 4, 6, 8, 10 o 12 fotos.
- Duraciones desde 30 minutos hasta una semana.

No conviertas esta sección en una tabla técnica.

### Experiencia Social

Muestra los beneficios principales:

- Clubs privados de hasta 12 miembros.
- Collages ocultos hasta la fase correspondiente.
- Un voto por participante elegible y sin auto-voto.
- Ranking por temporadas.
- Chat privado, notificaciones y perfiles de amigos.

No publiques contenido real de usuarios. Todos los nombres, fotos, clubs y rankings mostrados en marketing deben ser ficticios, autorizados o creados específicamente para la web.

### Seguridad Y Privacidad

Incluye un bloque de confianza con enlace a `/seguridad`:

- Los clubs son privados.
- Los collages se almacenan en un bucket privado.
- Las fotos de otros participantes no se muestran antes de la fase permitida.
- Los perfiles públicos no exponen email, código de amigo ni preferencias privadas.
- El borrado de cuenta está disponible desde la app.

No hagas afirmaciones legales o técnicas que no estén respaldadas por la implementación actual.

### CTA Final

Cierra con una card protagonista de color y una única acción clara de descarga. Si no existe enlace de tienda disponible, muestra un estado honesto y configurable; no uses enlaces vacíos ni botones falsos.

### Footer

Incluye:

- Marca y descripción corta.
- Cómo funciona.
- Seguridad.
- Soporte.
- Privacidad.
- Términos.
- Enlaces de descarga disponibles.
- Copyright con año dinámico.

## Página Cómo Funciona

Explica el producto con más profundidad mediante un recorrido visual:

- Clubs e invitaciones.
- Creación y tipos de reto.
- Asignación o elección del color.
- Captura y composición del collage.
- Envío definitivo.
- Votación y descalificación por collage incompleto.
- Resultados y ranking de temporada.

Aclara que el cliente móvil inicia actualmente los retos de inmediato. No promociones programación de retos ni histórico navegable de temporadas mientras no estén expuestos en la app.

## Página Seguridad

Redacta contenido comprensible para usuarios, no una copia de las políticas SQL:

- Qué datos se guardan.
- Quién puede ver un club y sus collages.
- Cuándo se revelan las fotos.
- Qué información aparece en un perfil público.
- Cómo funcionan avatares y collages respecto a privacidad.
- Cómo eliminar la cuenta.
- Cómo contactar por una incidencia de seguridad o privacidad.

Los collages son privados. Los avatares usan almacenamiento público, por lo que la página debe explicarlo con lenguaje proporcionado y sin inducir a error.

## Soporte Y FAQ

Incluye respuestas verificadas para:

- Cómo crear o unirse a un club.
- Cuántas personas admite un club.
- Qué ocurre si no se termina un collage.
- Si se puede editar después de enviarlo.
- Cuándo se pueden ver los collages ajenos.
- Cómo funciona la votación.
- Por qué alguien no puede participar en un reto ya creado.
- Cómo recuperar la contraseña.
- Cómo eliminar la cuenta.
- Qué hacer si las notificaciones no llegan.

El canal de contacto debe configurarse mediante contenido real. No inventes direcciones de email.

## Identidad Visual

La referencia completa es `../color-club/VISUAL_STYLE_GUIDE.md`. La web debe sentirse como Color Club, no como una plantilla de startup.

### Tokens Base

```css
:root {
  --color-ink: #111217;
  --color-paper: #f8f8f5;
  --color-surface: #ffffff;
  --color-line: #e7e6e1;
  --color-muted: #777771;
  --color-danger: #b84038;
  --color-cobalt: #6f8ff7;
  --color-yellow: #ffc455;
  --color-green: #62c79b;
  --color-lavender: #ac98ff;
  --color-blue: #9fc5ff;
  --color-pink: #f08ce8;
  --color-orange: #ffb94f;
  --radius-sm: 14px;
  --radius-md: 18px;
  --radius-lg: 24px;
  --radius-xl: 30px;
  --shadow-soft: 0 8px 18px rgb(17 18 23 / 12%);
  --shadow-float: 0 14px 30px rgb(17 18 23 / 16%);
  --duration-fast: 140ms;
  --duration-base: 200ms;
  --duration-slow: 320ms;
  --ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Dirección De Arte

- Fondo `paper`, estructura `ink` y superficies blancas cálidas.
- Títulos editoriales grandes, pesados y alineados a la izquierda.
- Cards de color pastel en bloques completos.
- Radios de 24–30 px en componentes principales.
- Isla oscura flotante para navegación desktop.
- Formas geométricas solo en áreas protagonistas.
- Mockups y collages como contenido principal, no stock corporativo.
- Inter o el stack de sistema definido en la guía.

Evita gradientes genéricos morado-azul, glassmorphism excesivo, radios pequeños, botones primarios azules, ilustraciones SaaS, testimonios inventados y grids de cards idénticas.

### Responsive

Valida en 320, 390, 640, 1024 y 1440 px:

- Márgenes de 18 px en móvil.
- Titulares móviles de máximo 40 px.
- Contenedor de 1120–1200 px en desktop.
- Sin scroll horizontal accidental.
- Navegación y CTAs accesibles con safe areas.
- Imágenes con tamaños reservados para evitar saltos de layout.

## SEO Y Distribución

- Metadata única por página.
- Canonical configurado con `NEXT_PUBLIC_SITE_URL`.
- Open Graph y Twitter cards con imagen propia de Color Club.
- `sitemap.xml` y `robots.txt`.
- Datos estructurados apropiados para `SoftwareApplication` y FAQ cuando el contenido visible coincida.
- HTML semántico y contenido principal renderizado en servidor o estáticamente.
- Iconos, favicon y manifest coherentes con la marca.
- Página 404 diseñada.
- No indexar ninguna ruta `/internal-admin/*`.
- Añadir `X-Robots-Tag: noindex, nofollow` a respuestas administrativas.

No inventes ratings, número de usuarios, premios, testimonios ni disponibilidad en plataformas.

## Rendimiento Y Accesibilidad

- Objetivo Lighthouse de al menos 90 en Performance, Accessibility, Best Practices y SEO en las páginas públicas principales.
- WCAG 2.2 AA.
- Navegación completa por teclado.
- Foco visible de 3 px con `ink`.
- Área interactiva mínima de 44 × 44 px.
- Jerarquía correcta de headings.
- Alt text útil o imagen marcada como decorativa.
- Modales con gestión correcta de foco.
- Movimiento reducido con `prefers-reduced-motion`.
- Optimización de imágenes, fuentes y JavaScript.
- Evitar autoplay con sonido y animaciones que bloqueen lectura.

## Administración Interna

### Separación De Roles

La administración de plataforma es independiente de `club_members.role`. Un administrador de club solo gestiona su club y nunca accede al panel interno.

Roles de plataforma:

- `support`: consulta usuarios, clubs y estado operativo sin acciones destructivas.
- `moderator`: incluye soporte y puede resolver reportes u ocultar contenido mediante acciones auditadas.
- `owner`: acceso completo, administración de roles y acciones críticas.

No derives permisos de email, dominio, metadata editable por el usuario ni roles de club.

### Capacidades Del Panel

- Métricas agregadas de usuarios, clubs, retos activos, collages y actividad reciente.
- Búsqueda paginada de usuarios por UUID, username o email mediante servidor.
- Vista de usuario con alta, última actividad, clubs, retos y estado de moderación.
- Suspensión y reactivación con motivo obligatorio.
- Consulta de clubs, miembros, propietarios, configuración y actividad.
- Consulta y moderación de retos y contenido reportado.
- Cola de reportes con estados `open`, `reviewing`, `resolved` y `dismissed`.
- Registro de auditoría por actor, acción, recurso y fecha.
- Gestión de administradores de plataforma por un `owner`.
- Gestión opcional de FAQ, enlaces de descarga, contacto y avisos públicos si se decide almacenar ese contenido en Supabase.

No construyas un CRUD genérico, consola SQL ni explorador irrestricto de Storage. Cada mutación debe representar una operación de negocio concreta.

### Backend Administrativo

El esquema actual de `../color-club/` no contiene administradores globales. Se autoriza añadir la infraestructura mínima como nuevas migraciones y Edge Functions dentro de `../color-club/supabase/`, que seguirá siendo la fuente de verdad del backend.

Implementa:

- Tabla privada de administradores de plataforma con usuario, rol, estado, creador y timestamps.
- Función segura para comprobar el rol efectivo.
- Tabla append-only de auditoría administrativa.
- Tabla de reportes si no existe una alternativa equivalente.
- RPC protegidas para métricas y listados.
- Edge Functions para Auth Admin API y operaciones que necesiten `SUPABASE_SERVICE_ROLE_KEY`.
- RLS de denegación por defecto y grants mínimos.
- Migraciones nuevas; nunca edites migraciones ya aplicadas.

### Seguridad Del Panel

- Valida JWT y rol en cada RPC y Edge Function.
- Exige MFA y nivel AAL2 para todas las rutas y acciones administrativas.
- Usa `SUPABASE_SERVICE_ROLE_KEY` solo en Edge Functions y secrets de Supabase.
- No descargues listados completos; usa paginación, filtros y límites.
- Devuelve email y datos privados solo a operaciones autorizadas de soporte.
- Exige motivo para suspensiones, moderación y acciones destructivas.
- Registra las mutaciones de forma atómica con actor, rol, acción, recurso y motivo.
- Impide modificar o borrar auditoría desde la aplicación.
- Protege al último `owner` activo frente a borrado o degradación accidental.
- Aplica rate limiting a búsquedas y mutaciones.
- No registres secretos, tokens, hashes ni URLs firmadas persistentes.
- Añade cabeceras `Cache-Control: no-store` a contenido administrativo sensible.

### Primer Owner

Documenta un procedimiento manual para crear el primer `owner` mediante SQL controlado o un script local seguro. No incluyas un formulario público de alta de administradores ni hardcodees IDs o emails en el repositorio.

### Interfaz Del Panel

El panel puede ser más denso que la web promocional, pero conserva `paper`, `ink`, radios amplios, foco visible y estados claros. Usa tablas responsive, filtros, paginación y paneles de detalle. Optimiza operaciones complejas para desktop y deja las acciones destructivas separadas del CTA principal.

## Contenido Legal

Las páginas `/privacidad` y `/terminos` deben usar contenido revisado y aprobado por el responsable del producto. Si todavía no existe texto legal definitivo, crea la estructura y marca claramente el contenido como pendiente; no inventes cláusulas presentándolas como finales.

La fecha de entrada en vigor y el canal de contacto deben ser configurables.

## Analítica Y Consentimiento

- No añadas analítica por defecto sin decidir proveedor y base legal.
- Si se incorpora analítica no esencial, implementa consentimiento antes de cargarla cuando sea necesario.
- No uses datos de Supabase de usuarios para marketing analytics.
- Documenta eventos, retención y proveedor.
- Mantén la web funcional cuando el visitante rechace analítica opcional.

## Estados Obligatorios

Web pública:

- Enlace de tienda disponible, no disponible o próximamente.
- Imagen o mockup no disponible.
- Formulario o canal de soporte no configurado.
- 404.

Administración:

- Login, MFA pendiente y sesión expirada.
- Carga con skeleton.
- Vacío.
- Error recuperable.
- Sin permiso.
- Offline o backend no disponible.
- Mutación en curso, éxito y error.
- Contenido no encontrado.

## Pruebas

- Typecheck estricto y build de producción.
- Tests de navegación y CTAs públicos.
- Tests de metadata, canonical, sitemap y exclusión de `/internal-admin/*`.
- Tests de ausencia de funciones jugables en la web pública.
- Tests de contraste, foco y navegación por teclado.
- Tests de autorización para `support`, `moderator` y `owner`.
- Tests que rechacen usuarios normales y administradores de club.
- Tests de bloqueo administrativo sin AAL2.
- Tests de auditoría, suspensión/reactivación y protección del último `owner`.
- Test que compruebe que el bundle cliente no contiene `SUPABASE_SERVICE_ROLE_KEY`.
- End-to-end de visita → explicación → CTA de descarga.
- End-to-end de login administrativo → MFA → consulta autorizada → logout.

## Entregables

- Web completa en la raíz de `color-club-web/`.
- Páginas promocionales, legales y de soporte.
- Panel `/internal-admin/*` protegido.
- `README.md` con setup, variables, scripts, arquitectura y despliegue.
- `.env.example` sin secretos.
- Tests y comandos de validación.
- Assets optimizados y documentados.
- Configuración SEO, sitemap, robots y metadata social.
- Migraciones y Edge Functions administrativas nuevas en `../color-club/supabase/`.
- Procedimiento seguro para crear el primer `owner`.
- Documentación de cualquier diferencia necesaria respecto a `../color-club/`.

## Criterios De Aceptación

- La propuesta de valor se entiende en el primer viewport.
- La web explica el producto y dirige a descargarlo, pero no permite jugar.
- Todo contenido sobre funciones actuales coincide con la app móvil.
- Los enlaces de tienda dependen de configuración real y nunca son falsos.
- Las páginas públicas son indexables, rápidas, responsive y accesibles.
- Las páginas administrativas no son indexables ni aparecen en navegación pública.
- Un administrador de club no obtiene permisos de plataforma.
- Todas las operaciones privilegiadas se validan en servidor y quedan auditadas.
- Ningún secreto aparece en HTML, JavaScript cliente, logs o repositorio.
- Typecheck, tests y build pasan desde una instalación limpia.
- Los cambios de backend no rompen la app móvil y su typecheck continúa pasando.
