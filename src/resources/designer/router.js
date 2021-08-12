const designerRouter = require("express").Router();

const { getAllDesigners } = require("./controller");

designerRouter.get("/", getAllDesigners);

module.exports = designerRouter;
