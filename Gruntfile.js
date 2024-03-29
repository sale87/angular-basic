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
                    '<%= distdir %>/js/vendor.min.js': '<%= distdir %>/js/vendor.js'
                }
            }
        },
        bower_concat: {
            all: {
                dest: '<%= distdir %>/js/vendor.js'
            }
        },
        clean: ['<%= distdir %>/*'],
        cssmin: {
            combine: {
                files: {
                    '<%= distdir %>/assets/css/style.css': ['app/assets/css/bootstrap.min.css', 'app/assets/css/style.css']
                }
            }
        }
    });

    grunt.registerTask('default', ['clean', 'concat', 'bower_concat', 'uglify', 'cssmin']);
};
