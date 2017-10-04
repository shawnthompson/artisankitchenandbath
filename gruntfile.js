module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		clean: ['dist', '_src/scss/artisan.css'],

		sass : {
			dist : {
				options : {
					style: 'expanded'
				},

				files : [{
					src : '_src/scss/artisan.scss',
					dest : 'dist/css/style.css'
				}]
			}
		},

		concat : {
			js : {
				src : [
					'_src/js/*.js'
					],
				dest : 'dist/js/scripts.js'
			}
		},

		copy: {

			images: {
				expand: true,
				cwd : '_src/img/',
				src: ['**/*.*'],
				dest: 'dist/img/'
			},

			production: {
				expand: true,
				cwd : 'dist/',
				src: ['*/*.*'],
				dest: 'dist/'
			},

			mail: {
				expand: true,
				cwd: '_src/mail',
				src: ['*.*'],
				dest: 'dist/mail'
			},

			js: {
				expand: true,
				cwd: '_src/js',
				src:['**/*.*'],
				dest: 'dist/js'
			}
		},

		assemble: {
		  options: {
		    assets: 'assets',
		    plugins: ['permalinks'],
		    partials: ['_src/partials/**/*.hbs'],
				layoutdir: '_src/layouts',
		    layout: ['default.hbs'],
		    data: ['_src/data/*.{json,yml}']
		  },

		  site: {
				expand: true,
				cwd: '_src/pages/',
		    src: ['*.hbs'],
		    dest: 'dist/'
		  }
		},

		uglify: {
			my_target: {
				files: {
					'dist/js/scripts.min.js': [
						'dist/js/scripts.js'
					]
				}
			}
		},

		cssmin : {
			target : {
				files : [{
					expand : true,
					cwd : 'dist/css/',
					src : ['*.css', '!*.min.css'],
					dest : 'dist/css/',
					ext : '.min.css'
				}]
			}
		},

		responsive_images: {
			myTask: {
				options: {
					sizes: [{
						height: 200,
						rename: false
					}]
				},
				files: [{
					expand: true,
					src: ['**.{jpg,gif,png}'],
					cwd: '_src/img/',
					dest: 'dist/img/'
				}]
			}
		},

		'gh-pages': {
			options: {
				base: 'dist'
			},

			src: ['**']
		},

		watch: {
			css: {
				files: ['_src/scss/*/*.*'],
				tasks: ['sass']
			},

			html: {
				files: ['_src/pages/*.hbs', '_src/partials/*.hbs'],
				tasks: ['assemble']
			},

			script: {
				files: ['_src/js/*.*'],
				tasks: ['concat', 'uglify']
			}
		}
	});

	grunt.registerTask(
		'default', [
			'clean',
			'sass',
			'copy',
			// 'concat',
			'assemble'
			// 'responsive_images',
			// 'cssmin'
	]);

	grunt.registerTask(
		'production', [
			'clean',
			'sass',
			'copy',
			// 'copy:production',
			'assemble',
			'concat',
			'uglify',
			// 'responsive_images',
			'cssmin'
	]);
};
