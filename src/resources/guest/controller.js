const { guest } = require("../../utils/database");
const { errorHandler } = require("../designer/controller");

async function getAllGuest(req, res) {
  try {
    const allGuests = await guest.findMany({
      include: {
        events: true,
      },
    });
    res.json(allGuests);
  } catch (e) {
    errorHandler(e, res);
  }
}

module.exports = { getAllGuest };
