const guestRouter = require("express").Router();

const { getAllGuest } = require("./controller");

guestRouter.get("/", getAllGuest);

module.exports = guestRouter;
