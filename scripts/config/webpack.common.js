const path = require('path');
// webpackbar 是webpack的一个插件，用于在命令行界面中展示webpack构建进度条和详细信息
const WebpackBar = require('webpackbar');
// 填充html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const { ROOT_PATH } = require('../constant');
const { isDevelopment, isProduction } = require('../env');
const { myAntd } = require('../antd-theme');

const getCssLoaders = () => {
  const cssLoaders = [
    isDevelopment
      ? 'style-loader'
      : { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
    {
      loader: 'css-loader',
      options: {
        modules: {
          // 模块化类名，防止重复
          localIdentName: '[local]--[hash:base64:10]'
        },
        sourceMap: isDevelopment
      }
    }
  ];

  // 加css前缀的loader配置
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          isProduction && [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: true
              }
            }
          ]
        ]
      }
    }
  };

  // 生产模式时，才需要加css前缀
  isProduction && cssLoaders.push(postcssLoader);

  return cssLoaders;
};

const getCustomLoaders = () => {
  // style-loader 一般用于开发环境，将样式通过<style>标签插入到HTML页面中的webpack loader
  const cssLoaders = [
    isDevelopment
      ? 'style-loader'
      : { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
    {
    // css-loader 用于解析css文件，而style-loader 将解析后的css代码以<style>标签的形式插入到html页面中。  
      loader: 'css-loader',
      options: {
        sourceMap: isDevelopment
      }
    }
  ];

  // 加css前缀的loader配置
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          isProduction && [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: true
              }
            }
          ]
        ]
      }
    }
  };

  // 生产模式时，才需要加css前缀
  isProduction && cssLoaders.push(postcssLoader);

  return cssLoaders;
};

const getAntdLessLoaders = () => [
  isDevelopment
    ? 'style-loader'
    : { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
  {
    loader: 'css-loader',
    options: {
      sourceMap: isDevelopment
    }
  },
  {
    loader: 'less-loader',
    options: {
      sourceMap: isDevelopment,
      lessOptions: {
        // antd 自定义主题
        modifyVars: myAntd,
        javascriptEnabled: true
      }
    }
  }
];

module.exports = {
  //入口起点
  entry: {
    index: path.resolve(ROOT_PATH, './src/index')
  },

  plugins: [
    // html模板
    new HtmlWebpackPlugin({
      // 指定一个自定义的HTML模版文件，html-webpack-plugin 会根据这个模版生成HTML文件
      template: path.resolve(ROOT_PATH, './public/index.html'),
      // 指定生成HTML文件的名称
      filename: 'index.html',
      //控制将打包生成的js和css文件注入到HTML文件的位置
      inject: 'body',
      title: "我的小站"
    }),
    // 打包显示进度条
    new WebpackBar(),
    // webpack打包不会有类型检查，强制ts类型检查
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(ROOT_PATH, './tsconfig.json')
      }
    }),
    // 复制不用动态导入的资源
    new CopyWebpackPlugin({
      patterns: [
        {
          context: 'public',
          from: 'assets/*',
          to: path.resolve(ROOT_PATH, './build'),
          toType: 'dir',
          // 设置忽略的文件
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/index.html'] // **表示任意目录下
          }
        }
      ]
    }),
    // 自动删除上一次打包的产物
    new CleanWebpackPlugin(),
    // 将antd中的moment.js替换为day.js
    new AntdDayjsWebpackPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: getCssLoaders()
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          ...getCssLoaders(),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /src/,
        use: getAntdLessLoaders()
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/, /\.custom.scss$/],
        use: [
          ...getCssLoaders(),
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.custom.scss$/,
        use: [
          ...getCustomLoaders(),
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.(tsx?|js)$/, // ts\tsx\js
        loader: 'babel-loader',
        options: { cacheDirectory: true }, // 缓存公共文件
        exclude: /node_modules/
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        // 自动选择导出为单独文件还是url形式
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        // 分割为单独文件，并导出url
        type: 'asset/resource'
      }
    ]
  },

  // 路径配置别名
  resolve: {
    alias: {
      '@': path.resolve(ROOT_PATH, './src')
    },
    // 若没有写后缀时，依次从数组中查找相应后缀文件是否存在
    extensions: ['.tsx', '.ts', '.js', '.json'],
    fallback: { crypto: false }
  },

  // 缓存
  cache: {
    // 基于文件系统的持久化缓存
    type: 'filesystem',
    buildDependencies: {
      // 当配置文件发生变化时，缓存失效
      config: [__filename]
    }
  }
};
