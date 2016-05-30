'use strict';
var assert = require('assert');
var Md = require('markdown-it');
var implicitFigures = require('./');

describe('markdown-it-implicit-figures', function() {
  var md;
  beforeEach(function(){
    md = Md().use(implicitFigures);
  });

  it('should add <figure> when image is by itself in a paragraph', function () {
    var src = 'text with ![](img.png)\n\n![](fig.png)\n\nanother paragraph';
    var expected = '<p>text with <img src="img.png" alt=""></p>\n<figure><img src="fig.png" alt=""></figure>\n<p>another paragraph</p>\n';
    var res = md.render(src);
    assert.equal(res, expected);
  });

  it('should add <figure> when image is by itself in a paragraph and preceeded by a standalone link', function () {
    md = Md().use(implicitFigures, { dataType: true, figcaption: true });
    var src = '[![Caption](fig.png)](http://example.com)';
    var expected = '<figure data-type="image"><a href="http://example.com"><img src="fig.png" alt="Caption"></a><figcaption>Caption</figcaption></figure>\n';
    var res = md.render(src);
    assert.equal(res, expected);
  });

  it('should add data-type=image to figures when opts.dataType is set', function () {
    md = Md().use(implicitFigures, { dataType: true });
    var src = '![](fig.png)\n';
    var expected = '<figure data-type="image"><img src="fig.png" alt=""></figure>\n';
    var res = md.render(src);
    assert.equal(res, expected);
  });

  it('should add convert alt text into a figcaption when opts.figcaption is set', function () {
    md = Md().use(implicitFigures, { figcaption: true });
    var src = '![This is a caption](fig.png)';
    var expected = '<figure><img src="fig.png" alt="This is a caption"><figcaption>This is a caption</figcaption></figure>\n';
    var res = md.render(src);
    assert.equal(res, expected);
  });

});
