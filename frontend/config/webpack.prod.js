const config = require('./config');

const kleur = require('kleur');

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

console.log(kleur.green().bold('Creating an optimized production build...'));

const prodConfig = {
  mode: 'production',
  entry: {
    index: [
      '@babel/polyfill',
      `${config.srcDir}/index.js`,
      `${config.srcDir}/index.css`,
    ],
  },
  devtool: 'source-map',
  output: {
    path: config.outDir,
    filename: 'static/js/[name].[contenthash].js',
    chunkFilename: 'static/js/[name].[chunk].[contenthash].js',
    pathinfo: false,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,

            comparisons: false,

            inline: 2,
          },
          mangle: {
            safari10: true,
          },

          output: {
            ecma: 5,
            comments: false,

            ascii_only: true,
          },
        },
      }),
    ],
    moduleIds: 'deterministic',
    runtimeChunk: {
      name: 'single',
    },
    splitChunks: {
      chunks: 'async',
      name: false,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    usedExports: true,
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        type: 'asset',
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          // },
          {
            loader: 'css-loader',
            // name: 'static/css/[name].[contenthash].[ext]',
            options: {
              esModule: true,
              importLoaders: 1,
              modules: {
                namedExport: true,
                auto: true,
                localIdentName: '[local]_[hash:base64:5]',
              },
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // name: 'static/css/[name].[contenthash].[ext]',
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  postcssPresetEnv({
                    browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
                  }),
                  require('cssnano'),
                ],
              },
            },
          },
        ],
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx|ts|tsx)$/,
          /\.css$/,
          /\.scss$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
          /\.svg$/,
        ],
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[contenthash].[ext]',
              options: {
                modules: {
                  auto: true,
                },
              },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: `${config.pubDir}/index.html`,
      favicon: `${config.pubDir}/favicon.ico`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
    }),
    // new BundleAnalyzerPlugin(),
  ],
  performance: {
    hints: 'warning',
    // maxAssetSize: 100 * 1024, // 100 KiB
    // maxEntrypointSize: 100 * 1024, // 100 KiB
  },
};

module.exports = prodConfig;
