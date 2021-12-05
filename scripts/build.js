const esbuild = require("esbuild");

/**
 * @param {void | esbuild.BuildOptions} extraOptions
 * @returns {void}
 */
function build(extraOptions) {
  /** @type {esbuild.BuildOptions} */
  const options = {
    bundle: true,
    entryPoints: ["src/main.ts"],
    outfile: "public/bundle.js",
  };
  if (extraOptions) Object.assign(options, extraOptions);
  esbuild.build(options);
}

module.exports = build;
