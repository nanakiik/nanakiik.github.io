// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    site: "https://nanakiik.github.io",
    base: ".",
    trailingSlash: "ignore",
    redirects: {},
    output: "static",
    adapter: undefined,
    integrations: [],
    root: ".",
    srcDir: "./src",
    publicDir: "./public",
    outDir: "./dist",
    cacheDir: "./node_modules/.astro",
    compressHTML: true,
    scopedStyleStrategy: "attribute", //
    security: { checkOrigin: true },
    //vite config

    //build config
    // build: {
    //     format: "file",
    //     client: "./client",
    //     server: "./server",
    //     assets: "_astro",
    //     assetsPrefix: undefined,
    //     serverEntry: "entry.mjs",
    //     redirects: true,
    //     inlineStylesheets: "auto",
    //     concurrency: 1,
    // },

    server: {
        //host: false,
        port: 1116,
        //open: false,
        //headers: {}
    },
    // session: {
    //     //driver: "",
    //     options: undefined,
    //     cookie: {
    //         name: "astro-session",
    //         sameSite: "lax",
    //         httpOnly: true,
    //         secure: true,
    //     },
    //     ttl: Infinity,
    // },
    devToolbar: {
        enabled: false,
    },
    prefetch: {
        prefetchAll: true,
        defaultStrategy: "hover",
    },
    // image: {
    //     endpoint: { route: "/_image", entrypoint: undefined },
    //     service: { entrypoint: "astro/assets/services/sharp", config: {} },
    //     domains: [],
    //     remotePatterns: [],
    //     experimentalLayout: undefined,
    //     experimentalObjectFit: "cover",
    //     experimentalObjectPosition: "center",
    //     experimentalBreakpoints:
    //         [640, 750, 828, 1080, 1280, 1668, 2048, 2560] |
    //         [
    //             640, 750, 828, 960, 1080, 1280, 1668, 1920, 2048, 2560, 3200,
    //             3840, 4480, 5120, 6016,
    //         ],
    //     experimentalDefaultStyles: true,
    // },

    // markdown
    // markdown: { shikiConfig: {} },

    //i18n

    //env

    // experimetal: {
    //     liveContentCollections: true,
    // },
});
