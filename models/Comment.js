const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  date: {
   type: Date,
   reqired: true,
  },
  comment: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
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

module.exports = mongoose.model("Comment", CommentSchema);
