// @ts-nocheck
import { defineConfig, envField, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import expressiveCode from "astro-expressive-code";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from 'rehype-external-links';
// https://astro.build/config
export default defineConfig({
  site: "https://nanakiik.github.io",

  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          content: { type: 'text', value: ' 🔗' }
        }
      ],
    ]
  },

  integrations: [
    expressiveCode({
      themeCssSelector: (theme) => `.${theme.type}`,
      themes: ["material-theme-darker", "material-theme-lighter"],
    }),
    mdx(),
    icon(),
    sitemap(),
  ],

  env: {
    schema: {
      UMAMI_URL: envField.string({
        context: "server",
        access: "public",
        optional: true,
      }),
      UMAMI_WEBSITE_ID: envField.string({
        context: "server",
        access: "public",
        optional: true,
      }),
      PUBLIC_ARTALK_SERVER: envField.string({
        context: "server",
        access: "public",
        optional: true,
      }),
      PUBLIC_ARTALK_ENABLED: envField.boolean({
        context: "server",
        access: "public",
        optional: true,
      }),
    },
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Space Grotesk",
      cssVariable: "--font-display",
    },
  ],

});
