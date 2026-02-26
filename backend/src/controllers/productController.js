const Product = require("../models/Product");
const RawMaterial = require("../models/RawMaterial");
const ProductMaterial = require("../models/ProductMaterial");

exports.create = async (req, res) => {
  const p = await Product.create(req.body);
  res.status(201).json(p);
};

exports.list = async (req, res) => {
  res.json(await Product.findAll());
};

exports.update = async (req, res) => {
  const { id } = req.params;
  await Product.update(req.body, { where: { id } });
  const updated = await Product.findByPk(id);
  res.json(updated);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await Product.destroy({ where: { id } });
  res.status(204).send();
};

exports.production = async (req, res) => {

  const products = await Product.findAll({
    include: {
      model: ProductMaterial,
      include: [RawMaterial]
    }
  });

  const result = [];

  products.sort((a, b) => b.value - a.value);

  for (const p of products) {

    if (!p.ProductMaterials.length) continue;

    let possible = Infinity;

    for (const pm of p.ProductMaterials) {

      const stock = pm.RawMaterial?.stock ?? 0;
      const need = pm.quantity;

      const units = Math.floor(stock / need);

      if (units < possible) possible = units;
    }

    if (possible > 0) {
      result.push({
        product: p.name,
        quantity: possible,
        total: (possible * p.value).toFixed(2)
      });
    }
  }

  res.json(result);
};