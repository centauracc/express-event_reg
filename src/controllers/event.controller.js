const Event = require("../models/event.model");

const displayEvents = async (req, res, next) => {
  try {
    const allEvents = await Event.find().lean();
    res.json(allEvents);
  } catch (err) {
    const displayEventsError = new Error("Unable to display events");
    displayEventsError.statusCode = 500;
    console.error(err);
    next(err);
  }
};

module.exports = { displayEvents };
