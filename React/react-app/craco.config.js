const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      return {
        ...webpackConfig,
        output: {
          ...webpackConfig.output,
          filename: 'static/js/[name].[contenthash:8].js',
        }
      }
    },
  }
}