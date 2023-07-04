

const express = require("express");
const router = express.Router();
const visitsController = require("../controllers/visits");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Visit Routes - simplified for now
router.post("/createVisit/:id", visitsController.createVisit);
// Added delete visit route
router.delete("/deleteVisit/:accountid/:visitid", visitsController.deleteVisit);



module.exports = router;