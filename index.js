'use strict';

var IMAGE_RE = /(?:\s|^)(!\[.*?\]\((.+?)\))(?:\s|$)/;

var hasImage = function (str) {
  return IMAGE_RE.test(str);
};

var tokenHasOnlyImageChildren = function (token) {
  return token &&
    token.type === "inline" &&
    token.children.length === 1 &&
    token.children[0].type === "image";
};

var getTokensToUpdate = function (token, index, tokens) {

  var testToken;

  if (token.type === "paragraph_open") {
    testToken = tokens[index + 1];
  }

  if (token.type === "paragraph_close") {
    testToken = tokens[index - 1];
  }

  return tokenHasOnlyImageChildren(testToken);
};

var updateTokens = function (tokens, options) {

  var len = tokens.length;

  for (var i = tokens.length - 1; i >= 0; i--) {
    var token = tokens[i];

    // First update the tag, same for open and close
    token.tag = "figure";

    // Mark as a new token type
    token.type = token.type === "paragraph_open" ? "figure_open" : "figure_close";

    if (token.type === "figure_open" && options.dataType) {

      // Apply optional attrs
      token.attrs = token.attrs || [];
      token.attrs.push(["data-type", "image"]);
    }
  }
};

var implicitFigures = function (options) {

  return function (state) {

    // Return early if no images anywhere
    if (!hasImage(state.src)) {
      return false;
    }

    // Get paragraph tokens that will need to be updated
    var tokensToUpdate = state.tokens.filter(getTokensToUpdate);

    if (tokensToUpdate.length) {

      // Update any captured tokens
      updateTokens(tokensToUpdate, options);
    }
  };
};

module.exports = function implicitFiguresPlugin(md, options) {

  options = options || {};
  md.core.ruler.push('implicit_figure', implicitFigures(options));
};
