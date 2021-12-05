const build = require("./build");

build({
  banner: {
    js: '"use strict";',
  },
  minify: true,
});
