"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  IoCheckmarkCircle,
  IoDocumentTextOutline,
  IoGlobeOutline,
  IoOpenOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { SitePageContent } from "@/lib/cms";
import { routeLabels } from "@/lib/site";

export function AdminContentEditor({ pages }: { pages: SitePageContent[] }) {
  const [selectedRoute, setSelectedRoute] = useState(pages[0]?.route ?? "/");
  const selected = pages.find((page) => page.route === selectedRoute) ?? pages[0];

  if (!selected) return <p className="admin-empty">No hay páginas configuradas.</p>;

  return (
    <div className="admin-editor admin-content-editor">
      <aside className="admin-card admin-pages-list" aria-label="Páginas públicas">
        <div className="admin-pages-list__head">
          <div>
            <p className="admin-kicker">Mapa público</p>
            <h2>{pages.length} páginas</h2>
          </div>
          <IoDocumentTextOutline aria-hidden="true" />
        </div>
        <nav>
          {pages.map((page, index) => (
            <button
              className={page.route === selectedRoute ? "is-active" : ""}
              key={page.route}
              onClick={() => setSelectedRoute(page.route)}
              type="button"
            >
              <span className="admin-page-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="admin-page-name">
                <strong>{routeLabels[page.route]}</strong>
                <small>{page.route}</small>
              </span>
              <span className={`admin-page-state ${page.published ? "is-published" : ""}`}>
                {page.published ? "Online" : "Oculta"}
              </span>
            </button>
          ))}
        </nav>
        <p className="admin-pages-list__note">
          Selecciona una ruta para editar su aparición en buscadores y su cabecera pública.
        </p>
      </aside>

      <PageEditor key={selected.route} page={selected} />
    </div>
  );
}

function PageEditor({ page }: { page: SitePageContent }) {
  const [message, setMessage] = useState("");
  const [seoTitle, setSeoTitle] = useState(page.seo_title);
  const [seoDescription, setSeoDescription] = useState(page.seo_description);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="admin-page-form"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage("");
        const formData = new FormData(event.currentTarget);

        startTransition(async () => {
          const supabase = createSupabaseBrowserClient();
          const { error } = await supabase.rpc("admin_upsert_site_page_content", {
            target_route: page.route,
            next_seo_title: String(formData.get("seo_title") || ""),
            next_seo_description: String(formData.get("seo_description") || ""),
            next_hero_kicker: String(formData.get("hero_kicker") || ""),
            next_hero_title: String(formData.get("hero_title") || ""),
            next_hero_body: String(formData.get("hero_body") || ""),
            next_published: formData.get("published") === "on",
            change_reason: String(formData.get("reason") || ""),
          });

          setMessage(
            error
              ? error.message || "No se ha podido guardar."
              : "Cambios guardados y auditados. Recarga para ver el contenido actualizado.",
          );
        });
      }}
    >
      <header className="admin-form-toolbar">
        <div>
          <span className="admin-route-chip"><IoGlobeOutline aria-hidden="true" /> {page.route}</span>
          <h2>{routeLabels[page.route]}</h2>
        </div>
        <div className="admin-form-toolbar__actions">
          <Link href={page.route} target="_blank">
            Ver página <IoOpenOutline aria-hidden="true" />
          </Link>
          <label className="admin-switch">
            <input defaultChecked={page.published} name="published" type="checkbox" />
            <span aria-hidden="true" />
            Publicada
          </label>
        </div>
      </header>

      <section className="admin-form-section admin-form-section--seo">
        <header>
          <span>01</span>
          <div>
            <h3>Posicionamiento</h3>
            <p>Cómo aparece esta página al compartirla y en resultados de búsqueda.</p>
          </div>
        </header>
        <div className="admin-seo-layout">
          <div className="admin-field-stack">
            <label>
              <span>SEO title <small>{seoTitle.length}/70</small></span>
              <input
                value={seoTitle}
                onChange={(event) => setSeoTitle(event.target.value)}
                maxLength={70}
                minLength={4}
                name="seo_title"
                required
              />
            </label>
            <label>
              <span>SEO description <small>{seoDescription.length}/180</small></span>
              <textarea
                value={seoDescription}
                onChange={(event) => setSeoDescription(event.target.value)}
                maxLength={180}
                minLength={20}
                name="seo_description"
                required
              />
            </label>
          </div>
          <aside className="admin-search-preview" aria-label="Vista previa en buscadores">
            <div className="admin-search-preview__label"><IoSearchOutline aria-hidden="true" /> Vista previa</div>
            <span>colorclub.app{page.route}</span>
            <strong>{seoTitle || "Título de la página"}</strong>
            <p>{seoDescription || "Descripción de la página en buscadores."}</p>
          </aside>
        </div>
      </section>

      <section className="admin-form-section">
        <header>
          <span>02</span>
          <div>
            <h3>Cabecera pública</h3>
            <p>El primer mensaje que verá el usuario al entrar en esta ruta.</p>
          </div>
        </header>
        <div className="admin-hero-fields">
          <label>
            <span>Kicker <small>Máx. 40</small></span>
            <input defaultValue={page.hero_kicker} maxLength={40} minLength={2} name="hero_kicker" required />
          </label>
          <label>
            <span>Título <small>Máx. 90</small></span>
            <input defaultValue={page.hero_title} maxLength={90} minLength={4} name="hero_title" required />
          </label>
          <label className="admin-field-wide">
            <span>Texto introductorio <small>Máx. 320</small></span>
            <textarea defaultValue={page.hero_body} maxLength={320} minLength={20} name="hero_body" required />
          </label>
        </div>
      </section>

      <footer className="admin-save-bar">
        <label>
          <span>Motivo del cambio</span>
          <input name="reason" minLength={6} required placeholder="Ej. Ajuste del snippet para búsquedas" />
        </label>
        <button className="admin-button" disabled={isPending} type="submit">
          {isPending ? "Guardando..." : "Guardar y auditar"}
        </button>
        {message ? <p className="admin-message"><IoCheckmarkCircle aria-hidden="true" /> {message}</p> : null}
      </footer>
    </form>
  );
}
