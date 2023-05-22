const { webpackConfig } = require("shakapacker");

// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.

module.exports = {
  ...webpackConfig,
  resolve: {
    ...webpackConfig?.resolve,
    fallback: {
      ...webpackConfig?.resolve?.fallback,
      http: require.resolve("stream-http"),
      timers: require.resolve("timers-browserify"),
      url: require.resolve("url/"),
      https: require.resolve("https-browserify"),
      zlib: require.resolve("browserify-zlib"),
      assert: require.resolve("assert/"),
      stream: require.resolve("stream-browserify"),
      // timers: false,
      // http: false,
      // https: false,
      // browser: false,
      // zlib: false,
      // stream: false,
    },
  },
};
