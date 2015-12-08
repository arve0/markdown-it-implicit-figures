'use strict';

module.exports = function implicitFiguresPlugin(md) {

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
      // Lets replace the paragraph tokens with figure tokens.
      state.tokens[i - 1].type = 'figure_open';
      state.tokens[i - 1].tag = 'figure';
      state.tokens[i + 1].type = 'figure_close';
      state.tokens[i + 1].tag = 'figure';
    }
  }

  md.core.ruler.push('implicit_figures', implicitFigures);
};
