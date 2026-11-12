import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';
import sitemap from '@astrojs/sitemap';

// Other imports can remain as they are.

export default defineConfig({
  site: 'https://www.sambasiva.dev',
  outDir: './docs',
  build:{
    assets: 'assets'
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            let name = assetInfo.name ?? '';
            if (name.startsWith('_')) {
              name = name.substring(1);
            }
            return `assets/${name}-[hash][extname]`;
          },
          chunkFileNames: (chunkInfo) => {
            let name = chunkInfo.name ?? '';
            if (name.startsWith('_')) {
              name = name.substring(1);
            }
            return `assets/${name}-[hash].js`;
          },
        },
      },
    },
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    expressiveCode(),
    mdx(),
    sitemap(),
  ],
});