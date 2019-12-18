module.exports = (isDev) => {
  return {
    // 解决无意多保留的空格影响界面展示和界面功能
    preserveWhiteSpace: true,
    // 是否将vue文件中css单独打包到一个css文件中
    extractCSS: !isDev,
    cssModules: {
      // 配置独一无二的class名字
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      // js调用可以使用驼峰命名方式
      camelCase: true
    }
    // 热更新
    // hotRload: false
  }
}
