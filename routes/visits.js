const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const visitsController = require("../controllers/visits");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Visit Routes - simplified for now
router.get("/:id", ensureAuth, visitsController.getVisit);

router.post("/createVisit", upload.single("file"), visitsController.createVisit);

router.delete("/deleteVisit/:id", visitsController.deleteVisit);

module.exports = router;