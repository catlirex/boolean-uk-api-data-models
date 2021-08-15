function errorHandler(error, res) {
  console.log(error.message);
  if (error.message.includes(` No 'Guest' record(s)`))
    return res.status(400).json({
      ERROR: "Guest not found",
    });

  if (error.message.includes(`Cannot read property 'price' of null`))
    return res.status(400).json({
      ERROR: "Purchase Outfit not found",
    });

  if (error.message.includes(`No 'Event' record(s) `))
    return res.status(400).json({
      ERROR: " Event not found",
    });
  if (error.message.includes(`No 'Model' record(s) `))
    return res.status(400).json({
      ERROR: "Assigned Model does not exist, cannot create record",
    });
  if (
    error.message.includes(`prisma.guest.create()`) &&
    error.message.includes(`email`)
  )
    return res.status(400).json({
      ERROR: "Email exist, cannot create new guest",
    });
  if (error.message.includes(".delete()` invocation"))
    return res.status(400).json({
      ERROR:
        "Item cannot delete, data structure not support. You can process turnHistory to close this entry(IN NEXT VERSION)",
    });

  if (error.message.includes("Foreign key constraint failed"))
    return res.status(400).json({
      ERROR: "Please check IDs input.",
    });

  if (error.message === "Cannot read property 'delete' of undefined")
    return res.status(400).json({ ERROR: "Delete target not found" });

  if (error.message.includes("invalid value"))
    return res.status(400).json({ ERROR: "Invalid value type found" });

  res
    .status(500)
    .json({ ERROR: "Internal server error please try again later" });
}

async function itemChecker(id, dbClient) {
  try {
    const toUpdateItem = await dbClient.findUnique({
      where: {
        id,
      },
    });
    if (toUpdateItem) return true;
    if (!toUpdateItem) return false;
  } catch (e) {
    throw e;
  }
}

function objectAllKeyMatchChecker(object, requirementKeysArray) {
  let lengthMatch = false;

  const hasAllKeys = requirementKeysArray.every((item) =>
    object.hasOwnProperty(item)
  );

  Object.keys(object).length === requirementKeysArray.length
    ? (lengthMatch = true)
    : (lengthMatch = false);

  if (hasAllKeys && lengthMatch) return true;
  else return false;
}

function objectKeyMatchRequirementChecker(object, requirementKeysArray) {
  if (!Object.keys(object).length) return true;
  for (const key of Object.keys(object)) {
    const keyChecker = requirementKeysArray.includes(key);
    if (!keyChecker) return false;
  }
  return true;
}

async function createToDbReturnNewItem(newItemData, dbClient) {
  try {
    const result = await dbClient.create({
      data: newItemData,
    });

    return result;
  } catch (e) {
    throw e;
  }
}

async function updateToDbReturnUpdatedItem(id, toUpdateContent, dbClient) {
  try {
    const updatedItem = await dbClient.update({
      where: {
        id,
      },
      data: toUpdateContent,
    });

    return updatedItem;
  } catch (e) {
    throw e;
  }
}

async function deleteToDbReturnDeleteItem(id, dbClient) {
  try {
    const deletedItem = await dbClient.delete({
      where: { id },
    });
    return deletedItem;
  } catch (e) {
    throw e;
  }
}

async function selectOneInclude(filterContent, dbClient, includeContent) {
  try {
    const item = await dbClient.findUnique({
      where: filterContent,
      include: includeContent,
    });
    return item;
  } catch (e) {
    throw e;
  }
}

function typeChecker(value, expectedType) {
  if (typeof value === expectedType) return true;
  else return false;
}

module.exports = {
  errorHandler,
  itemChecker,
  objectAllKeyMatchChecker,
  objectKeyMatchRequirementChecker,
  createToDbReturnNewItem,
  updateToDbReturnUpdatedItem,
  deleteToDbReturnDeleteItem,
  selectOneInclude,
  typeChecker,
};
