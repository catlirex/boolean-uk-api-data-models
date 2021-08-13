const modelRouter = require("express").Router();

const {
  getAllModels,
  postOneModel,
  patchOneModel,
  deleteOneModel,
} = require("./controller");

modelRouter.get("/", getAllModels);
modelRouter.post("/", postOneModel);
modelRouter.patch("/:id", patchOneModel);
modelRouter.delete("/:id", deleteOneModel);

module.exports = modelRouter;
