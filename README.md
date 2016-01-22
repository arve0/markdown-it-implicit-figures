# markdown-it-implicit-figures [![Build Status](https://travis-ci.org/arve0/markdown-it-implicit-figures.svg?branch=master)](https://travis-ci.org/arve0/markdown-it-implicit-figures) [![npm version](https://badge.fury.io/js/markdown-it-implicit-figures.svg)](http://badge.fury.io/js/markdown-it-implicit-figures)

Render images occurring by itself in a paragraph as `<figure><img ...></figure>`, similar to [pandoc's implicit figures](http://pandoc.org/README.html#images).

Example input:
```md
![](fig.png)

![Alt text](fig.png)

paragraph with inline ![](img.png)

![||](fig.png)
```

Output:
```html
<figure><img src="fig.png" alt=""></figure>

<figure><img src="fig.png" alt="Alt text"><figcaption>Alt text</figcaption></figure>

<p>paragraph with inline <img src="img.png" alt=""></p>

<p><img src="img.png" alt=""></p>
```


## Install

```
$ npm install --save markdown-it-implicit-figures
```


## Usage

```js
var md = require('markdown-it')();
var implicitFigures = require('markdown-it-implicit-figures');

md.use(implicitFigures, {
  dataType: false,  // <figure data-type="image">, default: false
  figcaption: false,  // <figcaption>alternative text</figcaption>, default: false
  forceImg: "|"  // default: "||"
});

var src = 'text with ![](img.png)\n\n![](fig.png)\n\nanother paragraph';
var res = md.render(src);

console.log(res);
```

[demo as jsfiddle](https://jsfiddle.net/arve0/1kk1h6p3/4/)

### Options

- `dataType`: Set `dataType` to `true` to declare the data-type being wrapped,
  e.g.: `<figure data-type="image">`. This can be useful for applying special
  styling for different kind of figures.
- `figcaption`: Set `figcaption` to `true` to put the alternative text in a
  `<figcaption>`-block after the image. E.g.: `![text](img.png)` renders to

  ```html
  <figure>
    <img src="img.png" alt="text">
    <figcaption>text</figcaption>
  </figure>
  ```
- `forceImg`: Searches for a string inside the markdown `alt` text field, if found forces image to render inside an `img` tag. Defaults to `"||"`


## License

MIT © [Arve Seljebu](http://arve0.github.io/)
