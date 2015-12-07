'use strict';

var figure = function (options) {

  var dataType = (typeof options.dataType !== 'undefined') ? options.dataType : false;

  return function implicit_figure (state, startLine) {
    var content, terminate, i, l, token,
        prevLine = startLine - 1,
        nextLine = startLine + 1,
        terminatorRules = state.md.block.ruler.getRules('implicit_figure'),
        endLine = state.lineMax,
        openTag = dataType ? 'figure data-type="image"' : 'figure';

    // jump line-by-line until empty one or EOF
    for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
      // this would be a code block normally, but after paragraph
      // it's considered a lazy continuation regardless of what's there
      if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

      // quirk for blockquotes, this line should already be checked by that rule
      if (state.sCount[nextLine] < 0) { continue; }

      // Some tags can terminate paragraph without empty line.
      terminate = false;
      for (i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) { break; }
    }

    if (!state.isEmpty(prevLine) || !state.isEmpty(nextLine)) { return false; }

    content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

    if (content.charCodeAt(0) !== 0x21/* ! */) { return false; }
    if (content.charCodeAt(1) !== 0x5B/* [ */) { return false; }

    state.line = nextLine;

    token          = state.push('figure_open', openTag, 1);
    token.map      = [ startLine, state.line ];

    token          = state.push('inline', '', 0);
    token.content  = content;
    token.map      = [ startLine, state.line ];
    token.children = [];

    token          = state.push('figure_close', 'figure', -1);

    return true;
  };
};

module.exports = function implicitFiguresPlugin(md, options) {

  options = options || {};

  md.block.ruler.before('paragraph', 'implicit_figure', figure(options), { alt: ['paragraph'] });
};
