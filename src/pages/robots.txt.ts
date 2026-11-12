import type { APIRoute } from 'astro';

// Allow search engines and AI assistants to read the site, and point them at the sitemap.
// The named AI user agents are listed explicitly so the intent is visible in the file.
const AI_AND_SEARCH_BOTS = [
  'Googlebot',
  'Bingbot',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Google-Extended',
];

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('sitemap-index.xml', site);
  const groups = [
    'User-agent: *',
    'Allow: /',
    '',
    ...AI_AND_SEARCH_BOTS.flatMap(bot => [`User-agent: ${bot}`, 'Allow: /', '']),
    `Sitemap: ${sitemapUrl.href}`,
    `# AI-readable index of articles: ${new URL('llms.txt', site).href}`,
    '',
  ];
  return new Response(groups.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
