var mongoose = require("mongoose");

var recoupSchema = mongoose.Schema({
	text: String,
	colleagueId: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Allocator"
		},
	}
});

module.exports = mongoose.model("Recoup", recoupSchema);