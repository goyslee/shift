var mongoose = require("mongoose");

var dbSchema = mongoose.Schema({
  name: String
});

module.exports = mongoose.model("Db", dbSchema);