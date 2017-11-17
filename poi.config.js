const path = require('path');

// this will copy ./static/** to ./dist/**
module.exports = options => ({
  entry: 'src/index.js',
  dist: 'build',
  devServer: {
    proxy: 'http://localhost:5000/api'
  },
  webpack(config) {
    return config; // <-- Important, must return it
  }
});
