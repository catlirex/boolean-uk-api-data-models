const guestRouter = require("express").Router();

const {
  getAllGuest,
  postOneGuest,
  patchOneGuest,
  deleteOneGuest,
  getGuestPurchases,
} = require("./controller");

guestRouter.get("/:id/purchases", getGuestPurchases);
guestRouter.get("/", getAllGuest);
guestRouter.post("/", postOneGuest);
guestRouter.patch("/:id", patchOneGuest);
guestRouter.delete("/:id", deleteOneGuest);

module.exports = guestRouter;
