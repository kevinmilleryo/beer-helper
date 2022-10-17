const mongoose = require("mongoose");

const VisitSchema = new mongoose.Schema({
  date: {
   type: Date,
   reqired: true,
  },
  comment: {
    type: String,
    required: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },  
  //! Added new schema properties to link comments to users - username for attribution, ID for show/hide delete button
  createdBy: {
    type: String,
    ref: "User",
  },
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  //! end changes
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Visit", VisitSchema);
