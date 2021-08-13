const { outfit } = require("../../utils/database");
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

const outFitRequirements = ["name", "price", "season", "designer_id"];

async function getAllOutfits(req, res) {
  try {
    const allOutfits = await outfit.findMany();
    res.json(allOutfits);
  } catch (e) {
    errorHandler(e, res);
  }
}

async function postOneOutfit(req, res) {
  const newOutfit = req.body;
  const validOutfit = newOutfitChecker(newOutfit);
  if (!validOutfit)
    return res.status(400).json({ ERROR: "Outfit info invalid" });

  const data = composeOutfitData(newOutfit);
  try {
    const createdOutfit = await createToDbReturnNewItem(data, outfit);
    res.json(createdOutfit);
  } catch (e) {
    errorHandler(e, res);
  }
}

function newOutfitChecker(newOutfit) {
  const checkResults = [];
  const { model_id, event_id, ...outfitInfo } = newOutfit;

  const hasAllKeys = objectAllKeyMatchChecker(outfitInfo, outFitRequirements);
  checkResults.push(hasAllKeys);
  Object.keys(outfitInfo).length === outFitRequirements.length
    ? checkResults.push(true)
    : checkResults.push(false);

  if (model_id) checkResults.push(typeChecker(model_id, "number"));
  if (event_id) checkResults.push(typeChecker(event_id, "number"));
  if (outfitInfo.price)
    checkResults.push(typeChecker(outfitInfo.price, "number"));
  if (outfitInfo.designer_id)
    checkResults.push(typeChecker(outfitInfo.designer_id, "number"));
  console.log(checkResults);
  if (checkResults.find((target) => target === false) === false) return false;
  else return true;
}

function composeOutfitData(newOutfit) {
  const { model_id, event_id, designer_id, ...outfitInfo } = newOutfit;
  let data = { ...outfitInfo };
  if (designer_id) data.designer = { connect: { id: designer_id } };
  if (model_id) data.model = { connect: { id: model_id } };
  if (event_id) data.event = { connect: { id: event_id } };

  return data;
}

async function patchOneOutfit(req, res) {
  const id = Number(req.params.id);
  const toUpdateContent = req.body;

  try {
    const itemExist = await itemChecker(id, outfit);
    if (!itemExist)
      return res.status(400).json({ ERROR: `OUTFIT NOT FOUND id:${id}` });

    const contentValid = updateOutfitChecker(toUpdateContent);
    if (!contentValid)
      return res.status(400).json({ ERROR: `Update info incorrect` });

    const data = composeOutfitData(toUpdateContent);
    const updatedOutfit = await updateToDbReturnUpdatedItem(id, data, outfit);
    res.json(updatedOutfit);
  } catch (e) {
    errorHandler(e, res);
  }
}

function updateOutfitChecker(toUpdateContent) {
  const checkResults = [];
  const { model_id, event_id, ...outfitInfo } = toUpdateContent;

  const basicCheck = objectKeyMatchRequirementChecker(
    outfitInfo,
    outFitRequirements
  );
  checkResults.push(basicCheck);

  if (model_id) checkResults.push(typeChecker(model_id, "number"));
  if (event_id) checkResults.push(typeChecker(event_id, "number"));
  if (outfitInfo.price)
    checkResults.push(typeChecker(outfitInfo.price, "number"));
  if (outfitInfo.designer_id)
    checkResults.push(typeChecker(outfitInfo.designer_id, "number"));

  console.log(checkResults);
  if (checkResults.find((target) => target === false) === false) return false;
  else return true;
}

async function deleteOneOutfit(req, res) {
  const id = Number(req.params.id);
  try {
    const deletedOutfit = await deleteToDbReturnDeleteItem(id, outfit);
    res.json(deletedOutfit);
  } catch (e) {
    errorHandler(e, res);
  }
}

module.exports = {
  getAllOutfits,
  postOneOutfit,
  patchOneOutfit,
  deleteOneOutfit,
};
