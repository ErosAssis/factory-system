const Product = require("./Product");
const RawMaterial = require("./RawMaterial");
const ProductMaterial = require("./ProductMaterial");

Product.hasMany(ProductMaterial, {
  foreignKey: "ProductId",
  onDelete: "CASCADE",
  hooks: true
});

ProductMaterial.belongsTo(Product, {
  foreignKey: "ProductId"
});

RawMaterial.hasMany(ProductMaterial, {
  foreignKey: "RawMaterialId",
  onDelete: "CASCADE",
  hooks: true
});

ProductMaterial.belongsTo(RawMaterial, {
  foreignKey: "RawMaterialId"
});