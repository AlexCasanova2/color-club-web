# Color Club Web

Web pública oficial de Color Club. Promociona y explica la app móvil, pero no permite jugar ni expone información de usuarios, clubs o retos reales.

## Requisitos

- Node.js 22
- npm 10

## Desarrollo

```bash
npm install
cp .env.example .env.local
npm run dev
```

La aplicación queda disponible en `http://localhost:3000`.

## Variables públicas

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_APP_STORE_URL` | Enlace oficial de App Store |
| `NEXT_PUBLIC_PLAY_STORE_URL` | Enlace oficial de Google Play |
| `NEXT_PUBLIC_WAITLIST_URL` | Alternativa cuando no hay tiendas disponibles |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Token público de Google Search Console |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Token público de Bing Webmaster Tools |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase para CMS y admin |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima pública protegida por RLS |

Si no hay tiendas ni lista de espera, la web muestra “Próximamente” sin crear botones falsos. El canal público de soporte es `info@getcolorclub.com`.

## Rutas

- `/`: landing principal
- `/como-funciona`: recorrido completo del juego
- `/soporte`: FAQ y contacto
- `/privacidad`: estructura legal condicionada a aprobación
- `/terminos`: estructura legal condicionada a aprobación
- `/aviso-legal`: identificación del prestador y reglas del sitio
- `/cookies`: tecnologías técnicas y consentimiento opcional
- `/normas-comunidad`: conducta y moderación
- `/contenido-y-fotos`: derechos, licencia y visibilidad de contenido
- `/eliminar-cuenta`: procedimiento y consecuencias del borrado

No existe ninguna ruta jugable. El panel `/internal-admin/*` está separado, protegido y excluido de indexación.

## SEO

- Metadata única, canonical absoluto y `hreflang` español por ruta.
- Origen canónico fijo en `https://getcolorclub.com` para evitar metadatos de entornos internos.
- Open Graph y Twitter con imágenes dinámicas generadas en `/api/og`.
- JSON-LD `Organization`, `WebSite`, `WebPage`, `SoftwareApplication`, `HowTo`, `FAQPage` y breadcrumbs según el contenido visible.
- Sitemap limitado a páginas publicadas e indexables, con `lastModified` del CMS.
- `robots.txt`, `llms.txt`, manifest y páginas legales condicionadas a aprobación.
- ISR cada cinco minutos para actualizar contenido y SEO del CMS sin rebuild completo.
- Soporte para verificación de Google Search Console y Bing Webmaster Tools.

## Validación

```bash
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Las pruebas cubren configuración de descarga, contenido funcional sensible, sitemap, robots, navegación pública, funcionamiento esencial sin JavaScript y metadata canónica.

## Arquitectura

- `app/`: rutas, metadata, sitemap, robots, manifest y Open Graph
- `components/`: navegación, footer, CTAs y visuales reutilizables
- `lib/site.ts`: configuración pública y resolución de estados
- `lib/content.ts`: contenido funcional verificado y FAQ
- `tests/`: pruebas unitarias e integración
- `e2e/`: recorridos públicos con Playwright

Todo el contenido esencial se renderiza en servidor. Los únicos visuales de producto son composiciones CSS ficticias y el icono autorizado copiado al propio repositorio, por lo que el build no depende de `../color-club`.

## Despliegue

1. Configura las variables del entorno de producción.
2. Ejecuta `npm ci`, `npm run typecheck`, `npm test` y `npm run build`.
3. Verifica las URLs canónicas, tiendas, soporte y páginas legales en el despliegue final.
La web no incluye analítica ni cookies no esenciales por defecto.

## Admin de páginas y SEO

El panel privado vive en `/internal-admin/*` y no aparece en navegación pública. Requiere:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Migración `../color-club/supabase/migrations/202607280001_platform_page_cms.sql` aplicada en el proyecto Supabase.

El editor disponible en `/internal-admin/site-content` permite modificar por página:

- `seo_title`
- `seo_description`
- `hero_kicker`
- `hero_title`
- `hero_body`
- estado `published`

Solo usuarios con rol de plataforma `owner` pueden guardar cambios. Cada mutación exige motivo y crea una fila en `platform_admin_audit_log`.

### Crear el primer owner

Ejecuta este SQL de forma manual y controlada en Supabase SQL Editor, sustituyendo el UUID por el usuario real ya creado en Auth:

```sql
insert into public.platform_admins (user_id, role, status, created_by)
values ('00000000-0000-0000-0000-000000000000', 'owner', 'active', null);
```

No hardcodees emails ni UUIDs en el repositorio. Después de crear el primer `owner`, entra por `/internal-admin/login` con ese usuario.

## Contenido legal

Las políticas públicas se mantienen en `lib/legal.ts` para que su identidad, fechas y cuerpo no dependan del CMS editorial. Los textos reflejan el funcionamiento comunicado del producto y deben revisarse profesionalmente cuando cambien los proveedores, la infraestructura, los plazos internos o las funciones de la app.
