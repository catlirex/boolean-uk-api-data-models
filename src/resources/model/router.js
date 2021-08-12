const modelRouter = require("express").Router();

const { getAllModels } = require("./controller");

modelRouter.get("/", getAllModels);

module.exports = modelRouter;
