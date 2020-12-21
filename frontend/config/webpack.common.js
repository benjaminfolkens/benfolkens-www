const PnpWebpackPlugin = require('pnp-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const getCacheIdentifier = require('react-dev-utils/getCacheIdentifier');

const config = require('./config');

const commonConfig = {
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: config.srcDir,
        // exclude: /node_modules/,
        exclude: /@babel(?:\/|\\{1,2})runtime/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // babelrc: true,
              cacheDirectory: true,
              // configFile: true,
              cacheCompression: false,
              sourceMaps: config.isProd,
              inputSourceMap: config.isProd,
              cacheIdentifier: getCacheIdentifier(
                config.isProd ? 'production' : config.isDev && 'development',
                ['babel-plugin-named-asset-import', 'react-dev-utils']
              ),
              compact: config.isProd,
              presets: [
                [require.resolve('@babel/preset-env'), { modules: false }],
                require.resolve('@babel/preset-react'),
              ],
              plugins: [
                require.resolve('@babel/plugin-syntax-dynamic-import'),
                [
                  require.resolve('@babel/plugin-proposal-class-properties'),
                  { loose: true },
                ],
                [
                  require.resolve('@babel/plugin-transform-runtime'),
                  {
                    absoluteRuntime: false,
                    corejs: false,
                    helpers: config.isDev, // TURN TO FALSE IN PROD
                    regenerator: true,
                    useESModules: true,
                  },
                ],
                config.isDev && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [
<<<<<<< HEAD
    new WebpackManifestPlugin({
      // publicPath: config.rootDir,
    }),
=======
    // new WebpackManifestPlugin({
    //   // publicPath: config.rootDir,
    // }),
>>>>>>> frontend
  ],
  resolve: {
    plugins: [PnpWebpackPlugin, new ModuleScopePlugin('src', 'package.json')],
    extensions: ['.js', '.jsx'],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
<<<<<<< HEAD
=======
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
>>>>>>> frontend
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
};

module.exports = commonConfig;
