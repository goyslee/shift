var mongoose = require("mongoose");


var ColleagueshiftstateSchema = new mongoose.Schema({

    noShift: Number,
    absence: Number,
    holiday: Number,
    onShift: Number
    
    });
    

module.exports = mongoose.model("Colleagueshiftstate", ColleagueshiftstateSchema);

