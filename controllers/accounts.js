const cloudinary = require("../middleware/cloudinary");
const Account = require("../models/Account");
const Visit = require("../models/Visit");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const accounts = await Account.find({ user: req.user.id });
      res.render("profile.ejs", { accounts: accounts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const accounts = await Account.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", {
        accounts: accounts,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getAscFeed: async (req, res) => {
    try {
      const accounts = await Account.find().sort({ createdAt: "asc" }).lean();
      res.render("feed.ejs", {
        accounts: accounts,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  search: async (req, res) => {
  const query = req.query.query;
  try {
    const accounts = await Account.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { notes: { $regex: query, $options: 'i' } },
        { distributor: { $regex: query, $options: 'i' } },
        { userName: { $regex: query, $options: 'i' } },
        { accountType: { $regex: query, $options: 'i' } },
        { contact: { $regex: query, $options: 'i' } },
      ],
    });
    res.render('feed.ejs', 
    { accounts, user: req.user }
     );
  } catch (err) {
    console.error('Error searching accounts:', err);
    res.render('error');
  }
},
  getAccount: async (req, res) => {
    try {
      const account = await Account.findById(req.params.id);
      const visits = await Visit.find({ account: req.params.id })
        .sort({ createdAt: "asc" })
        .lean();
      res.render("account.ejs", {
        account: account,
        user: req.user,
        visits: visits,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createAccount: async (req, res) => {
    try {
      const accountUser = await User.findById(req.user.id);
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Account.create({
        name: req.body.name,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        notes: req.body.notes,
        distributor: req.body.distributor,
        userName: accountUser.userName,
        accountType: req.body.accountType,
        contact: req.body.contact,
        user: req.user.id,
      });
      console.log("Account has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },

  deleteAccount: async (req, res) => {
    try {
      // Find account by id
      let account = await Account.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(account.cloudinaryId);
      // Delete post from db
      await Account.remove({ _id: req.params.id });
      console.log("Deleted Account");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
