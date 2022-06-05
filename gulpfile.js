const gulp = require('gulp')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')(require('sass'))

function converterSass( done ){
  gulp.src('./src/scss/**/index.scss')
    .pipe( sourcemaps.init() )
    .pipe( sass({ outputStyle: 'compressed' }).on('error', sass.logError) )
    .pipe( rename({ suffix: '.min' }) )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest('./src/css/') )

  done()
}

function converterSassWatch(){
  gulp.watch('./src/scss/**/*.scss', converterSass)
}

gulp.task( 'default', gulp.series(converterSass, converterSassWatch) )