const { model } = require("../../utils/database");
const {
  errorHandler,
  itemChecker,
  objectAllKeyMatchChecker,
  objectKeyMatchRequirementChecker,
  createToDbReturnNewItem,
  updateToDbReturnUpdatedItem,
} = require("../../utils/helperFunction");

async function getAllModels(req, res) {
  try {
    const allModels = await model.findMany({ include: { outfits: true } });
    res.json(allModels);
  } catch (e) {
    errorHandler(e, res);
  }
}

module.exports = { getAllModels };
