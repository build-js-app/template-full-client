module.exports = {
  pages: {
    index: {
      entry: 'src/index.js'
    }
  },
  devServer: {
    port: 4000,
    proxy: 'http://localhost:5000'
  },
  configureWebpack: config => {
    if (!config.resolve) config.resolve = {};
    if (!config.resolve.modules) config.resolve.modules = [];
    config.resolve.modules.push('src');
  },
  css: {
    loaderOptions: {
      sass: {
        includePaths: ['src']
      }
    }
  }
};
