import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductMaterial({ onSaved, reload }) {

    const [products, setProducts] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [links, setLinks] = useState([]);

    const [productId, setProductId] = useState("");
    const [materialId, setMaterialId] = useState("");
    const [quantity, setQuantity] = useState("");

    const load = async () => {
        const p = await axios.get("http://localhost:3000/products");
        const m = await axios.get("http://localhost:3000/materials");
        const l = await axios.get("http://localhost:3000/product-materials");

        setProducts(p.data);
        setMaterials(m.data);
        setLinks(l.data);
    };

    useEffect(() => {
        console.log("reloadmudou", reload);
        load();
    }, [reload]);


    const save = async () => {

        if (!productId || !materialId || !quantity) {
            alert("Fill all fields");
            return;
        }

        try {

            await axios.post("http://localhost:3000/product-materials", {
                productId: Number(productId),
                materialId: Number(materialId),
                quantity: Number(quantity)
            });

            setQuantity("");
            setProductId("");
            setMaterialId("");

            await load();
            onSaved?.();

        } catch (error) {

            const msg = error.response?.data?.error || "Cannot link material";
            alert(msg);
        }
    };


    const remove = async id => {
        await axios.delete("http://localhost:3000/product-materials/" + id);
        load();
        onSaved?.();
    };

    return (
        <div className="card">
            <h2>Link product and material</h2>

            <select value={productId} onChange={e => setProductId(e.target.value)}>
                <option value="">Select product</option>
                {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                ))}
            </select>

            <select value={materialId} onChange={e => setMaterialId(e.target.value)}>
                <option value="">Select material</option>
                {materials.map(m => (
                    <option key={m.id} value={m.id}>{m.name} (stock: {m.stock})</option>
                ))}
            </select>

            <input
                placeholder="quantity of material for production"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
            />

            <button
                onClick={save}
                disabled={!productId || !materialId || !quantity}
            >
                Save
            </button>

            { }
            <div style={{ marginTop: 15 }}>
                <div className="pm-header">
                    <div className="pm-col">Product</div>
                    <div className="pm-col">Material</div>
                    <div className="pm-qty">Qty</div>
                    <div className="pm-actions"></div>
                </div>
                {links.map(link => {

                    const product = products.find(p => p.id === link.ProductId);
                    const material = materials.find(m => m.id === link.RawMaterialId);

                    return (
                        <div key={link.id} className="list-item">
                            <div className="pm-row">
                                <div className="pm-col">
                                    {product?.name || "Unknown Product"}
                                </div>

                                <div className="pm-col">
                                    {material?.name || "Unknown Material"}
                                </div>

                                <div className="pm-qty">
                                    Qty: {link.quantity}
                                </div>

                                <div className="pm-actions">
                                    <button
                                        className="btn btn-delete"
                                        onClick={() => remove(link.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}