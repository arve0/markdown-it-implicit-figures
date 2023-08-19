const md = require('markdown-it')();
const implicitFigures = require('markdown-it-implicit-figures');

md.use(implicitFigures, { dataType: true, figcaption: true });

const src = 'text with ![](img.png)\n\n![Will become caption.](fig.png "Foo bar")\n\nanother paragraph';

md.render(src) // output below
