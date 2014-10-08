module.exports = function (grunt) {
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        distdir: 'dist',
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['app/**/*.js'],
                dest: '<%= distdir %>/js/<%= pkg.name %>.js'
            },
            index: {
                src: ['app/index.html'],
                dest: '<%= distdir %>/index.html',
                options: {
                    process: true
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%= distdir %>/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            },
            bower: {
                options: {
                    mangle: true,
                    compress: true
                },
                files: {
                    'js/vendor.min.js': 'js/vendor.js'
                }
            }
        },
        bower_concat: {
            all: {
                dest: '<%= distdir %>/js/vendor.js'
            }
        },
        clean: ['<%= distdir %>/*']
    });

    grunt.registerTask('buildbower', [
        'bower_concat',
        'uglify:bower'
    ]);

    grunt.registerTask('default', ['concat', 'uglify', 'buildbower']);
};
