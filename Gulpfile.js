const gulp = require('gulp');
const git = require('gulp-git');
const bump = require('gulp-bump');
const pkg = require('./package.json');

gulp.task('bump', () => {
  return gulp.src('./package.json')
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

gulp.task('git:add', () => {
  return gulp.src('./')
    .pipe(git.add({ args: '--a' }))
});

gulp.task('git:commit', () => {
  return gulp.src('./')
    .pipe(git.commit(`Bump to version ${pkg.version}`, { args: '-m'}))
});

gulp.task('git:push', () => {
  git.push('origin', 'master', err => {
    if (err) throw err;
  });
});

gulp.task('update', ['bump', 'git:add', 'git:commit', 'git:push']);
