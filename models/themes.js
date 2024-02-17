var mongoose = require("mongoose");

var themesSchema = mongoose.Schema({
  name: String
});

module.exports = mongoose.model("Themes", themesSchema);