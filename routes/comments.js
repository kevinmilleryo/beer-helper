

const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.post("/createComment/:id", commentsController.createComment);
//! Added delete comment route
router.delete("/deleteComment/:postid/:commentid", commentsController.deleteComment);

router.put("/likeComment/:postid/:commentid", commentsController.likeComment);


module.exports = router;