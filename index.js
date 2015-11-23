'use strict';

module.exports = function implicitFiguresPlugin(md) {

  var defaultRender = md.renderer.rules.image;

  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    var token = tokens[idx];
    var img = defaultRender(tokens, idx, options, env, self);

    if (tokens.length === 1) {
      // image is alone
      img = '<figure>'+ img +'</figure>';
    }

    return img;
  }
};
