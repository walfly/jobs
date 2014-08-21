module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      unit: {
        configFile: './karma.conf.js'
      }
    },
    jshint: {
      pub: {
        src:['public/**/*.js', '!public/javascripts/bundle.js', '!public/javascripts/specs.js']
      },
      options: {
        reporter: require('jshint-stylish')
      }
    },
    sass: {
      dist: {
        files: {
          './public/stylesheets/main.css': './public/stylesheets/main.scss',
        }
      }
    },
    browserify: {
      js: {
        // A single entry point for our app
        src: './public/javascripts/app.js',
        // Compile to a single file to add a script tag for in your HTML
        dest: './public/javascripts/bundle.js'
      },
      spec: {
        src: './public/javascripts/**/*.test.js',
        dest: './public/javascripts/specs.js'
      },
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['jshint', 'browserify', 'karma', 'sass']);
};