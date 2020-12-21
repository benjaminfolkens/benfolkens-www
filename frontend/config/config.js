const path = require('path');
const root = path.resolve();
const env = process.env.NODE_ENV || 'development';

module.exports = {
  env: process.env.NODE_ENV || 'development',
  isProd: env === 'production',
  isDev: env === 'development',
  rootDir: root,
  srcDir: path.join(root, 'src'),
  outDir: path.join(root, 'dist'),
  pubDir: path.join(root, 'public'),
  moduleDir: path.join(root, 'node_modules'),
  port: process.env.PORT || 3000,
};
