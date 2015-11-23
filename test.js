'use strict';
var assert = require('assert');
var Md = require('markdown-it');
var markdownItImplicitFigures = require('./');

describe('markdown-it-implicit-figures', function() {
  var md;
  beforeEach(function(){
    md = Md().use(markdownItImplicitFigures);
  });

  it('should add <figure> when image is by itself in a paragraph', function () {
    var src = 'text with ![](img.png)\n\n![](fig.png)\n\nanother paragraph';
    var expected = '<p>text with <img src="img.png" alt=""></p>\n<p><figure><img src="fig.png" alt=""></figure></p>\n<p>another paragraph</p>\n';
    var res = md.render(src);
    assert.equal(res, expected);
  });

});
