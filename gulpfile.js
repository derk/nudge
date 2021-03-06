'use strict';

var gulp    = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    bower   = require('bower'),
    sh      = require('shelljs'),
    stylish = require('jshint-stylish'),
    pkg     = require('./package.json');

var paths = {
  sass: ['./app/styles/**/*.scss'],
  templates: ['./app/templates/**/*.html'],
  files: ['app/index.html'],
  fonts: ['app/fonts/**.*',
          'bower_components/ionic/ionic-bower-1.0.0-rc.1/fonts/*.{ttf,woff,eof,svg}'],
  images: ['app/img/**/*.*'],
  vendors: [
     /* using custom build so we can use angular1.3+
     ionic.bundle.js = [ionic.js, angular.js, angular-animate.js, angular-sanitize.js, angular-ui-router.js, ionic-angular.js]*/
    'bower_components/ionic/ionic-bower-1.0.0-rc.1/js/ionic.js',
    'bower_components/angular/bower-angular-1.3.15/angular.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-sanitize/angular-sanitize.js',
    'bower_components/angular-ui-router/ui-router-0.2.13/release/angular-ui-router.js',
    'bower_components/ionic/ionic-bower-1.0.0-rc.1/js/ionic-angular.js',
    /*'bower_components/angular-resource/bower-angular-resource-1.3.0/angular-resource.js',*/
    /*'bower_components/ngCordova/dist/ng-cordova.js',*/
  ],
  scripts: [
    'app/js/*.js',
    'app/js/services/*.js',
    'app/js/controllers/*.js',
    'app/js/directives/*.js'
  ],
  dist: './www'
};

var banner = [
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %> (c) ' + new Date().getFullYear(),
  ' * @author <%= pkg.author %>',
  ' * @link <%= pkg.homepage %>',
  ' */',
  ''].join('\n');

//The name of the Angular module which will be injected into the templates.
var moduleName = 'nudge';

gulp.task('build', ['sass', 'vendors', 'scripts', 'templates', 'copy-files', 'copy-images', 'copy-fonts']);
gulp.task('default', ['build', 'watch']);

gulp.task('sass', function(done) {
  gulp.src('./app/styles/ionic.app.scss')
    .pipe(plugins.sass({ errLogToConsole: true }))
    .pipe(gulp.dest(paths.dist+'/css'))
    .pipe(plugins.minifyCss({ keepSpecialComments: 0 }))
    .pipe(plugins.rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.dist+'/css'))
    .on('end', done);
});

//Minify and copy all 3rd party libs to vendors.min.js
gulp.task('vendors', function() {
  return gulp.src(paths.vendors)
    .pipe(plugins.concat('vendors.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename({extname: '.min.js'}))
    .pipe(gulp.dest(paths.dist+'/js'));
});

//Minify and copy all angular script files to app.min.js
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(plugins.concat('app.js'))
    .pipe(plugins.header('(function() {\n'))
    .pipe(plugins.footer('\n})();'))
    .pipe(plugins.header(banner, { pkg: pkg }))
    .pipe(gulp.dest(paths.dist+'/js'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename({extname: '.min.js'}))
    //.pipe(plugins.header(banner, { pkg: pkg }))
    .pipe(gulp.dest(paths.dist+'/js'));
});

//Minify and copy all angular templates to templates.min.js
gulp.task('templates', function() {
  return gulp.src(paths.templates)
    .pipe(plugins.minifyHtml({quotes: true}))
    .pipe(plugins.angularTemplatecache({module: moduleName}))
    .pipe(plugins.uglify())
    .pipe(plugins.concat('templates.min.js'))
    .pipe(gulp.dest(paths.dist+'/js'));
});

//Copy all static/HTML files to output directory
gulp.task('copy-files', function(){
  return gulp.src(paths.files)
    .pipe(gulp.dest(paths.dist));
});

// Copy all images to output directory
gulp.task('copy-images', function(){
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.dist+'/img'));
});

//Copy all fonts to output directory
gulp.task('copy-fonts', function(){
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.dist+'/fonts'));
});

//Lint Task
gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.vendors, ['vendors']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.files, ['copy-files']);
  gulp.watch(paths.images, ['copy-images']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      plugins.gutil.log('bower', plugins.gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + plugins.gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', plugins.gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + plugins.gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
