const path = require('path')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

const PROXY_TARGET = process.env.VUE_APP_PROXY_TARGET
const BASE_API = process.env.VUE_APP_BASE_API

module.exports = {
  publicPath: '/', //根路径
  outputDir: 'dist',  //构建输出目录
  lintOnSave: true, //是否开启eslint保存检测，有效值：true || false || 'error'
  productionSourceMap: false,
  devServer: {
    open: false, //是否在启动项目完成后自动弹出浏览器窗口
    host: '0.0.0.0', //'0.0.0.0'真机测试  域名
    port: 8081,  //端口号的配置
    https: false, //是否使用https协议
    clientLogLevel: 'warning',
    overlay: {
      warnings: false,
      errors: true
    },
    // 开发阶段处理跨域
    proxy: {
      [BASE_API]: {
        target: PROXY_TARGET,
        changeOrigin: true,
        pathRewrite: {
          [`^${BASE_API}`]: ''
        }
      }
    }
  },
  chainWebpack: config => {
    // 一个规则里的 基础Loader
    // svg是个基础loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  // 第三方插件配置
  pluginOptions: {}
}
