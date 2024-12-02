import React from "react";
import useProductosDestacados from "../hooks/useProductosDestacados";
import "../stylesComponent/styleProductosDestacados.css";
import Productos from "./Productos";

export default function ProductosDestacados() {
    const productosDestacados = useProductosDestacados();

    return (
        <div className="container-fluid">
            <h1 className="text-center my-5">Nuestros Productos Más Vendidos</h1>
            <div className="row">
                {productosDestacados.map((producto) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={producto.id}>
                        <Productos producto={producto} />
                    </div>
                ))}
            </div>
        </div>
    );
}
