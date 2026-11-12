import { d as createAstro, c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate } from './astro/server-Cw8o-LKw.js';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro("https://www.sambasiva.dev");
const $$ArticleCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ArticleCard;
  const { post } = Astro2.props;
  const date = post.data.pubDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return renderTemplate`${maybeRenderHead()}<article class="article-card"> <div class="card-meta"><span class="category">${post.data.category}</span><span>${date}</span></div> <h3><a${addAttribute(`/blog/${post.id.replace(/\.(md|mdx)$/, "")}/`, "href")}>${post.data.title}</a></h3> <p>${post.data.description}</p> <div class="tag-list">${post.data.tags.slice(0, 3).map((tag) => renderTemplate`<span class="tag">${tag}</span>`)}</div> <a class="card-link"${addAttribute(`/blog/${post.id.replace(/\.(md|mdx)$/, "")}/`, "href")}>Read article <span aria-hidden="true">→</span></a> </article>`;
}, "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/src/components/ArticleCard.astro", void 0);

export { $$ArticleCard as $ };
