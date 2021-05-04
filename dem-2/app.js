const express = require("express");
const productsRoutes = require("./routes/productsRoutes.js");
const ordersRoutes = require("./routes/orderRoutes.js");
const notFoundRoutes = require("./routes/notFoundRoutes.js")
const additionalRoutes = require("./routes/additionalRoutes");

const bodyParser = require("body-parser");
const morgan = require("morgan");


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));

app.use("/products", productsRoutes);
app.use("/order", ordersRoutes);
app.use("/", additionalRoutes)
app.use("*", notFoundRoutes);

app.listen(5500, () => {
    console.log("server has been started on port 5500");
});