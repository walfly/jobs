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
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);
};