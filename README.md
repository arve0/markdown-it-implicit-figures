# markdown-it-implicit-figures [![Build Status](https://travis-ci.org/arve0/markdown-it-implicit-figures.svg?branch=master)](https://travis-ci.org/arve0/markdown-it-implicit-figures) [![npm version](https://badge.fury.io/js/markdown-it-implicit-figures.svg)](http://badge.fury.io/js/markdown-it-implicit-figures)

Render images occurring by itself in a paragraph as `<figure><img ...></figure>`, similar to [pandoc's implicit figures](http://pandoc.org/README.html#images).

Example input:
```md
text with ![](img.png)

![](fig.png)

another paragraph
```

Output:
```html
<p>text with <img src="img.png" alt=""></p>
<p><figure><img src="fig.png" alt=""></figure></p>
<p>another paragraph</p>
```


## Install

```
$ npm install --save markdown-it-implicit-figures
```


## Usage

```js
var md = require('markdown-it')();
var markdownItImplicitFigures = require('markdown-it-implicit-figures');

md.use(markdownItImplicitFigures);

var src = 'text with ![](img.png)\n\n![](fig.png)\n\nanother paragraph';
var res = md.render(src);

console.log(res);
```


## License

MIT © [Arve Seljebu](http://arve0.github.io/)
