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
          reporter: 'spec'
        },
        src: ['*/**/*.test.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['jshint', 'mochaTest']);
};