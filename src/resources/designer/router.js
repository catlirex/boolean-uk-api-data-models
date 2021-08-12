const designerRouter = require("express").Router();

const {
  getAllDesigners,
  postOneDesigner,
  patchOneDesigner,
  deleteOneDesigner,
} = require("./controller");

designerRouter.get("/", getAllDesigners);
designerRouter.post("/", postOneDesigner);
designerRouter.patch("/:id", patchOneDesigner);
designerRouter.delete("/:id", deleteOneDesigner);

module.exports = designerRouter;
