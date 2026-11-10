import { c as createComponent, m as maybeRenderHead, f as renderScript, b as renderTemplate, a as addAttribute, e as renderComponent, d as createAstro, j as renderHead, r as renderSlot } from './astro/server-33mZK7WG.js';
import 'piccolore';
/* empty css                        */
import 'clsx';

const site = {
  name: "Sambasiva Reddy",
  brand: "sambasiva.dev",
  role: "Technology Leader · Software Architect · Engineer",
  intro: "I design and build scalable software systems, explore emerging technologies, mentor engineers to grow, and share the practical lessons I learn along the way.",
  experience: "22+",
  email: "sivarunreddy@gmail.com",
  github: "https://github.com/YOUR_GITHUB_USERNAME",
  linkedin: "https://www.linkedin.com/in/sambasiva-reddy-patti/",
  expertise: [
    { icon: "⌘", title: "Architecture", description: "Distributed systems, microservices, design patterns" },
    { icon: "✳", title: "AI Engineering", description: "Agents, RAG, Claude, LangChain" },
    { icon: "⌁", title: "Developer Tools", description: "Reusable tools, integrations, automation" },
    { icon: "↗", title: "Cloud & DevOps", description: "CI/CD, cloud-native delivery, observability" }
  ],
  skills: {
    "Backend": ["Java", "Spring Boot", ".NET", "Node.js", "Microservices"],
    "Frontend": ["JavaScript", "React", "Angular", "Vue", "Webpack", "Vite"],
    "Cloud & DevOps": ["AWS", "Azure", "Jenkins", "Azure DevOps", "GitHub Actions"],
    "AI & Data": ["Claude", "LangChain", "RAG", "PostgreSQL", "MongoDB", "Oracle", "Apache Druid"],
    "Platforms": ["Kong Gateway", "Apache NiFi", "Apache Doris", "StarRocks", "Cassandra"],
    "Domains": ["Banking", "Insurance", "eCommerce", "Retail", "Supply Chain"]
  }
};

const $$ThemeToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button class="theme-toggle" type="button" aria-label="Toggle color theme" title="Toggle theme"> <span class="theme-icon" aria-hidden="true">☼</span> </button> ${renderScript($$result, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/src/components/ThemeToggle.astro", void 0);

const $$Astro$2 = createAstro();
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

const $$Astro$1 = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="site-footer"> <div class="container footer-inner"> <p>© ${(/* @__PURE__ */ new Date()).getFullYear()} ${site.name}. Built with Astro and Markdown.</p> <div class="footer-links"> <a${addAttribute(site.github, "href")} target="_blank" rel="noreferrer">GitHub ↗</a> <a${addAttribute(site.linkedin, "href")} target="_blank" rel="noreferrer">LinkedIn ↗</a> <a${addAttribute(`mailto:${site.email}`, "href")}>Email ↗</a> </div> </div> </footer>`;
}, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/src/components/Footer.astro", void 0);

const $$Astro = createAstro();
const $$SiteLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SiteLayout;
  const { title = site.brand, description = site.intro, currentPath = Astro2.url.pathname } = Astro2.props;
  return renderTemplate`<html lang="en" data-theme="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="description"${addAttribute(description, "content")}><meta name="theme-color" content="#0b1120"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"><!-- <ClientRouter />-->${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, { "currentPath": currentPath })} <main>${renderSlot($$result, $$slots["default"])}</main> ${renderComponent($$result, "Footer", $$Footer, {})} ${renderScript($$result, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/src/layouts/SiteLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/src/layouts/SiteLayout.astro", void 0);

export { $$SiteLayout as $, site as s };
