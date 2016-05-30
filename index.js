'use strict';

module.exports = function implicitFiguresPlugin(md, options) {
  options = options || {};

  function implicitFigures(state) {
    // do not process first and last token
    for (var i=1, l=state.tokens.length; i < (l - 1); ++i) {
      var token = state.tokens[i];

      // inline token
      if (token.type !== 'inline') { continue; }
      // no children or no more than 1 or 3
      if (!token.children || (token.children.length !== 1 && token.children.length !== 3)) { continue; }
      //if we have one child, we want it to be image
      if (token.children.length === 1 && token.children[0].type !== 'image') { continue; }
      //if we have three children, we want it to be image enclosed by a link
      if (token.children.legnth === 3
          && token.children[0].type !== 'link_open'
          && token.children[1].type !== 'image'
          && token.children[2].type !== 'link_close') {
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
      state.tokens[i - 1].type = 'figure_open';
      state.tokens[i - 1].tag = 'figure';
      state.tokens[i + 1].type = 'figure_close';
      state.tokens[i + 1].tag = 'figure';

      if (options.dataType == true) {
        state.tokens[i - 1].attrPush(['data-type', 'image']);
      }

      if (options.figcaption == true) {
        //for linked images, image is one off
        var image = (token.children.length === 1) ? token.children[0] : token.children[1];

        if (image.children && image.children.length) {
          token.children.push(
            new state.Token('figcaption_open', 'figcaption', 1)
            );
          token.children.push(
            md.utils.assign({}, image.children[0])
            );
          token.children.push(
            new state.Token('figcaption_close', 'figcaption', -1)
            );
        }
      }
    }
  }

  md.core.ruler.push('implicit_figures', implicitFigures);
};
