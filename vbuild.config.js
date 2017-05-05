const path = require('path');

// this will copy ./static/** to ./dist/**
module.exports = options => ({
  entry: 'src/index.js',
  dist: 'build',
  proxy: 'http://localhost:5000/api'
});
