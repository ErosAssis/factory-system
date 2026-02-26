const Product = require("../models/Product");
const RawMaterial = require("../models/RawMaterial");
const ProductMaterial = require("../models/ProductMaterial");
const sequelize = require("../database");

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
  const { force } = req.query;

  const transaction = await sequelize.transaction();

  try {

    const links = await ProductMaterial.findAll({
      where: { ProductId: id },
      transaction
    });

    // tem vínculo e não confirmou
    if (links.length > 0 && force !== "true") {
      await transaction.rollback();

      return res.status(409).json({
        error: "Produto possui matérias-primas vinculadas",
        needConfirm: true
      });
    }

    // devolve estoque
    for (const pm of links) {
      const material = await RawMaterial.findByPk(pm.RawMaterialId, { transaction });

      if (material) {
        material.stock += pm.quantity;
        await material.save({ transaction });
      }
    }

    await ProductMaterial.destroy({ where: { ProductId: id }, transaction });
    await Product.destroy({ where: { id }, transaction });

    await transaction.commit();

    return res.json({ ok: true });

  } catch (e) {
    await transaction.rollback();
    console.error(e);
    return res.status(500).json({ error: "Erro ao remover produto" });
  }
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