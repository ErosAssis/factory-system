const RawMaterial = require("../models/RawMaterial");
const ProductMaterial = require("../models/ProductMaterial");
const sequelize = require("../database");


exports.create = async (req, res) => {
    res.json(await RawMaterial.create(req.body));
};

exports.list = async (req, res) => {
    res.json(await RawMaterial.findAll());
};

exports.update = async (req, res) => {
    const { id } = req.params;
    await RawMaterial.update(req.body, { where: { id } });
    res.json({ ok: true });
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const { force } = req.query; // <- confirmação

  const transaction = await sequelize.transaction();

  try {

    const links = await ProductMaterial.findAll({
      where: { RawMaterialId: id },
      transaction
    });

    // TEM VÍNCULO E NÃO CONFIRMOU
    if (links.length > 0 && force !== "true") {
      await transaction.rollback();

      return res.status(409).json({
        error: "Matéria-prima está vinculada a produto",
        needConfirm: true
      });
    }

    // CASCADE
    if (links.length > 0) {
      await ProductMaterial.destroy({
        where: { RawMaterialId: id },
        transaction
      });
    }

    await RawMaterial.destroy({ where: { id }, transaction });

    await transaction.commit();

    return res.json({ ok: true });

  } catch (e) {
    await transaction.rollback();
    console.error(e);
    return res.status(500).json({ error: "Erro ao remover matéria-prima" });
  }
};