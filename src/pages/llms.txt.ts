import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

// llms.txt: a plain-text index of the site for AI assistants.
// Generated from the blog collection so it stays in sync with published posts.
export const GET: APIRoute = async ({ site: siteUrl }) => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const link = (path: string) => new URL(path, siteUrl).href;
  const articleLines = posts.map(post => {
    const slug = post.id.replace(/\.(md|mdx)$/, '');
    return `- [${post.data.title}](${link(`blog/${slug}/`)}): ${post.data.description}`;
  });

  const body = [
    `# ${site.name}`,
    '',
    `> ${site.intro}`,
    '',
    `${site.role}. ${site.tagline}`,
    '',
    '## Articles',
    '',
    ...articleLines,
    '',
    '## Pages',
    '',
    `- [Blog](${link('blog/')}): All engineering articles`,
    `- [Expertise](${link('expertise/')}): Technology experience across backend, frontend, cloud, AI and data`,
    `- [Projects](${link('projects/')}): Engineering case studies and developer tools`,
    `- [Tools](${link('tools/')}): Browser-based developer tools`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
