const mongoose = require("mongoose");
const ColleagueSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    fullName: String,
    userNumber: String,
    holiday: { type: Boolean, default: false },
    isIn: { type: Boolean, default: true },
    absence: { type: Boolean, default: false },
    startDate: {
      type: Date,
      default: () => 60 * 60 * 1000,
      dropDups: true,
    },
    position: String,
    organization: String,
    shift: String,
    team: Number, // team 10 is Agency
    colleagueinfo: String,
    isAllocated: { type: Boolean, default: false },
    firstAider: { type: Boolean, default: false },
    pick: Boolean,
    
        trucks: {
          type: Boolean,
          default: false,
        },
        scissor_lift: {
          type: Boolean,
          default: false,
        },
        sd: {
          type: Boolean,
          default: false,
        },
        pick: {
          type: Boolean,
          default: false,
        },
        loading: {
          type: Boolean,
          default: false,
        },
        tip: {
          type: Boolean,
          default: false,
        },
        dekit: {
          type: Boolean,
          default: false,
        },
        csc: {
          type: Boolean,
          default: false,
        },
        rt: {
          type: Boolean,
          default: false,
        },
        chill_pick: {
          type: Boolean,
          default: false,
        },
        counterBalance: {
          type: Boolean,
          default: false,
        },
        racking: {
          type: Boolean,
          default: false,
        }, //**
        recoup: {
          type: Boolean,
          default: false,
        }, //** first aider
        banksman: {
          type: Boolean,
          default: false,
        },
        training: {
          type: Boolean,
          default: false,
        }, //**
        union: {
          type: Boolean,
          default: false,
        }, //**
        // runner: {
        //   type: Boolean,
        //   default: false
        // },
        hygiene: {
          type: Boolean,
          default: true,
        }, //*changed to false(was true in elstree) in Pineham database
        vls: {
          type: Boolean,
          default: false,
        },
        // sd: {
        //   type: Boolean,
        //   default: false
        // },
        ambient_pick: {
          type: Boolean,
          default: false,
        },
        check: {
          type: Boolean,
          default: false,
        },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  }
);

module.exports = mongoose.model("Colleague", ColleagueSchema);
