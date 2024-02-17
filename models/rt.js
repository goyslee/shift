var mongoose = require("mongoose");

var rtSchema = mongoose.Schema({
	text: String,
	colleagueId: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Allocator"
		},
	}
});

module.exports = mongoose.model("Rt", rtSchema);