var path = require('path');

module.exports = function (karma) {
  'use strict';

  karma.set({
    basePath: __dirname,

    frameworks: ['jasmine'],

    files: [
      'tests.bundle.js'
    ],

    exclude: [],

    preprocessors: {
      'tests.bundle.js': ['coverage', 'webpack', 'sourcemap']
    },

    reporters: ['mocha', 'coverage'],

    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'json' },
        { type: 'html' }
      ]
    },

    browsers: ['Chrome'],

    port: 9018,
    runnerPort: 9101,
    colors: true,
    logLevel: karma.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    webpackServer: {
      noInfo: true,
      stats: {
        chunks: false,
        assets: false
      },
    },
    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js']
      },
      module: {
        loaders: [
          {
            test: /\.ts?$/,
            exclude: /(node_modules)/,
            loader: 'ts-loader'
          }
        ],
      },
      tslint: {
        emitErrors: false,
        failOnHint: false,
        resourcePath: 'src'
      }
    }
  });
};
