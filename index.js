'use strict';

module.exports = function implicitFiguresPlugin(md, options) {
  options = options || {};

  function implicitFigures(state) {
    // reset tabIndex on md.render()
    var tabIndex = 1;

    // do not process first and last token
    for (var i=1, l=state.tokens.length; i < (l - 1); ++i) {
      var token = state.tokens[i];

      if (token.type !== 'inline') { continue; }
      // children: image alone, or link_open -> image -> link_close
      if (!token.children || (token.children.length !== 1 && token.children.length !== 3)) { continue; }
      // one child, should be img
      if (token.children.length === 1 && token.children[0].type !== 'image') { continue; }
      // three children, should be image enclosed in link
      if (token.children.length === 3 &&
          (token.children[0].type !== 'link_open' ||
           token.children[1].type !== 'image' ||
           token.children[2].type !== 'link_close')) {
        continue;
      }
      // prev token is paragraph open
      if (i !== 0 && state.tokens[i - 1].type !== 'paragraph_open') { continue; }
      // next token is paragraph close
      if (i !== (l - 1) && state.tokens[i + 1].type !== 'paragraph_close') { continue; }

      // We have inline token containing an image only.
      // Previous token is paragraph open.
      // Next token is paragraph close.
      // Lets replace the paragraph tokens with figure tokens.
      var figure = state.tokens[i - 1];
      figure.type = 'figure_open';
      figure.tag = 'figure';
      state.tokens[i + 1].type = 'figure_close';
      state.tokens[i + 1].tag = 'figure';

      if (options.dataType) {
        state.tokens[i - 1].attrPush(['data-type', 'image']);
      }
      var image;

      if (options.link && token.children.length === 1) {
        image = token.children[0];
        token.children.unshift(
          new state.Token('link_open', 'a', 1)
        );
        token.children[0].attrPush(['href', image.attrGet('src')]);
        token.children.push(
          new state.Token('link_close', 'a', -1)
        );
      }

      // for linked images, image is one off
      image = token.children.length === 1 ? token.children[0] : token.children[1];

      if (options.figcaption) {
        let figCaption;
        const captionObj = image.attrs.find(([k]) => k === 'title');

        if (Array.isArray(captionObj)) {
          figCaption = captionObj[1];
        }

        if (figCaption) {
          const [captionContent] = md.parseInline(figCaption);
          token.children.push(
            new state.Token('figcaption_open', 'figcaption', 1)
          );
          token.children.push(...captionContent.children);
          token.children.push(
            new state.Token('figcaption_close', 'figcaption', -1)
          );

          if (image.attrs) {
            image.attrs = image.attrs.filter(([k]) => k !== 'title');
          }
        }
      }

      if (options.copyAttrs && image.attrs) {
        const f = options.copyAttrs === true ? '' : options.copyAttrs;
        figure.attrs = image.attrs.filter(([k,v]) => k.match(f));
      }

      if (options.tabindex) {
        // add a tabindex property
        // you could use this with css-tricks.com/expanding-images-html5
        state.tokens[i - 1].attrPush(['tabindex', tabIndex]);
        tabIndex++;
      }
    }
  }
  md.core.ruler.before('linkify', 'implicit_figures', implicitFigures);
};
