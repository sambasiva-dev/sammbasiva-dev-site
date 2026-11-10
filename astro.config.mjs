import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';

// Other imports can remain as they are.

export default defineConfig({
  outDir: './docs',
  devToolbar: {
    enabled: false,
  },
  integrations: [
    expressiveCode(),
    mdx(),
  ],
});