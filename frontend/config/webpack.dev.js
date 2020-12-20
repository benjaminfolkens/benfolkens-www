const webpack = require('webpack');
const kleur = require('kleur');

const config = require('./config');

const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

const sane = require('sane');
const getPort = require('get-port');

const watcher = sane(config.outDir, {
  glob: ['**/*.js', '**/*.jsx'],
});

const serve = new Serve({
  static: [config.outDir, config.pubDir],
  status: false,
  hmr: true,
  port: getPort(),
  host: 'localhost',
});

serve.on('listening', () => {
  watcher.on('change', (filePath, root, stat) => {
    console.log('file changed', filePath);
    serve.emit('reload', { source: 'config' });
  });
});

serve.on('close', () => watcher.close());

console.log(kleur.green().bold('Creating an optimized development server...'));

const devConfig = {
  mode: 'development',
  entry: {
    index: [
      '@babel/polyfill',
      `${config.srcDir}/index.js`,
      'webpack-plugin-serve/client',
    ],
    vendors: [
      'react-refresh/runtime',
      'react',
      'react-dom',
      'webpack-plugin-serve/client',
    ],
  },
  output: {
    path: config.outDir,
    filename: 'static/js/[name].bundle.js',
    publicPath: '/',
    pathinfo: false,
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        type: 'asset',
        use: [
          {
            loader: 'style-loader',
            options: {
              esModule: true,
              modules: {
                namedExport: true,
              },
            },
          },
          {
            loader: 'css-loader',
            // name: 'static/css/[name].[contenthash].[ext]',
            options: {
              esModule: true,
              modules: {
                namedExport: true,
              },
            },
          },
          {
            loader: 'sass-loader',
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
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    serve,
    new ReactRefreshPlugin({
      overlay: false,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: `${config.pubDir}/index.html`,
      favicon: `${config.pubDir}/favicon.ico`,
    }),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(config.moduleDir),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  // devServer: {
  //   disableHostCheck: true,
  //   compress: true,
  //   contentBase: config.outDir,
  //   watchContentBase: true,
  //   publicPath: '/',
  //   overlay: false,
  //   watchOptions: {
  //     ignored: /node_modules/,
  //     poll: true,
  //   },
  //   host: 'localhost',
  //   port: config.port,
  //   historyApiFallback: true,
  //   hot: true,
  //   inline: true,
  //   open: true,
  // },
  performance: {
    hints: false,
  },
  watch: true,
};

module.exports = devConfig;
