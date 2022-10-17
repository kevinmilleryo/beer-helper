const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  notes: {
    type: String,
    required: true,
  },
   distributor: {
    type: String,
  },
   accountType: {
    type: String,
    enum: ['On-Premise','Off-Premise']
  },
   contact: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
   userName: {
    type: String,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Account", AccountSchema);
