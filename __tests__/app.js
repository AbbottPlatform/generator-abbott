'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-abbott:app', () => {
  before(function () {
    this.timeout(3000);
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
      });
  });

  it('creates files', () => {
    assert.file([
      'package.json'
    ]);
  });
});
