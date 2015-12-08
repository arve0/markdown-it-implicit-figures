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
<figure><img src="fig.png" alt=""></figure>
<p>another paragraph</p>
```


## Options

Enabling the `dataType` boolean flag in the options will generate figure tags
that also declare the data-type being wrapped, e.g.: `<figure data-type="image">`.
This can be useful for applying special styling for different kind of figures.

## Install

```
$ npm install --save markdown-it-implicit-figures
```


## Usage

```js
var md = require('markdown-it')();
var implicitFigures = require('markdown-it-implicit-figures');

md.use(implicitFigures);

var src = 'text with ![](img.png)\n\n![](fig.png)\n\nanother paragraph';
var res = md.render(src);

console.log(res);
```


## License

MIT © [Arve Seljebu](http://arve0.github.io/)
