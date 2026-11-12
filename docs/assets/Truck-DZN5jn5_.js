import { c as createComponent, m as maybeRenderHead, s as spreadAttributes, b as addAttribute, f as renderSlot, a as renderTemplate, d as createAstro, r as renderComponent } from './astro/server-Cw8o-LKw.js';
import 'piccolore';
import 'clsx';

const $$Astro$5 = createAstro("https://www.sambasiva.dev");
const $$ = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$;
  const size = Astro2.props.size;
  const cls = Astro2.props.class;
  const name = Astro2.props.iconName;
  delete Astro2.props.size;
  delete Astro2.props.class;
  delete Astro2.props.iconName;
  const props = Object.assign({
    "xmlns": "http://www.w3.org/2000/svg",
    "stroke-width": 2,
    "width": size ?? 24,
    "height": size ?? 24,
    "stroke": "currentColor",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "fill": "none",
    "viewBox": "0 0 24 24"
  }, Astro2.props);
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(["lucide", { [`lucide-${name}`]: name }, cls], "class:list")}> ${renderSlot($$result, $$slots["default"])} </svg>`;
}, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/node_modules/lucide-astro/dist/.Layout.astro", void 0);

const $$Astro$4 = createAstro("https://www.sambasiva.dev");
const $$Landmark = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Landmark;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "landmark", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M10 18v-7"></path> <path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"></path> <path d="M14 18v-7"></path> <path d="M18 18v-7"></path> <path d="M3 22h18"></path> <path d="M6 18v-7"></path> ` })}`;
}, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/node_modules/lucide-astro/dist/Landmark.astro", void 0);

const $$Astro$3 = createAstro("https://www.sambasiva.dev");
const $$ShieldCheck = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ShieldCheck;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "shield-check", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path> <path d="m9 12 2 2 4-4"></path> ` })}`;
}, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/node_modules/lucide-astro/dist/ShieldCheck.astro", void 0);

const $$Astro$2 = createAstro("https://www.sambasiva.dev");
const $$ShoppingCart = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ShoppingCart;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "shopping-cart", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<circle cx="8" cy="21" r="1"></circle> <circle cx="19" cy="21" r="1"></circle> <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path> ` })}`;
}, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/node_modules/lucide-astro/dist/ShoppingCart.astro", void 0);

const $$Astro$1 = createAstro("https://www.sambasiva.dev");
const $$Store = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Store;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "store", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"></path> <path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"></path> <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"></path> ` })}`;
}, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/node_modules/lucide-astro/dist/Store.astro", void 0);

const $$Astro = createAstro("https://www.sambasiva.dev");
const $$Truck = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Truck;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "truck", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path> <path d="M15 18H9"></path> <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path> <circle cx="17" cy="18" r="2"></circle> <circle cx="7" cy="18" r="2"></circle> ` })}`;
}, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/node_modules/lucide-astro/dist/Truck.astro", void 0);

export { $$Landmark as $, $$ShieldCheck as a, $$ShoppingCart as b, $$Store as c, $$Truck as d };
