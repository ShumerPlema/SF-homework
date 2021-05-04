const express = require("express");
const notFoundRoutes = express.Router();
const { notFoundPage } = require("../controllers/notFound/notFoundControllers.js")

notFoundRoutes.get("/", notFoundPage)

module.exports = notFoundRoutes;