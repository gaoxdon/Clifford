/*----------------------------------------------------
 * Module Setting
 *-----------------------------------------------------*/
module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),

		// Task jsmin
		uglify: {
			options: {
				banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			buildall:{
				options:{
					mangle:false,//混淆变量
					preserveComments: 'some',//去除部分注释
					// compress:{  //去除console
					// 	drop_console:true
					// }
				},
				files: [{
					expand: true,
					cwd:'src',
					src:'**/*.js',
					dest:'wx/static'
				}]
			}
		},

		//Task cssmin
		cssmin: {
			/*
			compress: {
				files: {
					'assets/all.min.css': ['css/a.css', 'css/b.css']
				}
			}, */
			smeite: {
				files: {
					'assets/smeite.all.css': ['/play21/smeite.com/public/assets/css/**.css']
				}
			},
			with_banner: {
				options: {
					banner: '/* <%= grunt.template.today("yyyy-mm-dd") %>  */'
				},
				files: [{
					expand: true,
					cwd:'src',
					src:'**/*.css',
					dest:'wx/static'
		        }]
			}
		},

		watch: {
			scripts: {
				files: ['src/scss/*.scss','src/**/*.js','src/**/*.css'],
				tasks: ['build'],
				options: {
					spawn: true,
					interupt: true
				},
			},
		},
		sass: {
            dist: {
                files: {
                    'src/css/wx.css': 'src/scss/wx.scss',
                    'src/css/icon.css': 'src/scss/icon.scss'
                },
                options: {
                	style: 'expanded',
                    sourcemap: 'true'
                }
            }
        },
       sprite: {
			options: {
				imagepath: 'src/slice/',
				imagepath_map: null,
				spritedest: 'static/images/',
				spritepath: null,
				padding: 6,
				useimageset: false,
				newsprite: false,
				spritestamp: true,
				cssstamp: true,
				algorithm: 'binary-tree',
				engine: 'pixelsmith'
			},
			autoSprite: {
				files: [{
					// 启用动态扩展
					expand: true,
					// css文件源的文件夹
					cwd: 'src/css',
					// 匹配规则
					src: 'icon.css',
					// 导出css和sprite的路径地址
					dest: 'src/css/icon',
					// 导出的css名
					ext: '.sprite.css'
				}]
			}
		}
		// Task imagemin
		//  imagemin: {
		// 	dist: { // Target
		// 		options: { // Target options
		// 			optimizationLevel: 3
		// 		},
		// 		files: { // Dictionary of files
		// 			'dist/images/photo.png': 'src/images/photo.png', // 'destination': 'source'
		// 			'dist/images/badge.jpg': 'src/images/badge.jpg'
		// 		}
		// 	}
		// },
		
		// Task htmlmin
		// htmlmin: { 		
		// 	dist: {
		// 		options: {
		// 			removeComments: true,		//去注析
		// 			collapseWhitespace: false	//去换行
		// 		},
		// 		files: { // Dictionary of files
		// 			'dist/html/index.html': ['src/html/index.html']
		// 		}
		// 	}
		// }
		/* E--------------------------------------------------------------------------*/
	});

	// Load the plugin HTML/CSS/JS/IMG min
	//grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
  	grunt.loadNpmTasks('grunt-contrib-watch');
  	grunt.loadNpmTasks('grunt-contrib-sass');
  	grunt.loadTasks('tasks');
	//grunt.loadNpmTasks('grunt-contrib-imagemin');

	// Build task(s).
	//grunt.registerTask('build', ['htmlmin', 'uglify', 'cssmin', 'imagemin']);
  	grunt.registerTask('build', ['sass','sprite','uglify:buildall','cssmin']);
  	grunt.registerTask('icon', ['sprite']);
};