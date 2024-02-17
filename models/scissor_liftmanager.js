var mongoose = require("mongoose");

var scissor_liftmanagerSchema = mongoose.Schema(
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

module.exports = mongoose.model(
  "Scissor_liftmanager",
  scissor_liftmanagerSchema
);
