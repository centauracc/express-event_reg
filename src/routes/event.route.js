const express = require("express");
const router = express.Router();
const { displayEvents } = require("../controllers/event.controller");

router.get("/", displayEvents);

module.exports = router;
