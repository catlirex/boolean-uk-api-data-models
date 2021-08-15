const { purchase, outfit } = require("../../utils/database");
const {
  errorHandler,
  itemChecker,
  objectAllKeyMatchChecker,
  objectKeyMatchRequirementChecker,
  createToDbReturnNewItem,
  updateToDbReturnUpdatedItem,
  deleteToDbReturnDeleteItem,
  selectOneInclude,
} = require("../../utils/helperFunction");

const purchaseRequirements = ["quantity", "outfit_id", "guest_id"];

async function getAllPurchase(req, res) {
  try {
    const allPurchase = await purchase.findMany();
    res.json(allPurchase);
  } catch (e) {
    errorHandler(e, res);
  }
}

async function postOnePurchase(req, res) {
  const newPurchase = req.body;
  const validPurchase = objectAllKeyMatchChecker(
    newPurchase,
    purchaseRequirements
  );
  if (!validPurchase)
    return res.status(400).json({ ERROR: "Purchase info invalid" });

  try {
    const data = await composePurchaseData(newPurchase);
    const createdPurchase = await createToDbReturnNewItem(data, purchase);
    res.json(createdPurchase);
  } catch (e) {
    errorHandler(e, res);
  }
}

async function composePurchaseData(toPurchaseData) {
  const { outfit_id, guest_id, ...purchaseData } = toPurchaseData;
  const data = { ...purchaseData };

  if (outfit_id) {
    const outfitData = await selectOneInclude({ id: outfit_id }, outfit);
    const outfitPrice = outfitData.price;
    data.outfit = { connect: { id: outfit_id } };
    data.price = outfitPrice;
  }

  if (guest_id) data.guest = { connect: { id: guest_id } };

  return data;
}

async function deleteOnePurchase(req, res) {
  const id = Number(req.params.id);
  try {
    const deletedPurchase = await deleteToDbReturnDeleteItem(id, purchase);
    res.json(deletedPurchase);
  } catch (e) {
    errorHandler(e, res);
  }
}

module.exports = { getAllPurchase, postOnePurchase, deleteOnePurchase };
