// Gulp tasks for MNML

// Load plugins 
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    prefix = require('gulp-autoprefixer'),
    size = require('gulp-size'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-ruby-sass'),
    csslint = require('gulp-csslint'),
    coffee = require ('gulp-coffee'),
    browserSync = require('browser-sync'),
    browserReload = browserSync.reload;


// Minify all css files in the css directory
// Run this in the root directory of the project with `gulp minify-css `
gulp.task('minify-css', function() {
  gulp.src('./css/i.css')
    .pipe(minifyCSS({keepSpecialComments: 0}))
    .pipe(rename('i.min.css'))
    .pipe(size({gzip:true, showFiles: true}))
    .pipe(gulp.dest('./css/'));
});

// Use csslint without box-sizing or compatible vendor prefixes (these
// don't seem to be kept up to date on what to yell about)
gulp.task('csslint', function () {
  gulp.src('./css/i.css')
    .pipe(csslint({
          'compatible-vendor-prefixes': false,
          'box-sizing': false,
          'important': false,
          'known-properties': false
        }))
    .pipe(csslint.reporter());
});

// Task that compiles scss files down to good old css
gulp.task('pre-process-scss', function() {
  gulp.src('./sass/i.scss')
      .pipe(watch(function(files) {
        return files.pipe(sass({loadPath: ['./sass/'], style: "compact"}))
          .pipe(prefix())
          .pipe(size({gzip:true, showFiles: true}))
          .pipe(gulp.dest('css'))
          .pipe(browserSync.reload({stream:true}));
      }));
});

// Compile .coffee files down to JS
gulp.task('compile-coffee', function () {
  gulp.src('./coffee/*.coffee')
      .pipe(coffee({bare: true}).on('error', gutil.log))
      .pipe(gulp.dest('./js/'))
});

// Initialize browser-sync which starts a static server also allows for 
// browsers to reload on filesave
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "./"
        }
    });
});

// Function to call for reloading browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/*
   DEFAULT TASK

 • Process sass then auto-prefixes and lints outputted css
 • Starts a server on port 3000
 • Reloads browsers when you change html or sass files

*/
gulp.task('default', ['pre-process-scss', 'minify-css', 'compile-coffee', 'bs-reload', 'browser-sync'], function(){
  gulp.start('pre-process-scss', 'csslint');
  gulp.watch('sass/*.scss', ['pre-process-scss', 'minify-css']);
  gulp.watch('coffee/*.coffee', ['compile-coffee']);
  gulp.watch('js/*.js', ['bs-reload']);
  gulp.watch('css/i.css', ['bs-reload']);
  gulp.watch('*.html', ['bs-reload']);
});

