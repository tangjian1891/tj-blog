module.exports = {
  // base:'/dist/',
  base: process.env.NODE_ENV === "production" ? "/nice-blog/" : "",
  // base: "/dist/",
  // base: "",
  lang: "en-US",
  title: "NICE BLOG",
  description: "一个记录学习的blog，如果有能帮助到你的，可以点个star!", //meta描述信息
  themeConfig: {
    repo: "vuejs/vitepress", //github仓库
    docsDir: "docs",
    logo: "/images/logo.jpg",
    // editLinks: true, //是否允许编辑
    // editLinkText: "Edit this page on GitHub",
    lastUpdated: "上次更新时间",

    nav: [
      { text: "Vue", link: "/", activeMatch: "^/$|^/guide/" },
      {
        text: "NICE-ADMIN",
        link: "/nice-admin/nice-admin1",
        activeMatch: "^/nice-admin/",
      },
      {
        text: "记录",
        link: "/recode/movie.html",
        activeMatch: "^/recode/",
      },
      {
        text: "linux",
        link: "/linux/docker.html",
        activeMatch: "^/linux/",
      },
      { text: "midway", link: "/midway/index" },
    ],

    sidebar: {
      // "/guide/": getGuideSidebar(),
      // "/config/": getConfigSidebar(),
      // "/": getGuideSidebar(),
      sidebar: "auto",
      "/recode": recode(),
      "/linux/": linux(),
    },
  },
};

function getGuideSidebar() {
  return [
    {
      text: "Introduction",
      children: [
        { text: "What is VitePress?", link: "/" },
        { text: "Getting Started", link: "/guide/getting-started" },
        { text: "Configuration", link: "/guide/configuration" },
        { text: "Asset Handling", link: "/guide/assets" },
        { text: "Markdown Extensions", link: "/guide/markdown" },
        { text: "Deploying", link: "/guide/deploy" },
      ],
    },
    {
      text: "Advanced",
      children: [
        { text: "Frontmatter", link: "/guide/frontmatter" },
        { text: "Global Computed", link: "/guide/global-computed" },
        { text: "Customization", link: "/guide/customization" },
      ],
    },
  ];
}

function getConfigSidebar() {
  return [
    {
      text: "App Config",
      children: [{ text: "Basics", link: "/config/basics" }],
    },
    {
      text: "Theme Config",
      children: [
        { text: "Homepage", link: "/config/homepage" },
        { text: "Algolia Search", link: "/config/algolia-search" },
        { text: "Carbon Ads", link: "/config/carbon-ads" },
      ],
    },
  ];
}
// 记录
function recode() {
  return [
    {
      text: "电影",
      link: "/recode/movie",
    },
    {
      text: "书",
      link: "/recode/book",
    },
  ];
}

function linux() {
  return [
    {
      text: "docker相关",
      link: "/linux/docker.html",
    },
    {
      text: "marlinos",
      link: "/linux/marlinos.html",
    },
    {
      text: "jenkins",
      link: "/linux/jenkins.html",
    },
  ];
}
