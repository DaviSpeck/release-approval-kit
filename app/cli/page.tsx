"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/theme-toggle";
import LocaleToggle from "@/components/locale-toggle";
import { useLocale } from "@/components/locale";
import { useScrollDeck } from "@/components/use-scroll-deck";
import { trackEvent } from "@/components/public-events";
import SiteFooter from "@/components/site-footer";

const CLI_REPO_URL = "https://github.com/DaviSpeck/nexo-cli";
const CLI_GUIDE_URL = "https://github.com/DaviSpeck/nexo/blob/main/CLI.md";
const CLI_GUIDE_URL_PT = "https://github.com/DaviSpeck/nexo/blob/main/CLI.pt-BR.md";
const CLI_INSTALL_COMMAND = "npm install -g nexo-md-to-pdf-cli";
const CLI_RUN_COMMAND = "nexo release-summary.md";
const CLI_BATCH_COMMAND = "nexo a.md b.md --output-dir ./pdfs";
const CLI_SET_LOGO_COMMAND = "nexo config set-logo ./brand.svg --logo-tone light";
const CLI_SHOW_CONFIG_COMMAND = "nexo config show";

const copy = {
  pt: {
    navProduct: "Produto",
    navHow: "Como funciona",
    navFree: "Teste grátis",
    navCli: "CLI",
    navSupport: "Suporte",
    navPlans: "Planos",
    ctaWaitlist: "Entrar na lista",
    ctaTry: "Testar agora",
    badge: "CLI OFICIAL",
    title: "Use a NEXO pela linha de comando, com a mesma infraestrutura do produto.",
    subtitle:
      "A CLI oficial envia as conversões para a API hospedada da NEXO, mantendo layout, limites do modo Free e contagem de uso centralizados no backend.",
    proof1: "Comando global",
    proof2: "Mesma API do produto",
    proof3: "Origem CLI no Supabase",
    sectionInstall: "Instalação",
    sectionUsage: "Uso",
    sectionBatch: "Lote",
    sectionBranding: "Branding persistente",
    sectionConfig: "Configuração",
    installTitle: "1. Instale globalmente",
    installBody:
      "Use npm para disponibilizar o comando na máquina. Depois disso, a execução fica simples e direta para qualquer markdown.",
    usageTitle: "2. Converta um arquivo ou rode em lote",
    usageBody:
      "Cada `.md` vira uma conversão separada. Isso facilita automação local, scripts e rotinas em CI sem misturar arquivos no mesmo comando.",
    brandingTitle: "3. Salve uma logo padrão uma vez",
    brandingBody:
      "Se você sempre usa a mesma marca, configure a logo uma vez com a CLI. Depois disso, conversões simples com `nexo arquivo.md` já reutilizam esse branding por padrão.",
    currentScopeTitle: "Escopo atual da CLI",
    currentScopeBody:
      "A primeira versão da CLI é focada em markdown, logo opcional e logo padrão salva localmente. Fluxos com anexos continuam melhores na aplicação web.",
    scope1: "Conversão de Markdown suportada",
    scope2: "Logo opcional e logo padrão salvas",
    scope3: "Anexos fora do escopo da v1",
    repoCta: "Abrir repositório da CLI",
    guideCta: "Ver guia no repo principal",
    freeCta: "Testar Free no navegador",
    supportTitle: "Mesma fonte de verdade",
    supportBody:
      "Como a CLI usa nexo.speck-solutions.com.br/api/free/convert, o uso continua contado no Supabase e o backend distingue WEBSITE e CLI.",
  },
  en: {
    navProduct: "Product",
    navHow: "How it works",
    navFree: "Free trial",
    navCli: "CLI",
    navSupport: "Support",
    navPlans: "Plans",
    ctaWaitlist: "Join waitlist",
    ctaTry: "Try now",
    badge: "OFFICIAL CLI",
    title: "Use NEXO from the command line with the same infrastructure as the product.",
    subtitle:
      "The official CLI sends conversions to the hosted NEXO API, keeping layout, free-mode limits, and usage counting centralized in the backend.",
    proof1: "Global command",
    proof2: "Same product API",
    proof3: "CLI origin in Supabase",
    sectionInstall: "Install",
    sectionUsage: "Usage",
    sectionBatch: "Batch",
    sectionBranding: "Saved branding",
    sectionConfig: "Config",
    installTitle: "1. Install globally",
    installBody:
      "Use npm to make the command available on your machine. After that, running conversions stays simple for any markdown file.",
    usageTitle: "2. Convert one file or run in batch",
    usageBody:
      "Each `.md` becomes its own conversion job. That makes local automation, scripts, and CI routines easier without mixing files in the same command.",
    brandingTitle: "3. Save a default logo once",
    brandingBody:
      "If you always use the same brand asset, configure it once in the CLI. After that, plain `nexo file.md` conversions automatically reuse that branding by default.",
    currentScopeTitle: "Current CLI scope",
    currentScopeBody:
      "The first CLI version focuses on markdown, optional logo, and a saved local default logo. Attachment-heavy workflows are still better handled in the web app.",
    scope1: "Markdown conversion supported",
    scope2: "One-off and saved default logos supported",
    scope3: "Attachments out of scope for v1",
    repoCta: "Open CLI repository",
    guideCta: "View guide in main repo",
    freeCta: "Try Free in the browser",
    supportTitle: "Same source of truth",
    supportBody:
      "Because the CLI uses nexo.speck-solutions.com.br/api/free/convert, usage keeps being counted in Supabase and the backend distinguishes WEBSITE and CLI.",
  }
} as const;

export default function CliPage() {
  useScrollDeck();
  const pathname = usePathname();
  const { locale } = useLocale();
  const c = copy[locale];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isCliActive = pathname === "/cli";

  useEffect(() => {
    void trackEvent({
      eventName: "page_view",
      eventSource: "web_ui",
      path: "/cli",
      payload: { page: "cli" }
    });
  }, []);

  useEffect(() => {
    const shouldLockScroll = mobileMenuOpen;
    document.body.style.overflow = shouldLockScroll ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <>
      <main className="sales-page motion-root">
        <div className="page-nav-shell motion rise-1">
          <header className="pricing-top hero-nav landing-nav">
            <Link href="/" className="hero-brand hero-brand-link">
              <img alt="NEXO" src="/brand/nexo_logo_primary.svg" />
              <strong>NEXO</strong>
            </Link>

            <button
              className="nav-menu-toggle"
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="landing-nav-links"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>

            <div
              className={`landing-nav-panel ${mobileMenuOpen ? "is-open" : ""}`}
              id="landing-nav-links"
            >
              <nav>
                <Link href="/" onClick={closeMenu}>
                  {c.navProduct}
                </Link>
                <Link href="/#como-funciona" onClick={closeMenu}>
                  {c.navHow}
                </Link>
                <Link href="/#free-converter" onClick={closeMenu}>
                  {c.navFree}
                </Link>
                <Link
                  href="/cli"
                  className={isCliActive ? "nav-link-active" : undefined}
                  aria-current={isCliActive ? "page" : undefined}
                  onClick={closeMenu}
                >
                  {c.navCli}
                </Link>
                <Link href="/suporte" onClick={closeMenu}>
                  {c.navSupport}
                </Link>
                <Link href="/pricing" onClick={closeMenu}>
                  {c.navPlans}
                </Link>
              </nav>

              <div className="hero-nav-actions">
                <LocaleToggle />
                <ThemeToggle />
                <Link className="btn-nav-ghost" href="/pricing" onClick={closeMenu}>
                  {c.ctaWaitlist}
                </Link>
                <Link className="btn-nav-solid" href="/#free-converter" onClick={closeMenu}>
                  {c.ctaTry}
                </Link>
              </div>
            </div>
          </header>
        </div>

        <section className="nexo-hero-wrap section-transition motion rise-1">
          <div className="hero-grid landing-hero-grid" data-deck-group>
            <div className="deck-card hero-copy-card">
              <p className="hero-badge">{c.badge}</p>
              <h1>{c.title}</h1>
              <p className="hero-copy">{c.subtitle}</p>

              <div className="hero-cta-row">
                <a className="btn-cta-main" href={CLI_REPO_URL} target="_blank" rel="noreferrer">
                  {c.repoCta}
                </a>
                <Link className="btn-cta-alt" href="/#free-converter">
                  {c.freeCta}
                </Link>
              </div>

              <div className="hero-proof-list">
                <span>{c.proof1}</span>
                <span>{c.proof2}</span>
                <span>{c.proof3}</span>
              </div>
            </div>

            <aside className="hero-visual deck-card">
              <div className="hero-visual-head">
                <small>NEXO CLI</small>
                <strong>Markdown in, hosted PDF out</strong>
                <p>{c.supportBody}</p>
              </div>

              <div className="hero-flow-canvas" aria-hidden="true">
                <div className="hero-flow-card">
                  <span>{c.sectionInstall}</span>
                  <strong>npm</strong>
                  <ul>
                    <li>{CLI_INSTALL_COMMAND}</li>
                  </ul>
                </div>
                <div className="hero-flow-arrow">
                  <span />
                </div>
                <div className="hero-flow-card hero-flow-card-output">
                  <span>{c.sectionUsage}</span>
                  <strong>nexo</strong>
                  <ul>
                    <li>{CLI_RUN_COMMAND}</li>
                    <li>{CLI_BATCH_COMMAND}</li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="section-transition motion rise-2">
          <div className="landing-section-shell">
            <div className="landing-section-head">
              <p className="section-kicker">CLI</p>
              <h2>{c.currentScopeTitle}</h2>
              <p>{c.currentScopeBody}</p>
            </div>

            <div className="landing-cli-grid" data-deck-group>
              <article className="deck-card landing-cli-card">
                <strong>{c.installTitle}</strong>
                <p>{c.installBody}</p>
                <small>{c.sectionInstall}</small>
                <pre className="landing-cli-code">
                  <code>{CLI_INSTALL_COMMAND}</code>
                </pre>
              </article>

              <article className="deck-card landing-cli-card">
                <strong>{c.usageTitle}</strong>
                <p>{c.usageBody}</p>
                <small>{c.sectionUsage}</small>
                <pre className="landing-cli-code">
                  <code>{CLI_RUN_COMMAND}</code>
                </pre>
                <small>{c.sectionBatch}</small>
                <pre className="landing-cli-code">
                  <code>{CLI_BATCH_COMMAND}</code>
                </pre>
              </article>

              <article className="deck-card landing-cli-card landing-cli-card-highlight">
                <strong>{c.brandingTitle}</strong>
                <p>{c.brandingBody}</p>
                <small>{c.sectionBranding}</small>
                <pre className="landing-cli-code">
                  <code>{CLI_SET_LOGO_COMMAND}</code>
                </pre>
                <small>{c.sectionConfig}</small>
                <pre className="landing-cli-code">
                  <code>{CLI_SHOW_CONFIG_COMMAND}</code>
                </pre>
                <div className="landing-cli-actions">
                  <a className="btn-cta-alt" href={CLI_REPO_URL} target="_blank" rel="noreferrer">
                    {c.repoCta}
                  </a>
                  <a
                    className="btn-cta-main"
                    href={locale === "pt" ? CLI_GUIDE_URL_PT : CLI_GUIDE_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {c.guideCta}
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section-transition motion rise-2">
          <div className="landing-section-shell landing-support-shell">
            <div className="landing-section-head">
              <p className="section-kicker">Scope</p>
              <h2>{c.supportTitle}</h2>
              <p>{c.supportBody}</p>
            </div>

            <div className="landing-support-grid" data-deck-group>
              <article className="deck-card landing-support-card">
                <ul>
                  <li>{c.scope1}</li>
                  <li>{c.scope2}</li>
                  <li>{c.scope3}</li>
                </ul>
              </article>
              <article className="deck-card landing-support-card">
                <Link className="btn-cta-alt" href="/#free-converter">
                  {c.freeCta}
                </Link>
              </article>
            </div>
          </div>
        </section>
      </main>

      <div className="page-footer-wrap">
        <SiteFooter />
      </div>
    </>
  );
}
