var mongoose = require("mongoose");

var scissor_liftSchema = mongoose.Schema(
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

module.exports = mongoose.model("Scissor_lift", scissor_liftSchema);
