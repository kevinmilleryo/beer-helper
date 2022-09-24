

const Comment = require("../models/Comment");
const User = require("../models/User");

module.exports = {
  createComment: async (req, res) => {
    try {
      const commentUser = await User.findById(req.user.id)
      await Comment.create({
        comment: req.body.comment,
        date: req.body.date,
        likes: 0,
        post: req.params.id,
        createdBy: commentUser.userName,
        createdById: req.user.id
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  //! Added delete comment method
  deleteComment: async (req, res) => {
    try {
      await Comment.deleteOne({ _id: req.params.commentid })
      console.log("comment removed")
      res.redirect("/post/"+req.params.postid);
    } catch (err) {
      console.log(err);
    }
  },
   likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.commentid },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect("/post/"+req.params.postid);
    } catch (err) {
      console.log(err);
    }
  },
};
