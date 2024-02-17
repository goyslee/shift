var mongoose = require("mongoose");

var chill_pickSchema = mongoose.Schema(
  {
    text: String,
    colleagueId: String,
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Allocator",
      },
    },
  }
);

module.exports = mongoose.model("ChillPick", chill_pickSchema);
