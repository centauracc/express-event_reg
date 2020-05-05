const express = require("express");
const router = express.Router();
const {
  displayEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");
const { validateJsonContent } = require("../utils/common");

router.get("/", displayEvents);
router.post("/", validateJsonContent, createEvent);
router.patch("/:id", validateJsonContent, updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
