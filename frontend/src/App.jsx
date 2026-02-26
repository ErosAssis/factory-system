import { useState } from "react";
import Products from "./Products";
import RawMaterials from "./RawMaterials";
import ProductMaterial from "./ProductMaterial";
import Production from "./Production";

export default function App() {

    const [reload, setReload] = useState(0);
    const [page, setPage] = useState("dashboard");

    const notifySaved = () => setReload(r => r + 1);

    const renderPage = () => {
        if (page === "products") return <Products onSaved={notifySaved} />;
        if (page === "materials") return <RawMaterials onSaved={notifySaved} />;
        if (page === "links") return <ProductMaterial reload={reload} onSaved={notifySaved} />;
        if (page === "production") return <Production reload={reload} />;

        return (
            <div className="card">
                <h2>Dashboard</h2>
                <p>Welcome to Factory Manager ERP</p>
            </div>
        );
    };

    return (
        <div className="layout">

            {/* SIDEBAR */}
            <aside className="sidebar">
                <h1>Factory</h1>

                <button onClick={() => setPage("dashboard")}>Dashboard</button>
                <button onClick={() => setPage("products")}>Products</button>
                <button onClick={() => setPage("materials")}>Materials</button>
                <button onClick={() => setPage("links")}>Product Links</button>
                <button onClick={() => setPage("production")}>Production</button>
            </aside>

            {/* CONTENT */}
            <main className="content">
                {renderPage()}
            </main>

        </div>
    );
}