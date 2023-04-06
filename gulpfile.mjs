// // const gulp = require('gulp');
// // const gulpPromise =  import('gulp');
// // const gulp =  gulpPromise;
// const gulp = async () => {await import('gulp');}
// const { task, src, dest } = require('gulp');

// // const sassPromise = import('gulp-sass');
// // const sass = sassPromise;
// const sass = require('gulp-sass')(require('sass'));




// // const cssnanoPromise = import('gulp-cssnano');
// // const cssnano = cssnanoPromise;
// const cssnano = require('gulp-cssnano');
// const revPromise = import('gulp-rev');
// const rev = revPromise;

// // const sass = require('gulp-sass');
// // const cssnano = require('gulp-cssnano');
// // const rev = require('gulp-rev');




// //css is the task name 
// task('css' , function(done){
    
//     console.log("minifying css....");
//     src('./assets/sass/**/*.scss')
//     .pipe(sass())//converts sass to css//pipe is used to call additional middleware for gulp
//     .pipe(cssnano())//this will minify the css
//     .pipe(dest('./assets/css'))//the destination of finally minimised files

//     src('./assets/**/*.css')//we take the files from the main assets 
//     .pipe(rev())//hash the names so that if a browser has a assets file with the name in the cache it doesnt ignore ours
//     .pipe(dest('./public/assets'))//and the file with the hashed names has stored here
//     .pipe(rev.manifest({//manifest is the file whch =conatins the key falue pairs witth originals and hashed file names - { page1.css: page1-xys3993#ma.css , chatEngine.css : chatEngine920bnd2910#2.css}
//         cwd:'public',//current working directory
//         merge :true
//     }))
//     .pipe(dest('./public/assets'));
//     done();
// })



// gulpfile.mjs

import gulp from 'gulp';
// import sass from 'gulp-sass';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

import cssnano from 'gulp-cssnano';
import rev from 'gulp-rev';

export const css = () => {
  console.log("minifying css....");
  return  gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'))

   gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
};

gulp.task('default', css);
