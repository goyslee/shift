var mongoose = require("mongoose");

var officeSchema = mongoose.Schema({
	text: String,
	colleagueId: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Allocator"
		},
	}
});

module.exports = mongoose.model("Office", officeSchema);