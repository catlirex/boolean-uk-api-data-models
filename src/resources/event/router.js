const eventRouter = require("express").Router();

const { getAllEvents } = require("./controller");

eventRouter.get("/", getAllEvents);

module.exports = eventRouter;
