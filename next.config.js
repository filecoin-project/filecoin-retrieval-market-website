
/**
 * Module dependencies.
 */

const { WebpackBundleSizeAnalyzerPlugin } = require('webpack-bundle-size-analyzer');

/**
 * Constants.
 */

const domains = process.env.IMAGES_DOMAINS;

/**
 * Export next configuration.
 */

module.exports = {
  compiler: {
    styledComponents: true
  },
  publicRuntimeConfig: {
    vercelBaseUrl: process.env.VERCEL_URL
  },
  trailingSlash: true,
  webpack: (config, { webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['svg-inline-loader?idPrefix&classPrefix']
    });

    config.plugins.push(
      new WebpackBundleSizeAnalyzerPlugin('stats.txt')
    );

    return config;
  }
};
