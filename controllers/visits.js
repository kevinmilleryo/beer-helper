

const Visit = require("../models/Visit");
const User = require("../models/User");

module.exports = {
  createVisit: async (req, res) => {
    try {
      const visitUser = await User.findById(req.user.id)
      await Visit.create({
        comment: req.body.comment,
        date: req.body.date,
        account: req.params.id,
        createdBy: visitUser.userName,
        createdById: req.user.id
      });
      console.log("Visit has been added!");
      res.redirect("/account/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  //! Added delete visit method
  deleteVisit: async (req, res) => {
    try {
      await Visit.deleteOne({ _id: req.params.visitid })
      console.log("visit removed")
      res.redirect("/account/"+req.params.accountid);
    } catch (err) {
      console.log(err);
    }
  },
};
