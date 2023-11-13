# markdown-it-implicit-figures [![Build Status](https://github.com/arve0/markdown-it-implicit-figures/actions/workflows/test.yml/badge.svg)](https://github.com/arve0/markdown-it-implicit-figures/actions/workflows/test.yml) [![npm version](https://badge.fury.io/js/markdown-it-implicit-figures.svg)](http://badge.fury.io/js/markdown-it-implicit-figures)

Render images occurring by itself in a paragraph as `<figure><img ...></figure>`, similar to [pandoc's implicit figures](http://pandoc.org/README.html#images).

Example input:
```md
text with ![](img.png)

![](fig.png)

works with links too:

[![](fig.png)](page.html)
```

Output:
```html
<p>text with <img src="img.png" alt=""></p>
<figure><img src="fig.png" alt=""></figure>
<p>works with links too:</p>
<figure><a href="page.html"><img src="fig.png" alt=""></a></figure>
```


## Install

```
$ npm install --save markdown-it-implicit-figures
```


## Usage

```js
const md = require('markdown-it')();
const implicitFigures = require('markdown-it-implicit-figures');

md.use(implicitFigures, {
  dataType: false,  // <figure data-type="image">, default: false
  figcaption: false,  // <figcaption>alternative text</figcaption>, default: false
  keepAlt: false // <img alt="alt text" .../><figcaption>alt text</figcaption>, default: false
  lazy: false, // <img loading="lazy" ...>, default: false
  link: false // <a href="img.png"><img src="img.png"></a>, default: false
  tabindex: false, // <figure tabindex="1+n">..., default: false
});

const src = 'text with ![](img.png)\n\n![](fig.png)\n\nanother paragraph';
const res = md.render(src);

console.log(res);
```

[demo in RunKit](https://runkit.com/embed/k48mqe5q6p56)

### Options

- `dataType`: Set `dataType` to `true` to declare the data-type being wrapped,
  e.g.: `<figure data-type="image">`. This can be useful for applying special
  styling for different kind of figures.
- `figcaption`: Set `figcaption` to `true` or `alt` to put the alternative text
  in a `<figcaption>`-block after the image. E.g.: `![text](img.png)` renders to

  ```html
  <figure>
    <img src="img.png" alt="">
    <figcaption>text</figcaption>
  </figure>
  ```
  - Set `figcaption` to `title` to put the title text in a `<figcaption>`-block
    after the image. E.g.: `![text](img.png "title")` renders to
    ```html
    <figure>
      <img src="img.png" alt="text">
      <figcaption>title</figcaption>
    </figure>
    ```
- `keepAlt`: Set `keepAlt` to `true` to prevent it from being cleared when turned
  into a `figcaption`, E.g.: `![text](img.png)` renders to

  ```html
  <figure>
    <img src="img.png" alt="text">
    <figcaption>text</figcaption>
  </figure>
  ```
- `tabindex`: Set `tabindex` to `true` to add a `tabindex` property to each
  figure, beginning at `tabindex="1"` and incrementing for each figure
  encountered. Could be used with [this css-trick](https://css-tricks.com/expanding-images-html5/),
  which expands figures upon mouse-over.
- `lazy`: Set `lazy` to `true` to add `loading="lazy"` to image element.
- `link`: Put a link around the image if there is none yet.
- `copyAttrs`: Copy attributes matching (RegExp or string) `copyAttrs` to `figure` element.


## License

MIT © [Arve Seljebu](http://arve0.github.io/)
