# postcss-decls-ref

[![Greenkeeper badge](https://badges.greenkeeper.io/Jeff2Ma/postcss-decls-ref.svg)](https://greenkeeper.io/)

<img align="right" width="130" height="130" title="PostCSS" src="http://postcss.github.io/postcss/logo.svg">

[![Build Status](https://travis-ci.org/Jeff2Ma/postcss-decls-ref.svg?branch=master)](https://travis-ci.org/Jeff2Ma/postcss-decls-ref)
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/Jeff2Ma/postcss-decls-ref?branch=master&svg=true)](https://ci.appveyor.com/project/Jeff2Ma/postcss-decls-ref)
[![npm version](https://badge.fury.io/js/postcss-decls-ref.svg)](https://www.npmjs.com/package/postcss-decls-ref)
[![change-log](https://img.shields.io/badge/changelog-md-blue.svg)](https://github.com/Jeff2Ma/postcss-decls-ref/blob/master/CHANGELOG.md)

> A PostCSS plugin that extend declaration block from an existed rule with target selector (like sass `@extend`).


## Example

### Input

```css
.classA {
	background-image: url(logo.svg);
	width: 12px;
	height: 12px;
}
.classB {
	float: left;
	@ref .classA;
}

```

### Output

### 1) when option `refMod: 'clone'`

```css
.classA {
	background-image: url(logo.svg);
	width: 12px;
	height: 12px;
}
.classB {
	float: left;
	background-image: url(logo.svg);
	width: 12px;
	height: 12px;
}
```

### 2) when option `refMod: 'group'`

```css
.classA, .classB {
	background-image: url(logo.svg);
	width: 12px;
	height: 12px;
}
.classB {
	float: left;
}
```

## Features

- Support `@media` condition.

- AtRule name can dynamic (default is `@ref`).

## Installation

```bash
npm install postcss-decls-ref --save-dev
```
## Usage

Work with [Gulp](//gulpjs.com)

Example:

```javascript
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var ref = require('postcss-decls-ref');

gulp.task('css', function () {
	return gulp.src('./input.css')
		.pipe(postcss([ref()]))
		.pipe(gulp.dest('./output'));
});
```

## Options

### refMod

> Decide the output css result. The value is `clone` or `group`. 

- Default: `'clone'`
- Required: `false`

### dynamicAtRule

> Dynamic the atRule name, remember not to rename the css existed one (like `@media`, `@support` , etc). `@` character is not needed. Recommend: `@ref`, `@apply`.

- Default: `'ref'`
- Required: `false`

## Contributing

Issues and Pull requests are welcome.

```bash
$ git clone github.com/Jeff2Ma/postcss-decls-ref
$ cd postcss-decls-ref
$ npm i
$ gulp # for dev
$ gulp test # for test
```
