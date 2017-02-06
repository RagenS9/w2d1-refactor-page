'use strict'
// use strict. if there are any errors in the JS that are bad errors, let us know about them.

// Load libraries. Here we have three, but there might be more.
const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()

// the way that gulp works is with little tasks. like this:
// gulp.task('makeCoffee', function() {

// })

// Sync with browser, proxy through Node server on 8080. This will real-time update your browser. You can split your screen and put editor on one side and browser on the other. Should take care of caching for you, so no more shift-control-R.
gulp.task('browserSync', function() {
    browserSync.init ( {
      proxy: 'localhost:8080',
      browser: 'google chrome'
    })
})

// Compile SASS into CSS and auto-inject into browser. Use gulps source thing to apply to everything. pipe passes it into sass. this makes it really fast to get it into the internet. it's all compressed and unreadable. so outputStyle expanded makes it legible for us here. dest is destination. browserSync after you've changed it, let browser know so that it updates.
gulp.task('sass', function() {
    return gulp.src('./css/**/*.scss')
        .pipe(sass({
          outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream())
})

// Run just the tasks. default means the default action to take.
gulp.task('default', ['sass'])

// Watch and serve. this is where the magic happens. runs sas snc runs the browser sync then watches gulp watch and that watches your html, scss, and css changes and it reloads the page on the server. 
gulp.task('serve', ['sass', 'browserSync'], function(){
    gulp.watch('./**/*.html').on('change', browserSync.reload)

    gulp.watch('./css/**/*.scss', ['sass'])

    gulp.watch('./css/**/*.css').on('change', browserSync.reload)
})
