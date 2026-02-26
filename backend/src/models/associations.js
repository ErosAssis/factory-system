const Product = require("./Product");
const RawMaterial = require("./RawMaterial");
const ProductMaterial = require("./ProductMaterial");

Product.hasMany(ProductMaterial);
ProductMaterial.belongsTo(Product);

RawMaterial.hasMany(ProductMaterial);
ProductMaterial.belongsTo(RawMaterial);