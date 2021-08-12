const { event } = require("../../utils/database");
const { errorHandler } = require("../designer/controller");

async function getAllEvents(req, res) {
  try {
    const allEvents = await event.findMany({ include: { outfits: true } });
    res.json(allEvents);
  } catch (e) {
    errorHandler(e, res);
  }
}

module.exports = { getAllEvents };
