var path = require("path");

module.exports = {
  Article: require(path.join(__dirname, "Article")),
  Note: require("./note")
};