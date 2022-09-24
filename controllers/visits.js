const cloudinary = require("../middleware/cloudinary");
const Visit = require("../models/Visit");


module.exports = {
  getProfile: async (req, res) => {
    try {
      const visits = await Visit.find({ user: req.user.id });
      res.render("visits.ejs", { visits: visits, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  // getFeed: async (req, res) => {
  //   try {
  //     const posts = await Visit.find().sort({ createdAt: "desc" }).lean();
  //     res.render("feed.ejs", { posts: posts });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  getVisit: async (req, res) => {
    try {
      const visit = await Visit.findById(req.params.id);
    //   const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "asc" }).lean();
      res.render("visit.ejs", { visit: visit, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createVisit: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Visit.create({
        date: req.body.date,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        accountName: req.body.accountName,
        distributor: req.body.distributor,
        contactName: req.body.contactName,
        notes: req.body.notes,
        userId: req.user.id,
      });
      console.log("Visit has been added!");
      res.redirect("/visit");
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
