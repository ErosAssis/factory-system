import axios from "axios";
import { useEffect, useState } from "react";

export default function Products({ onSaved }) {

    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [list, setList] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const load = async () => {
        const r = await axios.get("http://localhost:3000/products");
        setList(r.data);
    };

    useEffect(() => {
        load();
    }, []);


    const save = async () => {

        const payload = {
            name,
            value: Number(String(value).replace(",", "."))
        };

        if (editingId) {
            await axios.put(`http://localhost:3000/products/${editingId}`, payload);
            setEditingId(null);
        } else {
            await axios.post("http://localhost:3000/products", payload);
        }

        setName("");
        setValue("");
        await load();
        onSaved?.();
    };


    const edit = p => {
        setName(p.name);
        setValue(String(p.value));
        setEditingId(p.id);
    };


    const remove = async id => {
        await axios.delete("http://localhost:3000/products/" + id);
        load();
        onSaved?.();
    };

    return (
        <div className="card">
            <h2>Products</h2>

            <input
                placeholder="name"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <input
                placeholder="value (ex: 10.50)"
                value={value}
                onChange={e => setValue(e.target.value)}
            />

            <button onClick={save}>
                {editingId ? "Update" : "Save"}
            </button>

            <div style={{ marginTop: 15 }}>
                <div className="pm-header">
                    <div className="pm-col">Name</div>
                    <div className="pm-col" style={{ textAlign: "center" }}>Value</div>
                    <div className="pm-actions"></div>
                </div>
                {list.map(p => (
                    <div key={p.id} className="list-item">
                        <div className="pm-row">

                            <div className="pm-col">
                                {p.name}
                            </div>

                            <div className="pm-col" style={{ textAlign: "center" }}>
                                ${Number(p.value).toFixed(2)}
                            </div>

                            <div className="pm-actions">
                                <button className="btn btn-edit" onClick={() => edit(p)}>Edit</button>
                                <button className="btn btn-delete" onClick={() => remove(p.id)}>Delete</button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}