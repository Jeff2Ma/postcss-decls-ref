var should = require('should');
var fs = require('fs');
var path = require('path');
var vfs = require('vinyl-fs');
var through2 = require('through2');
var postcss = require('gulp-postcss');
var noop = function () {
};
var ref = require('../index.js');

describe('postcss-decls-ref Unit Test', function () {

	describe('Option `refMod` is `clone`:', function () {

		it('Basic function', function (done) {
			vfs.src('./test/css/t1.css')
				.pipe(postcss([ref()]))
				.pipe(through2.obj(function (file, enc, cb) {
					var content = file.contents.toString();
					// fs.writeFileSync('./test/css/t1.1.css', content, 'utf8');
					var cssExpected = fs.readFileSync(path.resolve(process.cwd(), './test/css/t1.1.css'), {encoding: 'utf8'});
					cssExpected.should.be.equal(content);
					cb();
				}))
				.on('data', noop)
				.on('end', done);
		});

		it('Different Orders are not effect.', function (done) {
			vfs.src('./test/css/t2.css')
				.pipe(postcss([ref()]))
				.pipe(through2.obj(function (file, enc, cb) {
					var content = file.contents.toString();
					// fs.writeFileSync('./test/css/t2.1.css', content, 'utf8');
					var cssExpected = fs.readFileSync(path.resolve(process.cwd(), './test/css/t2.1.css'), {encoding: 'utf8'});
					cssExpected.should.be.equal(content);
					cb();
				}))
				.on('data', noop)
				.on('end', done);
		});

		it('Support for @media context.', function (done) {
			vfs.src('./test/css/t3.css')
				.pipe(postcss([ref()]))
				.pipe(through2.obj(function (file, enc, cb) {
					var content = file.contents.toString();
					// fs.writeFileSync('./test/css/t3.1.css', content, 'utf8');
					var cssExpected = fs.readFileSync(path.resolve(process.cwd(), './test/css/t3.1.css'), {encoding: 'utf8'});
					cssExpected.should.be.equal(content);
					cb();
				}))
				.on('data', noop)
				.on('end', done);
		});

		it('Mulit target selectors are work well.', function (done) {
			vfs.src('./test/css/t4.css')
				.pipe(postcss([ref()]))
				.pipe(through2.obj(function (file, enc, cb) {
					var content = file.contents.toString();
					// fs.writeFileSync('./test/css/t4.1.css', content, 'utf8');
					var cssExpected = fs.readFileSync(path.resolve(process.cwd(), './test/css/t4.1.css'), {encoding: 'utf8'});
					cssExpected.should.be.equal(content);
					cb();
				}))
				.on('data', noop)
				.on('end', done);
		});

		it('Work well when target selector is part of group selectors.', function (done) {
			vfs.src('./test/css/t5.css')
				.pipe(postcss([ref()]))
				.pipe(through2.obj(function (file, enc, cb) {
					var content = file.contents.toString();
					// fs.writeFileSync('./test/css/t5.1.css', content, 'utf8');
					var cssExpected = fs.readFileSync(path.resolve(process.cwd(), './test/css/t5.1.css'), {encoding: 'utf8'});
					cssExpected.should.be.equal(content);
					cb();
				}))
				.on('data', noop)
				.on('end', done);
		});


		it('Sub Class contexts are work well.', function (done) {
			vfs.src('./test/css/t6.css')
				.pipe(postcss([ref()]))
				.pipe(through2.obj(function (file, enc, cb) {
					var content = file.contents.toString();
					// // fs.writeFileSync('./test/css/t6.1.css', content, 'utf8');
					var cssExpected = fs.readFileSync(path.resolve(process.cwd(), './test/css/t6.1.css'), {encoding: 'utf8'});
					cssExpected.should.be.equal(content);
					cb();
				}))
				.on('data', noop)
				.on('end', done);
		});


	});

	describe('Option `refMod` is `group`:', function () {

		it('Basic function', function (done) {
			vfs.src('./test/css/t1.css')
				.pipe(postcss([ref({refMod: 'group'})]))
				.pipe(through2.obj(function (file, enc, cb) {
					var content = file.contents.toString();
					// fs.writeFileSync('./test/css/t1.2.css', content, 'utf8');
					var cssExpected = fs.readFileSync(path.resolve(process.cwd(), './test/css/t1.2.css'), {encoding: 'utf8'});
					cssExpected.should.be.equal(content);
					cb();
				}))
				.on('data', noop)
				.on('end', done);
		});


		it('Different Orders are not effect.', function (done) {
			vfs.src('./test/css/t2.css')
				.pipe(postcss([ref({refMod: 'group'})]))
				.pipe(through2.obj(function (file, enc, cb) {
					var content = file.contents.toString();
					// fs.writeFileSync('./test/css/t2.2.css', content, 'utf8');
					var cssExpected = fs.readFileSync(path.resolve(process.cwd(), './test/css/t2.2.css'), {encoding: 'utf8'});
					cssExpected.should.be.equal(content);
					cb();
				}))
				.on('data', noop)
				.on('end', done);
		});

		it('Support for @media context.', function (done) {
			vfs.src('./test/css/t3.css')
				.pipe(postcss([ref({refMod: 'group'})]))
				.pipe(through2.obj(function (file, enc, cb) {
					var content = file.contents.toString();
					// fs.writeFileSync('./test/css/t3.2.css', content, 'utf8');
					var cssExpected = fs.readFileSync(path.resolve(process.cwd(), './test/css/t3.2.css'), {encoding: 'utf8'});
					cssExpected.should.be.equal(content);
					cb();
				}))
				.on('data', noop)
				.on('end', done);
		});

		it('Mulit target selectors are work well.', function (done) {
			vfs.src('./test/css/t4.css')
				.pipe(postcss([ref({refMod: 'group'})]))
				.pipe(through2.obj(function (file, enc, cb) {
					var content = file.contents.toString();
					// fs.writeFileSync('./test/css/t4.2.css', content, 'utf8');
					var cssExpected = fs.readFileSync(path.resolve(process.cwd(), './test/css/t4.2.css'), {encoding: 'utf8'});
					cssExpected.should.be.equal(content);
					cb();
				}))
				.on('data', noop)
				.on('end', done);
		});

		it('Work well when target selector is part of group selectors.', function (done) {
			vfs.src('./test/css/t5.css')
				.pipe(postcss([ref({refMod: 'group'})]))
				.pipe(through2.obj(function (file, enc, cb) {
					var content = file.contents.toString();
					// fs.writeFileSync('./test/css/t5.2.css', content, 'utf8');
					var cssExpected = fs.readFileSync(path.resolve(process.cwd(), './test/css/t5.2.css'), {encoding: 'utf8'});
					cssExpected.should.be.equal(content);
					cb();
				}))
				.on('data', noop)
				.on('end', done);
		});


		it('Sub Class contexts are work well.', function (done) {
			vfs.src('./test/css/t6.css')
				.pipe(postcss([ref({refMod: 'group'})]))
				.pipe(through2.obj(function (file, enc, cb) {
					var content = file.contents.toString();
					// fs.writeFileSync('./test/css/t6.2.css', content, 'utf8');
					var cssExpected = fs.readFileSync(path.resolve(process.cwd(), './test/css/t6.2.css'), {encoding: 'utf8'});
					cssExpected.should.be.equal(content);
					cb();
				}))
				.on('data', noop)
				.on('end', done);
		});
	});

});
