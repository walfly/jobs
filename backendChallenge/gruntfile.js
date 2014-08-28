module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      pub: {
        src:['*.js','*/**/*.js', '!node_modules/**/*.js']
      },
      options: {
        reporter: require('jshint-stylish')
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          timeout: 5000
        },
        src: ['*/**/*.test.js', '!node_modules/**/*.js']
      }
    },
    casperjs: {
      options: {
        async: {
          parallel: false
        }
      },
      files: ['casperOauthFlow.js']
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-casperjs');

  grunt.registerTask('default', ['jshint', 'mochaTest', 'casperjs']);
};