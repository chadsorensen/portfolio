module.exports = (grunt) ->
  grunt.initConfig

    # =============================================
    # VARIABLES
    # =============================================
    ScssDirectory: 'css/'
    CoffeeDirectory: 'js/'
    DistributionDirectory: 'dist/'

    # =============================================
    # WATCH FOR CHANGE
    # =============================================
    watch:
      css:
        files: ['<%= ScssDirectory %>/**/*']
        tasks: ['sass']
      scripts:
        files: ['<%= CoffeeDirectory %>/*']
        tasks: ['coffee', 'uglify:dist']
      options:
        livereload: false

    # =============================================
    # SASS COMPILE
    # =============================================
    # https://github.com/gruntjs/grunt-contrib-sass
    # =============================================
    sass:
      compile:
        options:
          compress: false
          sourcemap: 'file' # none, file, inline, none
          style: 'compressed' # nested, compact, compressed, expanded
        files:
          '<%= DistributionDirectory %>/css/application.min.css': '<%= ScssDirectory %>/application.scss'

    # =============================================
    # COFFEE COMPILING
    # =============================================
    # https://github.com/gruntjs/grunt-contrib-coffee
    # =============================================
    coffee:
      options:
        join: true
        bare: true
      compile:
        files:
          '<%= DistributionDirectory %>/js/application.js': ['<%= CoffeeDirectory %>/*.coffee']

    # =============================================
    # UGLIFY JAVASCRIPT
    # =============================================
    # https://github.com/gruntjs/grunt-contrib-uglify
    # =============================================
    uglify:
      options:
        sourceMap: true
        mangle: false
        beautify: false
        compress: true
      dist:
        files:
          '<%= DistributionDirectory %>/js/application.min.js': ['<%= DistributionDirectory %>/js/modernizr.js', '<%= DistributionDirectory %>/js/jquery-2.1.1.js', '<%= DistributionDirectory %>/js/application.js']

    # =============================================
    # LOAD PLUGINS
    # =============================================
    grunt.loadNpmTasks 'grunt-contrib-sass'
    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-uglify'

    # =============================================
    # TASKS
    # =============================================
    grunt.registerTask 'default', ['watch']