const eventRouter = require("express").Router();

const {
  getAllEvents,
  postOneEvent,
  patchOneEvent,
  deleteOneEvent,
} = require("./controller");

eventRouter.get("/", getAllEvents);
eventRouter.post("/", postOneEvent);
eventRouter.patch("/:id", patchOneEvent);
eventRouter.delete("/:id", deleteOneEvent);

module.exports = eventRouter;
