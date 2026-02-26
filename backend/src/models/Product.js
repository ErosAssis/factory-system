const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    value: DataTypes.FLOAT,
});

module.exports = Product;