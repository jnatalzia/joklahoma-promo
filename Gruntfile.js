/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    connect: {
      server: {
        options: {
          base: './public',
          port: '4000',
          host: '*'
        }
      }
    },
    clean: {
      build: {
        src: ['public/javascripts', 'public/stylesheets']
      }
    },
    copy: {
      img: {
        files : [{expand: true, cwd: 'app/img', src: ['**'], dest: 'public/img'}]
      },
      js: {
        files : [{expand: true, cwd: 'app/javascripts', src: ['**'], dest: 'public/javascripts'}]
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/stylesheets',
          src: 'main.scss',
          dest: 'public/stylesheets',
          ext: '.css'
        },
        {
          expand: true,
          cwd: 'app/stylesheets',
          src: '**/*.css',
          dest: 'public/stylesheets',
          ext: '.css'
        }]
      }
    },
    haml: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['**/*.haml'],
          dest: 'public',
          ext: '.html'
        }]
      }
    },
    watch: {
      styles: {
        files: ['app/stylesheets/**/*.scss','app/stylesheets/**/*.css'],
        tasks: ['sass']
      },
      haml: {
        files: ['app/**/*.haml'],
        tasks: ['haml']
      },
      img: {
        files: ['app/img/*.*', 'app/img/**/*.*'],
        tasks: ['copy:img']
      },
      js:{
        files: ['app/javascripts/*.js', 'app/javascripts/**/*.js'],
        tasks: ['copy:js']
      },
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-haml');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['clean','sass','haml','copy']);

};
