module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    extractCss: !isDev
    // cssModules: {
    //     modules:true,
    //     localIdentName: '[path][name]---[local]---[hash:base64:5]',
    //     camelCase: true
    //   }
    // hotReload:true
  }
}
