const outfitRouter = require("express").Router();

const { getAllOutfits } = require("./controller");

outfitRouter.get("/", getAllOutfits);

module.exports = outfitRouter;
