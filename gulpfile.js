var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var postcss = require('gulp-postcss');
var sourcermaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');


// Dev Tools
// -----------------
//Watch for changes in app/scss folder and convert to css, also watch for
// changes to html or JavaScript in the app folder and reload with browserSync

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// Watchers
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})

// Production Tools
// ------------------

// Optimizing CSS and JavaScript
gulp.task('useref', function() {

  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

gulp.task('autoprefixer', function() {
  return gulp.src('app/css/*.css')
    .pipe(sourcermaps.init())
    // to match upstream bootstrap level of brower compatability set browsers to

    .pipe(postcss([autoprefixer({ grid: true,
       browsers:[
       "Android 2.3",
       "Android >= 4",
       "Chrome >= 20",
       "Firefox >= 24",
       "Explorer >= 8",
       "iOS >= 6",
       "Opera >= 12",
       "Safari >= 6"
       ] })]))
    .pipe(sourcermaps.write('.'))
    .pipe(gulp.dest('dist/css'))
});
// Optimizing Images default lossless
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Cach images so you don't repeat unnessassary
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
});

// Copying fonts
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

// Cleaning
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist', // these are run in sequence
    'sass',
    'autoprefixer',
    ['useref', 'images', 'fonts'], // these are run together
    callback
  )
})
