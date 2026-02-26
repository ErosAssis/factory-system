const RawMaterial = require("../models/RawMaterial");

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
    await RawMaterial.destroy({ where: { id } });
    res.json({ ok: true });
};