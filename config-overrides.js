const { override, addWebpackAlias, addWebpackResolve } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "zlib": require.resolve("browserify-zlib"),
    "stream": require.resolve("stream-browserify"),
    "util": require.resolve("util")
  }),
  addWebpackResolve({
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve("util"),
    }
  })
);
