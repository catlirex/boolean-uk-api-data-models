const purchaseRouter = require("express").Router();

const { getAllPurchase } = require("./controller");

purchaseRouter.get("/", getAllPurchase);

module.exports = purchaseRouter;
