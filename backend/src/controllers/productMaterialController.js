const ProductMaterial = require("../models/ProductMaterial");
const RawMaterial = require("../models/RawMaterial");

exports.create = async (req, res) => {
    try {

        const { productId, materialId, quantity } = req.body;

        if (!productId || !materialId || !quantity) {
            return res.status(400).json({
                error: "Todos os campos são obrigatórios"
            });
        }

        const material = await RawMaterial.findByPk(materialId);

        if (!material) {
            return res.status(400).json({
                error: "Matéria-prima não encontrada"
            });
        }

        if (quantity > material.stock) {
            return res.status(400).json({
                error: "Estoque insuficiente"
            });
        }

        const pm = await ProductMaterial.create({
            ProductId: productId,
            RawMaterialId: materialId,
            quantity
        });

        material.stock -= quantity;
        await material.save();

        return res.status(201).json(pm);

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            error: "Erro interno"
        });
    }
};

exports.remove = async (req, res) => {
    try {
        const pm = await ProductMaterial.findByPk(req.params.id);

        if (!pm) {
            return res.status(404).json({ error: "Item não encontrado" });
        }

        // Recupera o material relacionado
        const material = await RawMaterial.findByPk(pm.RawMaterialId);
        if (!material) {
            return res.status(404).json({ error: "Matéria-prima não encontrada" });
        }

        // Devolve a quantidade ao estoque
        material.stock += pm.quantity;
        await material.save();

        // Remove o registro
        await pm.destroy();

        return res.json({ ok: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno" });
    }
};

exports.list = async (req, res) => {
    res.json(await ProductMaterial.findAll());
};