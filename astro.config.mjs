import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';

import react from '@astrojs/react';

export default defineConfig({
  site: 'http://localhost:4321',
  output: 'static',
  adapter: vercel(),
  integrations: [mdx(), react(), keystatic()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});