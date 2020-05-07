// vue.config.js
module.exports = {
  outputDir: "doctor",
  assetsDir: "doctor",
  // 选项...
  devServer: {
    port: 9990, // 配置端口
    // open: true,// 配置自动启动浏览器
    hotOnly: true, // 热更新
    // proxy: "http://192.168.5.11:8004"
    proxy: "http://1669260du6.iok.la",
    // proxy: "http://www.zmymb.com:8004"
    disableHostCheck: true
  },

  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)
  },
  publicPath: "./"
}
