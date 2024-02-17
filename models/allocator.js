const mongoose = require("mongoose");
const AllocatorSchema = new mongoose.Schema({
  pickTarget: Number,
  tipTarget: Number,
  loadTarget: Number,
  outage: Boolean,
  outageTime: Number,
  hours: Number,
  shift: String,
  pickMen: Number,
  loaderNeed: Number,
  tipMen: Number,
  truckDriver: Number,
  name: {
    type: String,
    index: true,
    unique: true,
    dropups: true,
  },
  allocatedDekit: {
    type: Number,
    default: 0,
  },
  allocatedRtDriver: {
    type: Number,
    default: 0,
  },
  allocatedDrivers: {
    type: Number,
    default: 0,
  },
  allocatedTippers: {
    type: Number,
    default: 0,
  },
  allocatedLoaders: {
    type: Number,
    default: 0,
  },
  allocatedRts: {
    type: Number,
    default: 0,
  },
  allocatedRunners: {
    type: Number,
    default: 0,
  },
  allocatedRebadge: {
    type: Number,
    default: 0,
  },
  allocatedPickers: {
    type: Number,
    default: 0,
  },
  allocatedScissor_liftMen: {
    type: Number,
    default: 0,
  },
  allocatedCounterBalance: {
    type: Number,
    default: 0,
  },
  allocatedBanksman: {
    type: Number,
    default: 0,
  },
  bCount: {
    type: Number,
    default: 0,
  },

  isAllocated: {
    type: Boolean,
    default: false,
  },
  allocatedSheet: {
    type: Boolean,
    default: false,
  },
  time: {
    type: String,
    // unique: true,
    // dropDups: true
  },
  scissor_lift: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scissor_lift",
    },
  ],
  pickers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Picker",
    },
  ],
  trucks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
  ],
  loading: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loader",
    },
  ],
  tip: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tipper",
    },
  ],
  dekit: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dekit",
    },
  ],
  csc: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Csc",
    },
  ],
  rt: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rt",
    },
  ],
  chill_pick: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChillPick",
    },
  ],
  counterBalance: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CounterBalance",
    },
  ],
  racking: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Racking",
    },
  ],
  recoup: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recoup",
    },
  ],
  banksman: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Banksman",
    },
  ],
  training: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Training",
    },
  ],
  union: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Union",
    },
  ],
  hygiene: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hygiene",
    },
  ],
  runner: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Runner",
    },
  ],
  vls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vls",
    },
  ],
  pickmanager: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pickmanager",
    },
  ],
  scissor_liftmanager: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scissor_liftmanager",
    },
  ],
  truckmanager: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Truckmanager",
    },
  ],
  office: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Office",
    },
  ],
  rebadge: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Allocator", AllocatorSchema);
