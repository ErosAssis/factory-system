import axios from "axios";
import { useEffect, useState } from "react";

export default function Production({ reload }) {
    const [data, setData] = useState([]);

    const load = () => {
        axios.get("http://localhost:3000/products/production")
            .then(r => setData(r.data));
    };

    useEffect(() => {
        load();
    }, [reload]);

    return (
        <div className="card">
            <h2>Production suggestion</h2>
            {data.map((p, i) => (
                <div key={i} className="list-item">
                    {p.product} → {p.quantity} units → ${p.total}
                </div>
            ))}
        </div>
    );
}