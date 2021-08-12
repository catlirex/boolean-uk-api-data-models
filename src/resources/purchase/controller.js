const { purchase } = require("../../utils/database");
const {
  errorHandler,
  itemChecker,
  objectAllKeyMatchChecker,
  objectKeyMatchRequirementChecker,
  createToDbReturnNewItem,
  updateToDbReturnUpdatedItem,
} = require("../../utils/helperFunction");

async function getAllPurchase(req, res) {
  try {
    const allPurchase = await purchase.findMany();
    res.json(allPurchase);
  } catch (e) {
    errorHandler(e, res);
  }
}

module.exports = { getAllPurchase };
