import { c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate, e as renderScript, d as createAstro } from './astro/server-Cb1qvv7l.js';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro();
const $$CodeTabs = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CodeTabs;
  const { examples = [] } = Astro2.props;
  const id = `code-tabs-${Math.random().toString(36).slice(2, 9)}`;
  return renderTemplate`${maybeRenderHead()}<div class="code-tabs" data-code-tabs${addAttribute(id, "id")}> <div class="code-tabs-bar" role="tablist" aria-label="Code language"> ${examples.map((example, index) => renderTemplate`<button${addAttribute(["code-tab", index === 0 ? "selected" : ""], "class:list")} role="tab"${addAttribute(index === 0 ? "true" : "false", "aria-selected")} type="button"${addAttribute(index, "data-tab")}>${example.label}</button>`)} <span class="code-tabs-spacer"></span> <button class="copy-code" type="button" aria-label="Copy code" title="Copy code">Copy</button> </div> ${examples.map((example, index) => renderTemplate`<pre class="code-panel"${addAttribute(index, "data-panel")}${addAttribute(index !== 0, "hidden")}><code${addAttribute(`language-${example.language}`, "class")}>${example.code}</code></pre>`)} </div> ${renderScript($$result, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/src/components/CodeTabs.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/src/components/CodeTabs.astro", void 0);

export { $$CodeTabs as $ };
