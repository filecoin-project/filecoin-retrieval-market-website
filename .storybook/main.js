
/**
 * Module dependencies.
 */

const fs = require('fs');
const path = require('path');

/**
 * Export configurations.
 */

module.exports = {
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-measure',
    'storybook-addon-designs',
    'storybook-addon-next-router'
  ],
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['svg-inline-loader?idPrefix&classPrefix']
    });

    config.resolve.modules = [
      path.resolve(__dirname, '..'),
      'node_modules',
    ]

    config.resolve.extensions.push('.svg');

    config.module.rules.forEach((rule, index) => {
      if (rule.test.toString().includes('svg|')) {
        config.module.rules[index].test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;

        return config;
      }
    });

    return {
      ...config,
      node: {
        ...config.node,
        fs: 'empty'
      }
    }
  }
}

