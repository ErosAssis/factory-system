const express = require("express");
const cors = require("cors");
const sequelize = require("./src/database");

require("./src/models/Product");
require("./src/models/RawMaterial");
require("./src/models/ProductMaterial");
require("./src/models/associations");

const productRoutes = require("./src/routes/productRoutes");
const rawRoutes = require("./src/routes/rawMaterialRoutes");
const pmRoutes = require("./src/routes/productMaterialRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/product-materials", pmRoutes);
app.use("/products", productRoutes);
app.use("/materials", rawRoutes);

sequelize.sync();

module.exports = app;