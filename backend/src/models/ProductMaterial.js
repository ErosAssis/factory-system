const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const ProductMaterial = sequelize.define("ProductMaterial", {
    quantity: DataTypes.FLOAT
});

module.exports = ProductMaterial;