import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel/serverless';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'http://localhost:4321',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [mdx(), keystatic()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});