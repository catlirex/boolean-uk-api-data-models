const { designer } = require("../../utils/database");

function errorHandler(error, res) {
  console.log(error.message);

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

async function getAllDesigners(req, res) {
  try {
    const allDesigners = await designer.findMany();
    res.json(allDesigners);
  } catch (e) {
    errorHandler(e, res);
  }
}

module.exports = { getAllDesigners, errorHandler };
