var mongoose = require("mongoose");
var banksmanSchema = mongoose.Schema({
    text: String,
    colleagueId: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Allocator"
        },
    }
});
module.exports = mongoose.model("Banksman", banksmanSchema);