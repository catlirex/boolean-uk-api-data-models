const purchaseRouter = require("express").Router();

const {
  getAllPurchase,
  postOnePurchase,
  deleteOnePurchase,
} = require("./controller");

purchaseRouter.get("/", getAllPurchase);
purchaseRouter.post("/", postOnePurchase);
purchaseRouter.delete("/:id", deleteOnePurchase);

module.exports = purchaseRouter;
