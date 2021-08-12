const { outfit } = require("../../utils/database");
const { errorHandler } = require("../designer/controller");

async function getAllOutfits(req, res) {
  try {
    const allOutfits = await outfit.findMany();
    res.json(allOutfits);
  } catch (e) {
    errorHandler(e, res);
  }
}

module.exports = { getAllOutfits };
