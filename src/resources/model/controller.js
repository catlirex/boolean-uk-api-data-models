const { model } = require("../../utils/database");
const {
  errorHandler,
  itemChecker,
  objectAllKeyMatchChecker,
  objectKeyMatchRequirementChecker,
  createToDbReturnNewItem,
  updateToDbReturnUpdatedItem,
  deleteToDbReturnDeleteItem,
  typeChecker,
} = require("../../utils/helperFunction");

const modelRequirements = ["name", "age", "height"];

async function getAllModels(req, res) {
  try {
    const allModels = await model.findMany({ include: { outfits: true } });
    res.json(allModels);
  } catch (e) {
    errorHandler(e, res);
  }
}

async function postOneModel(req, res) {
  const newModel = req.body;
  const { age, height } = newModel;
  let validModel = false;

  objectAllKeyMatchChecker(newModel, modelRequirements) &&
  typeChecker(age, "number") &&
  typeChecker(height, "number")
    ? (validModel = true)
    : (validModel = false);

  if (!validModel) return res.status(400).json({ ERROR: "Model info invalid" });
  try {
    const createdModel = await createToDbReturnNewItem(newModel, model);
    res.json(createdModel);
  } catch (e) {
    errorHandler(e, res);
  }
}

async function patchOneModel(req, res) {
  const id = Number(req.params.id);
  const toUpdateContent = req.body;

  try {
    const itemExist = await itemChecker(id, model);
    if (!itemExist)
      return res.status(400).json({ ERROR: `MODEL NOT FOUND id:${id}` });

    let contentValid = objectKeyMatchRequirementChecker(
      toUpdateContent,
      modelRequirements
    );

    if (!contentValid)
      return res.status(400).json({ ERROR: `Update info incorrect` });

    const updatedModel = await updateToDbReturnUpdatedItem(
      id,
      toUpdateContent,
      model
    );
    res.json(updatedModel);
  } catch (e) {
    errorHandler(e, res);
  }
}

async function deleteOneModel(req, res) {
  const id = Number(req.params.id);
  try {
    const deletedModel = await deleteToDbReturnDeleteItem(id, model);
    res.json(deletedModel);
  } catch (e) {
    errorHandler(e, res);
  }
}

module.exports = { getAllModels, postOneModel, patchOneModel, deleteOneModel };
