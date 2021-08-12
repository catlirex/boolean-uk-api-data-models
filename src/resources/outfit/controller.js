const { outfit } = require("../../utils/database");
const {
  errorHandler,
  itemChecker,
  objectAllKeyMatchChecker,
  objectKeyMatchRequirementChecker,
  createToDbReturnNewItem,
  updateToDbReturnUpdatedItem,
} = require("../../utils/helperFunction");

async function getAllOutfits(req, res) {
  try {
    const allOutfits = await outfit.findMany();
    res.json(allOutfits);
  } catch (e) {
    errorHandler(e, res);
  }
}

module.exports = { getAllOutfits };
