const modelRouter = require("express").Router();

const {
  getAllModels,
  postOneModel,
  patchOneModel,
  deleteOneModel,
  getModelOutfitList,
} = require("./controller");

modelRouter.get("/:id/outfits", getModelOutfitList);
modelRouter.get("/", getAllModels);
modelRouter.post("/", postOneModel);
modelRouter.patch("/:id", patchOneModel);
modelRouter.delete("/:id", deleteOneModel);

module.exports = modelRouter;
