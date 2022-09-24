const mongoose = require("mongoose");

const VisitSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  distributor: {
    type: String,
  },
  contactName: {
    type: String,
  },
  notes: {
    type: String,
  },
    image: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Visit", VisitSchema);