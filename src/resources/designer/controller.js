const { designer, outfit } = require("../../utils/database");

const {
  errorHandler,
  itemChecker,
  objectAllKeyMatchChecker,
  objectKeyMatchRequirementChecker,
  createToDbReturnNewItem,
  updateToDbReturnUpdatedItem,
  deleteToDbReturnDeleteItem,
} = require("../../utils/helperFunction");

const designerRequirements = ["name", "bio"];

async function getAllDesigners(req, res) {
  try {
    const allDesigners = await designer.findMany({
      include: { outfits: true },
    });
    res.json(allDesigners);
  } catch (e) {
    errorHandler(e, res);
  }
}

async function postOneDesigner(req, res) {
  const newDesigner = req.body;
  const validDesigner = objectAllKeyMatchChecker(
    newDesigner,
    designerRequirements
  );
  if (!validDesigner)
    return res.status(400).json({ ERROR: "Designer info invalid" });

  try {
    const createdDesigner = await createToDbReturnNewItem(
      newDesigner,
      designer
    );
    res.json(createdDesigner);
  } catch (e) {
    errorHandler(e, res);
  }
}

async function patchOneDesigner(req, res) {
  const id = Number(req.params.id);
  const toUpdateContent = req.body;
  try {
    const itemExist = await itemChecker(id, designer);
    if (!itemExist)
      return res.status(400).json({ ERROR: `DESIGNER NOT FOUND id:${id}` });

    const contentValid = objectKeyMatchRequirementChecker(
      toUpdateContent,
      designerRequirements
    );
    if (!contentValid)
      return res.status(400).json({ ERROR: `Update info incorrect` });

    const updatedDesigner = await updateToDbReturnUpdatedItem(
      id,
      toUpdateContent,
      designer
    );
    res.json(updatedDesigner);
  } catch (e) {
    errorHandler(e, res);
  }
}

async function deleteOneDesigner(req, res) {
  const id = Number(req.params.id);
  try {
    const deletedDesigner = await deleteToDbReturnDeleteItem(id, designer);
    res.json(deletedDesigner);
  } catch (e) {
    errorHandler(e, res);
  }
}

module.exports = {
  getAllDesigners,
  postOneDesigner,
  patchOneDesigner,
  deleteOneDesigner,
};
