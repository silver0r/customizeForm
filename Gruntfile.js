module.exports = function(grunt) {
	
	require('time-grunt')(grunt);
	
	var banner = {
			basic: '/* <%=pkg.main%> v<%=pkg.version%> <%=pkg.license%> license (c) ' + grunt.template.today('yyyy') + ' <%=pkg.author.name%> */',
			all: '/* jquery.customize.form.min.js, jquery.ellipsis.min.js, modernizr.min.js */\n'
	};
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		htmlhint: {
			options: {
				'force': true,
				'tagname-lowercase': true,
				'attr-lowercase': true,
				'attr-value-double-quotes': true,
				'attr-value-not-empty': true,
				'attr-no-duplication': true,
				'doctype-first': true,
				'tag-pair': true,
				'tag-self-close': true,
				'spec-char-escape': true,   // &nbsp;, &lt, &gt만 적용
	            'id-unique': true,
	            'src-not-empty': true,
	            'title-require': true,
	            'head-script-disabled': true,
	            'alt-require': true,
	            'doctype-html5': true,
//	            'id-class-value': 'underline',
	            'style-disabled': true,
	            'inline-style-disabled': true
	        },
			example: {
		        src: ['example/**/*.html']
			}
		},
		jshint: {
		    options: {
		    	force: true,
		    	camelcase: true,
		    	indent: true,
		    	newcap: true,
		    	noempty: true,
		    	undef: true,
		    	trailing: true,
		    	curly: true,
		    	eqeqeq: true,
		    	globalstrict: true,
	            eqnull: true,
	            laxbreak: true,
	            browser: true,
	            devel: true,
	            globals: {
	            	window: true,
	                jQuery: true,
	                $: true,
	                Modernizr: true,
	                require: true,
	                module: true,
	                define: true
	            }
		    },
		    files: ['js/src/**/*.js']
		},
        uglify: {
        	customizeForm: {
        		options: {
        			banner: banner.basic,
        			mangle: true,
        			compress: {
        				drop_console: true
        			}
        		},
        		files: {
        			'js/dist/jquery.customize.form.min.js': ['js/src/jquery.customize.form.js']
        		}
        	}
        },
        concat: {
        	customizeForm: {
        		src: ['js/dist/jquery.customize.form.min.js',
                      'js/lib/jquery-ellipsis/jquery.ellipsis.min.js',
                      'js/lib/modernizr/modernizr.min.js'],
                dest: 'js/dist/jquery.customize.form.all.min.js',
                options: {
                    banner: banner.all,
                    separator: '\r\n\r\n'
                }
        	}
        },
        connect: {
        	server: {
        		options: {
        			port: 8000,
                    keepalive: true
        		}
        	}
        }
	});

	require('jit-grunt')(grunt, {});
	
	grunt.registerTask('validator', ['htmlhint', 'jshint']);
	grunt.registerTask('build', ['uglify:customizeForm', 'concat:customizeForm']);
	grunt.registerTask('server', ['connect:server:keepalive']);
};