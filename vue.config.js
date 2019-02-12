const package = require('./package.json')
module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  publicPath:
    process.env.NODE_ENV === "production"
      ? `https://cdn.ruguoapp.com/${package.name}`
      : "/",
};
