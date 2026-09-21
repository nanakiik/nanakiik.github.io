import { PUBLIC_ARTALK_ENABLED, PUBLIC_ARTALK_SERVER } from "astro:env/server";

const artalkServer = PUBLIC_ARTALK_SERVER?.trim() || "";
const artalkEnabled =
  PUBLIC_ARTALK_ENABLED === undefined
    ? Boolean(artalkServer)
    : PUBLIC_ARTALK_ENABLED;

const site = {
  meta: {
    title: "nanakiik",
    description: "个人博客",
    author: "nanaki",
    logo: "/logo.svg",
    ogImage: "/nanaki.png",
    lang: "zh-CN",
  },

  navigation: [
    { name: "主页", subtitle: "Index", href: "/" },
    { name: "博客", subtitle: "Blog", href: "/posts" },
    { name: "项目", subtitle: "Works", href: "/projects" },
    { name: "关于我", subtitle: "Me", href: "/about" },
  ],

  social: [
    { name: "GitHub", href: "https://github.com/nanakiik", icon: "mdi:github" },
    { name: "Email", href: "makishinanakishi@outlook.com", icon: "mdi:email" },
  ],
  hero: {
    greeting: "nanakiik",
    description:
      '个人博客',
    cards: [
      { icon: "mdi:explore", label: "Status", value: "🤷‍♀️" },
    ],
  },

  // --- Footer ---
  footer: {
    copyright: "© 2025 nanakiik",
    builtWith: "Built with Astro",
  },

  comments: {
    enabled: artalkEnabled,
    provider: "artalk" as const,
    artalk: {
      server: artalkServer,
    },
  },

  // --- Feature Toggles ---
  features: {
    search: true,
    rss: true,
    // Auto-mark posts as "new" if published within this many days (0 to disable)
    newPostDays: 7,
  },

  tools: [
    {
      name: "开发工具",
      items: [
        { name: "VS Code", link: "https://code.visualstudio.com", icon: "mdi:microsoft-visual-studio-code" },
        { name: "Git", link: "https://git-scm.com", icon: "mdi:git" },
      ]
    },
    {
      name: "设计",
      items: [
        { name: "Photoshop", link: "https://www.adobe.com/products/photoshop.html", icon: "mdi:image-edit" },
      ]
    },
    {
      name: "实用工具",
      items: [
        { name: "Obsidian", link: "https://obsidian.md", icon: "mdi:diamond-stone" },
      ]
    },
  ],

  labels: {
    postsTitle: "文章",
    postsDescription: "笔记和一些想法",
    projectsTitle: "项目",
    projectsDescription: "一些小项目",
    toolsTitle: "工具",
    aboutTitle: "关于",
    aboutDescription: "关于我",
    backToPosts: "Back to posts",
    goHome: "Go Home",
    notFoundTitle: "没找到页面",
    notFoundDescription: " ",
    endOfPost: " ",
    tableOfContents: " ",
    searchPlaceholder: "搜索中...",
    searchNavigate: "导航",
    commentSuccess: " ",
  },

  ogImage: "/nanaki.png",
} as const;

export default site;
