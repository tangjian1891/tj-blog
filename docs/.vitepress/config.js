module.exports = {
  base:'/dist/',
  title: "my-blog", // 设置网站标题
  // dest: "./haha", // 设置输出目录
  themeConfig: {
    logo: "/images/logo.jpg",
    // 添加导航栏
    nav: [
      { text: "首页", link: "/" },
      { text: "mongo", link: "/mongo/index" },
      { text: "linux", link: "/linux/index" },
      { text: "midway", link: "/midway/index" },
      {
        text: "github",
        // 这里是下拉列表展现形式。
        items: [
          { text: "focus-outside", link: "https://github.com/txs1992/focus-outside" },
          { text: "stylus-converter", link: "https://github.com/txs1992/stylus-converter" },
        ],
      },
    ],
 
  },
};
