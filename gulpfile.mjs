
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


// export const css = async () => {
//   console.log("minifying css....");
//     gulp.src('./assets/sass/**/*.scss')
//     .pipe(sass().on('error', sass.logError))

//     .pipe(gulp.dest('./assets/css'))

//     console.log("Adding hash value");
//      gulp.src('./assets/**/*.css')
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//       cwd: 'public',
//       merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     console.log("Done");
// };

// gulp.task('default', css);

gulp.task('css', function (done) {//css is the task name 

  console.log("minifying css....");
  gulp.src('./assets/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))//converts sass to css//pipe is used to call additional middleware for gulp
    .pipe(cssnano())//this will minify the css
    .pipe(gulp.dest('./assets/minCss'))//the destination of finally minimised files

  // gulp.src('./assets/**/*.css')//we take the files from the main assets 
  // .pipe(rev())//hash the names so that if a browser has a assets file with the name in the cache it doesnt ignore ours
  // .pipe(gulp.dest('./public/assets'))//and the file with the hashed names has stored here
  // .pipe(rev.manifest({//manifest is the file whch =conatins the key falue pairs witth originals and hashed file names - { page1.css: page1-xys3993#ma.css , chatEngine.css : chatEngine920bnd2910#2.css}
  //     cwd:'public',//current working directory
  //     merge :true
  // }))
  // .pipe(gulp.dest('./public/assets'));
  done();
})
gulp.task('rev', function (done) {
  console.log("Adding hash value");
  gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
  console.log("Done");
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

gulp.task('build', gulp.series('clean:assets', 'css','rev', 'js', 'images'), function (done) {
  console.log("Building Assets !");
  done();
})