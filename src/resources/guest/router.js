const guestRouter = require("express").Router();

const {
  getAllGuest,
  postOneGuest,
  patchOneGuest,
  deleteOneGuest,
} = require("./controller");

guestRouter.get("/", getAllGuest);
guestRouter.post("/", postOneGuest);
guestRouter.patch("/:id", patchOneGuest);
guestRouter.delete("/:id", deleteOneGuest);

module.exports = guestRouter;
