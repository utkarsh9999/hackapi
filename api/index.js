const express = require("express");
const cors = require("cors");
require("dotenv").config();

const uploadRoutes = require("../routes/upload.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

module.exports = app;
