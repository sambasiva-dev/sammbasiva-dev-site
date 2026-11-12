import { c as createComponent, m as maybeRenderHead, e as renderScript, a as renderTemplate, d as createAstro, b as addAttribute, r as renderComponent, u as unescapeHTML, j as renderHead, f as renderSlot } from './astro/server-Cw8o-LKw.js';
import 'piccolore';
/* empty css                        */
import { s as site } from './site-DlKz-d-g.js';
import 'clsx';

const $$ThemeToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button class="theme-toggle" type="button" aria-label="Toggle color theme" title="Toggle theme"> <span class="theme-icon" aria-hidden="true">☼</span> </button> ${renderScript($$result, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/src/components/ThemeToggle.astro", void 0);

const $$Astro$2 = createAstro("https://www.sambasiva.dev");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  const { currentPath = "/" } = Astro2.props;
  const links = [
    { href: "/", label: "Home" },
    { href: "/blog/", label: "Blog" },
    { href: "/projects/", label: "Projects" },
    { href: "/expertise/", label: "Expertise" },
    { href: "/about/", label: "About" }
  ];
  return renderTemplate`${maybeRenderHead()}<header class="site-header"> <div class="container nav-wrap"> <a class="brand" href="/"${addAttribute(`${site.brand} home`, "aria-label")}> <span class="brand-mark">S</span><span>${site.brand}</span> </a> <nav class="desktop-nav" aria-label="Main navigation"> ${links.map((link) => renderTemplate`<a${addAttribute(["nav-link", currentPath === link.href ? "active" : ""], "class:list")}${addAttribute(link.href, "href")}>${link.label}</a>`)} <a${addAttribute(["nav-link", currentPath.startsWith("/tools") ? "active" : ""], "class:list")} href="/tools/">Tools</a> </nav> <div class="nav-actions"> <a class="icon-link github-link"${addAttribute(site.github, "href")} target="_blank" rel="noreferrer" aria-label="GitHub">GH ↗</a> ${renderComponent($$result, "ThemeToggle", $$ThemeToggle, {})} <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu"><span></span><span></span></button> </div> </div> <nav id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation" hidden> ${links.map((link) => renderTemplate`<a${addAttribute(["nav-link", currentPath === link.href ? "active" : ""], "class:list")}${addAttribute(link.href, "href")}>${link.label}</a>`)} <a${addAttribute(["nav-link", currentPath.startsWith("/tools") ? "active" : ""], "class:list")} href="/tools/">Tools & utilities ↗</a> <a class="nav-link"${addAttribute(`mailto:${site.email}`, "href")}>Contact ↗</a> <a class="nav-link"${addAttribute(site.github, "href")} target="_blank" rel="noreferrer">GitHub ↗</a> </nav> </header> ${renderScript($$result, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/src/components/Header.astro", void 0);

const $$Astro$1 = createAstro("https://www.sambasiva.dev");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="site-footer"> <div class="container footer-inner"> <p>© ${(/* @__PURE__ */ new Date()).getFullYear()} ${site.name}. Built with Astro and Markdown.</p> <div class="footer-links"> <a${addAttribute(site.github, "href")} target="_blank" rel="noreferrer">GitHub ↗</a> <a${addAttribute(site.linkedin, "href")} target="_blank" rel="noreferrer">LinkedIn ↗</a> <a${addAttribute(`mailto:${site.email}`, "href")}>Email ↗</a> </div> </div> </footer>`;
}, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://www.sambasiva.dev");
const $$SiteLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SiteLayout;
  const {
    title = site.brand,
    description = site.intro,
    currentPath = Astro2.url.pathname,
    type = "website",
    image = "/images/profile.jpg",
    publishedTime,
    modifiedTime,
    tags = [],
    jsonLd
  } = Astro2.props;
  const canonical = new URL(Astro2.url.pathname, Astro2.site).href;
  const imageUrl = new URL(image, Astro2.site).href;
  const jsonLdBlocks = jsonLd ? Array.isArray(jsonLd) ? jsonLd : [jsonLd] : [];
  return renderTemplate`<html lang="en" data-theme="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="description"${addAttribute(description, "content")}><meta name="theme-color" content="#0b1120"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title><link rel="canonical"${addAttribute(canonical, "href")}><meta property="og:site_name"${addAttribute(site.brand, "content")}><meta property="og:type"${addAttribute(type, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:url"${addAttribute(canonical, "content")}><meta property="og:image"${addAttribute(imageUrl, "content")}><meta name="twitter:card" content="summary"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(imageUrl, "content")}>${publishedTime && renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>`}${modifiedTime && renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>`}${tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`)}${jsonLdBlocks.map((data) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(data).replace(/</g, "\\u003c"))))}<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"><!-- <ClientRouter />-->${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, { "currentPath": currentPath })} <main>${renderSlot($$result, $$slots["default"])}</main> ${renderComponent($$result, "Footer", $$Footer, {})} ${renderScript($$result, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/src/layouts/SiteLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/src/layouts/SiteLayout.astro", void 0);

export { $$SiteLayout as $ };
