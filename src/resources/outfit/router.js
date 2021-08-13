const outfitRouter = require("express").Router();

const { outfit } = require("../../utils/database");
const {
  getAllOutfits,
  postOneOutfit,
  patchOneOutfit,
  deleteOneOutfit,
} = require("./controller");

outfitRouter.get("/", getAllOutfits);
outfitRouter.post("/", postOneOutfit);
outfitRouter.patch("/:id", patchOneOutfit);
outfitRouter.delete("/:id", deleteOneOutfit);

module.exports = outfitRouter;
