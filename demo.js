'use strict';
var md = require('markdown-it')();
var markdownItImplicitFigures = require('./');

md.use(markdownItImplicitFigures);

var src = 'text with ![](img.png)\n\n![](fig.png)\n\nanother paragraph';
var res = md.render(src);

console.log(res);
