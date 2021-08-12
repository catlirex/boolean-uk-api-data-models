const express = require("express");
const logger = require("morgan");

const designerRouter = require("./src/resources/designer/router");
const outfitRouter = require("./src/resources/outfit/router");
const modelRouter = require("./src/resources/model/router");
const eventRouter = require("./src/resources/event/router");
const guestRouter = require("./src/resources/guest/router");

const app = express();
app.use(logger("dev"));
app.use(express.json());

app.use("/designers", designerRouter);
app.use("/outfits", outfitRouter);
app.use("/models", modelRouter);
app.use("/events", eventRouter);
app.use("/guests", guestRouter);

app.all("/", (req, res) => {
  res.json({ ok: "true" });
});

module.exports = app;
