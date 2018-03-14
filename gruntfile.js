module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		clean: ['builds'],

		sass : {
			dist : {
				options : {
					style: 'expanded'
				},

				files : [{
					src : './components/sass/artisan.scss',
					dest : './builds/development/css/style.css'
				}]
			}
		},

		concat : {
			options : {
				seperator: '\n\n//--------------------------------\n',
				banner: '\n\n//--------------------------------\n'
			},

			js : {
				src : [
					'./components/scripts/*.js'
					],
				dest : './builds/development/js/scripts.js'
			}
		},

		uglify: {
			my_target: {
				files: {
					'./builds/development/js/scripts.min.js': [
						'./builds/development/js/scripts.js'
					]
				}
			}
		},

		copy: {
			images: {
				expand: true,
				cwd : './components/images/',
				src: ['*.*'],
				dest: './builds/development/img/'
			}
		},

		assemble: {
		  options: {
		    assets: 'assets',
		    plugins: ['permalinks'],
		    partials: ['components/includes/**/*.hbs'],
				layoutdir: 'components/layouts',
		    layout: ['default.hbs'],
		    data: ['components/data/*.{json,yml}']
		  },

		  site: {
				expand: true,
				cwd: './components/pages/',
		    src: ['*.hbs'],
		    dest: './builds/development/'
		  }
		},

		// cssmin : {
		// 	target : {
		// 		files : [{
		// 			expand : true,
		// 			cwd : './builds/development/css/',
		// 			src : ['*.css', '!*.min.css'],
		// 			dest : './builds/development/css/',
		// 			ext : '.min.css'
		// 		}]
		// 	}
		// },

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
					cwd: './components/images/',
					dest: './builds/development/img/'
				}]
			}
		},

		'gh-pages': {
			options: {
				base: './builds/development'
			},

			src: ['**']
		},		
		
		connect: {
			server: {
				options: {
					keepalive: true,
					base: './builds/development',
					port: 1337,
					hostname: 'localhost'
				}
			}
		},

		watch: {
			css: {
				files: ['./components/sass/*.*'],
				tasks: ['sass']
			},

			html: {
				files: ['./components/pages/*.html'],
				tasks: ['copy:pages']
			},

			script: {
				files: ['./components/scripts/*.*'],
				tasks: ['concat', 'uglify']
			}
		}
	});

	grunt.registerTask(
		'default', [
			'clean',
			'sass',
			'copy',
			'assemble',
			'concat',
			'uglify'
			// 'responsive_images',
			// 'cssmin'
	]);
};
