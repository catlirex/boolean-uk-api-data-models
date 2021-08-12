const { event } = require("../../utils/database");
const {
  errorHandler,
  itemChecker,
  objectAllKeyMatchChecker,
  objectKeyMatchRequirementChecker,
  createToDbReturnNewItem,
  updateToDbReturnUpdatedItem,
  deleteToDbReturnDeleteItem,
} = require("../../utils/helperFunction");

const eventRequirements = ["date", "address", "name"];

async function getAllEvents(req, res) {
  try {
    const allEvents = await event.findMany({
      include: {
        outfits: true,
        guests: true,
      },
    });
    res.json(allEvents);
  } catch (e) {
    errorHandler(e, res);
  }
}

async function postOneEvent(req, res) {
  const newEvent = req.body;
  const validEvent = objectAllKeyMatchChecker(newEvent, eventRequirements);

  if (!validEvent) return res.status(400).json({ ERROR: "Event info invalid" });

  try {
    const createdEvent = await createToDbReturnNewItem(newEvent, event);
    res.json(createdEvent);
  } catch (e) {
    errorHandler(e, res);
  }
}

async function patchOneEvent(req, res) {
  const id = Number(req.params.id);
  const toUpdateContent = req.body;
  try {
    const itemExist = await itemChecker(id, event);
    if (!itemExist)
      return res.status(400).json({ ERROR: `EVENT NOT FOUND id:${id}` });

    const contentValid = objectKeyMatchRequirementChecker(
      toUpdateContent,
      eventRequirements
    );
    if (!contentValid)
      return res.status(400).json({ ERROR: `Update info incorrect` });

    const updatedEvent = await updateToDbReturnUpdatedItem(
      id,
      toUpdateContent,
      event
    );
    res.json(updatedEvent);
  } catch (e) {
    errorHandler(e, res);
  }
}

async function deleteOneEvent(req, res) {
  const id = Number(req.params.id);
  try {
    const deletedDesigner = await deleteToDbReturnDeleteItem(id, event);
    res.json(deletedDesigner);
  } catch (e) {
    errorHandler(e, res);
  }
}

module.exports = { getAllEvents, postOneEvent, patchOneEvent, deleteOneEvent };
