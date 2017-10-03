'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-abbott:app', function () {
  this.timeout(15000);

  beforeEach(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts({
    })
    .then(() => done());
  });

  it('creates files', function (done) {
    assert.file([
      'package.json'
    ])
    .then(() => done());
  });
});
