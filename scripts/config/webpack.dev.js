const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common');
const { ROOT_PATH, SERVER_HOST, SERVER_PORT } = require('../constant');

//merge 使用webpack-merge 通过merge函数，将多个配置对象传递给它，返回一个合并后的配置对象
module.exports = merge(common, {
  target: 'web', // 解决热更新失效
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  // output属性告诉webpack在哪里输出它所创建的bundle,以及如何命名这些文件
  output: {
    path: path.resolve(ROOT_PATH, './build'),
    filename: 'js/[name].js'
  },
  devServer: {
    host: SERVER_HOST,
    port: SERVER_PORT,
    compress: true, // gzip压缩
    open: true, // 自动打开默认浏览器
    hot: true, // 启用服务热替换配置
    client: {
      logging: 'warn', // warn以上的信息，才会打印
      overlay: true // 当出现编译错误或警告时，在浏览器中显示全屏覆盖
    },
    // 解决路由跳转404问题
    historyApiFallback: true
  },
  plugins: [],

  optimization: {
    minimize: false,
    minimizer: [],
    // 代码分割
    splitChunks: {
      chunks: 'all',
      minSize: 0
    }
  }
});
