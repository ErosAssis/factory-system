const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const RawMaterial = sequelize.define("RawMaterial", {
    name: DataTypes.STRING,
    stock: DataTypes.FLOAT,
});

module.exports = RawMaterial;