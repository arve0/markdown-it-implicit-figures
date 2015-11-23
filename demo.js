'use strict';
var md = require('markdown-it')();
var implicitFigures = require('./');

md.use(implicitFigures);

var src = 'text with ![](img.png)\n\n![](fig.png)\n\nanother paragraph';
var res = md.render(src);

console.log(res);
