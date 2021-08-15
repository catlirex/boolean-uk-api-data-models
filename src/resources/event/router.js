const eventRouter = require("express").Router();

const { event } = require("../../utils/database");
const {
  getAllEvents,
  postOneEvent,
  patchOneEvent,
  deleteOneEvent,
  getEventModels,
  getEventDesigners,
  getEventGuest,
} = require("./controller");

eventRouter.get("/:eventName/models", getEventModels);
eventRouter.get("/:eventName/designers", getEventDesigners);
eventRouter.get("/:eventName/guests", getEventGuest);
eventRouter.get("/", getAllEvents);
eventRouter.post("/", postOneEvent);
eventRouter.patch("/:id", patchOneEvent);
eventRouter.delete("/:id", deleteOneEvent);

module.exports = eventRouter;
