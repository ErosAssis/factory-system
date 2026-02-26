import axios from "axios";
import { useEffect, useState } from "react";

export default function RawMaterials({ onSaved }) {

    const [name, setName] = useState("");
    const [stock, setStock] = useState("");
    const [list, setList] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const load = async () => {
        const r = await axios.get("http://localhost:3000/materials");
        setList(r.data);
    };

    useEffect(() => {
        load();
    }, []);


    const save = async () => {

        const payload = {
            name,
            stock: Number(stock)
        };

        if (editingId) {
            await axios.put(`http://localhost:3000/materials/${editingId}`, payload);
            setEditingId(null);
        } else {
            await axios.post("http://localhost:3000/materials", payload);
        }

        setName("");
        setStock("");
        await load();
        onSaved?.();
    };


    const edit = m => {
        setName(m.name);
        setStock(m.stock);
        setEditingId(m.id);
    };


    const remove = async id => {

        try {

            await axios.delete("http://localhost:3000/materials/" + id);

            await load();
            onSaved?.();

        } catch (err) {

            if (err.response?.status === 409 && err.response.data.needConfirm) {

                const ok = window.confirm(
                    "Essa matéria-prima está vinculada a um produto. Deseja excluir mesmo assim?"
                );

                if (!ok) return;

                await axios.delete("http://localhost:3000/materials/" + id + "?force=true");

                await load();
                onSaved?.();
            }
        }
    };

    return (
        <div className="card">
            <h2>Raw Materials</h2>

            <input
                placeholder="name"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <input
                placeholder="stock quantity"
                value={stock}
                onChange={e => setStock(e.target.value)}
            />

            <button onClick={save}>
                {editingId ? "Update" : "Save"}
            </button>

            <div style={{ marginTop: 15 }}>
                <div className="pm-header">
                    <div className="pm-col">Name</div>
                    <div className="pm-col" style={{ textAlign: "center" }}>Stock</div>
                    <div className="pm-actions"></div>
                </div>
                {list.map(m => (
                    <div key={m.id} className="list-item">
                        <div className="pm-row">

                            <div className="pm-col">
                                {m.name}
                            </div>

                            <div className="pm-col" style={{ textAlign: "center" }}>
                                {m.stock}
                            </div>

                            <div className="pm-actions">
                                <button className="btn btn-edit" onClick={() => edit(m)}>Edit</button>
                                <button className="btn btn-delete" onClick={() => remove(m.id)}>Delete</button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}