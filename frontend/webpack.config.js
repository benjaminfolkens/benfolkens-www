const config = require('./config/config');

const webpackMerge = require('webpack-merge');

const commonConfig = require('./config/webpack.common');

const envConfig = config.isDev
  ? require('./config/webpack.dev')
  : require('./config/webpack.prod');

module.exports = webpackMerge(commonConfig, envConfig);
