const { guest } = require("../../utils/database");
const {
  errorHandler,
  itemChecker,
  objectAllKeyMatchChecker,
  objectKeyMatchRequirementChecker,
  createToDbReturnNewItem,
  deleteToDbReturnDeleteItem,
  updateToDbReturnUpdatedItem,
  selectOneInclude,
} = require("../../utils/helperFunction");

const guestRequirements = ["name", "email"];

async function getAllGuest(req, res) {
  try {
    const allGuests = await guest.findMany({
      include: {
        events: true,
        purchase: true,
      },
    });
    res.json(allGuests);
  } catch (e) {
    errorHandler(e, res);
  }
}

async function postOneGuest(req, res) {
  const { event_id, ...newData } = req.body;
  const validGuest = objectAllKeyMatchChecker(newData, guestRequirements);
  let createdItem = null;
  if (!validGuest) return res.status(400).json({ ERROR: "Guest info invalid" });
  try {
    if (event_id) {
      const data = {
        ...newData,
        events: { connect: { id: event_id } },
      };
      createdItem = await createToDbReturnNewItem(data, guest);
    } else {
      createdItem = await createToDbReturnNewItem(newData, guest);
    }
    const newGuestWithEvent = await selectOneInclude(
      { id: createdItem.id },
      guest,
      { events: true }
    );

    res.json(newGuestWithEvent);
  } catch (e) {
    errorHandler(e, res);
  }
}

async function patchOneGuest(req, res) {
  const id = Number(req.params.id);
  const toUpdateContent = req.body;
  try {
    const itemExist = await itemChecker(id, guest);
    if (!itemExist)
      return res.status(400).json({ ERROR: `GUEST NOT FOUND id:${id}` });

    const contentValid = objectKeyMatchRequirementChecker(
      toUpdateContent,
      guestRequirements
    );
    if (!contentValid)
      return res.status(400).json({ ERROR: `Update info incorrect` });

    const updatedGuest = await updateToDbReturnUpdatedItem(
      id,
      toUpdateContent,
      guest
    );
    res.json(updatedGuest);
  } catch (e) {
    errorHandler(e, res);
  }
}

async function deleteOneGuest(req, res) {
  const id = Number(req.params.id);
  try {
    const deletedGuest = await deleteToDbReturnDeleteItem(id, guest);
    res.json(deletedGuest);
  } catch (e) {
    errorHandler(e, res);
  }
}

module.exports = { getAllGuest, postOneGuest, patchOneGuest, deleteOneGuest };
