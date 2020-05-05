const Event = require("../models/event.model");

const displayEvents = async (req, res, next) => {
  try {
    const allEvents = await Event.find().lean();
    res.json(allEvents);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const createEvent = async (req, res, next) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const eventIdToUpdate = req.params.id;
    const eventToUpdate = await Event.findOne({ _id: eventIdToUpdate });

    if (!eventToUpdate) {
      const invalidEventIdForUpdateError = new Error(
        "Invalid event ID for update"
      );
      invalidEventIdForUpdateError.statusCode = 404;
      throw invalidEventIdForUpdateError;
    }

    eventToUpdate.title = req.body.title;
    eventToUpdate.date = req.body.date;
    eventToUpdate.venue.address = req.body.venue.address;
    eventToUpdate.venue.postalCode = req.body.venue.postalCode;
    eventToUpdate.description = req.body.description;

    const updatedEvent = await eventToUpdate.save();
    res.json(updatedEvent);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const eventIdToDelete = req.params.id;
    const eventToDelete = await Event.findOne({ _id: eventIdToDelete });

    if (!eventToDelete) {
      const invalidEventIdForDeleteError = new Error(
        "Invalid event ID for deletion"
      );
      invalidEventIdForDeleteError.statusCode = 404;
      throw invalidEventIdForDeleteError;
    }

    const deletedEvent = await eventToDelete.remove();
    res.json(deletedEvent);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { displayEvents, createEvent, updateEvent, deleteEvent };
