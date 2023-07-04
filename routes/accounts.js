const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const accountsController = require("../controllers/accounts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Account Routes - simplified for now
router.get("/:id", ensureAuth, accountsController.getAccount);

router.post(
  "/createAccount",
  upload.single("file"),
  accountsController.createAccount
);

router.delete("/deleteAccount/:id", accountsController.deleteAccount);

module.exports = router;
