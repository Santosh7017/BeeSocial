
import gulp from 'gulp';
// import sass from 'gulp-sass';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

import cssnano from 'gulp-cssnano';
import rev from 'gulp-rev';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import { deleteAsync } from 'del';



gulp.task('css', function(done){
  console.log('minifying css...');
  gulp.src('./assets/sass/**/*.scss')
  .pipe(sass())
  .pipe(cssnano())
  .pipe(gulp.dest('./assets.css'));

   gulp.src('./assets/**/*.css')
  .pipe(rev())
  .pipe(gulp.dest('./public/assets'))
  .pipe(rev.manifest({
      cwd: 'public',
      merge: true
  }))
  .pipe(gulp.dest('./public/assets'));
  done();
});


gulp.task('js', function (done) {
  console.log('minifying js...');
  gulp.src('./assets/**/*.js', { base: 'assets' })
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
  done()
});

gulp.task('images', function (done) {
  console.log('compressing images...');
  gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
  done();
});

gulp.task('clean:assets', async function (done) {
  // del.sync('./public/assets/');
  // const deletedDirectoryPaths = await deleteAsync(['assets', 'public']);
  await deleteAsync(['!public/assets', '!public/css', 'public/assets/css/**']);
  await deleteAsync(['!public/assets', '!public/js', 'public/assets/js/**']);
  await deleteAsync(['!public/assets', '!public/assets/images', 'public/assets/images/**']);

  done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function (done) {
  console.log("Building Assets !");
  done();
})