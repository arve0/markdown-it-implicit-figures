'use strict';

module.exports = function implicitFiguresPlugin(md, options) {
  options = options || {};
  options.forceImg = "||";

  function implicitFigures(state) {
    // do not process first and last token
    for (var i=1, l=state.tokens.length; i < (l - 1); ++i) {
      var token = state.tokens[i];

      // inline token
      if (token.type !== 'inline') { continue; }
      // inline token have 1 child
      if (!token.children || token.children.length !== 1) { continue; }
      // child is image
      if (token.children[0].type !== 'image') { continue; }
      // prev token is paragraph open
      if (i !== 0 && state.tokens[i - 1].type !== 'paragraph_open') { continue; }
      // next token is paragraph close
      if (i !== (l - 1) && state.tokens[i + 1].type !== 'paragraph_close') { continue; }

      // We have inline token containing an image only.
      // Previous token is paragraph open.
      // Next token is paragraph close.
      // Now let's scan the image alt text for forceImg indicator.
      if (token.children[0].content.indexOf(options.forceImg) !== -1) {
        var captions = token.children[0].content.split(options.forceImg);
        // Remove blank strings after splitting text at forceImg markers
        for (var y = 0; y < captions.length; y++) {
          if (captions[y].length === 0) {
            captions.splice(y, 1);
          }
        }
        // Then convert leftover strings into sentences.
        token.children[0].children[0].content = captions.join('. ');
        continue;
      }

      // Lets replace the paragraph tokens with figure tokens.
      state.tokens[i - 1].type = 'figure_open';
      state.tokens[i - 1].tag = 'figure';
      state.tokens[i + 1].type = 'figure_close';
      state.tokens[i + 1].tag = 'figure';

      if (options.dataType == true) {
        state.tokens[i - 1].attrPush(['data-type', 'image']);
      }

      if (options.figcaption == true) {
        var image = token.children[0];
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
