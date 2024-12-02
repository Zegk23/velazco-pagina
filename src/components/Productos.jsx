import React from "react";
import "../stylesComponent/styleProductos.css";
import { useProductoActions } from "../hooks/useProducto";

export default function Productos({ producto }) {
  const { redirigirADetalles, agregarAlCarrito } = useProductoActions(producto);

  return (
    <div className="col-sm-6 col-md-4 mb-4">
      <div className="card mx-1 producto-card">
        <div className="img-container">
          <img
            src={producto.imageUrl || "default.jpg"}
            alt={producto.nombre || "Producto sin nombre"}
            className="card-img-top"
            onClick={redirigirADetalles}
          />
          <div
            className="add-to-cart"
            onClick={() => agregarAlCarrito(1)}
            style={{ cursor: "pointer" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="black"
              className="bi bi-basket2-fill"
              viewBox="0 0 16 16"
            >
              <path d="M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0zm4-1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1" />
            </svg>
          </div>
        </div>
        <div className="card-body">
          <p
            className="text-center my-0 categoria fw-bold"
            onClick={redirigirADetalles}
            style={{ cursor: "pointer" }}
          >
            {producto.categoria?.nombre || "Sin categoría"}
          </p>
          <h5
            className="card-title text-center"
            onClick={redirigirADetalles}
            style={{ cursor: "pointer" }}
          >
            {producto.nombre || "Producto sin nombre"}
          </h5>
          <p
            className="card-text text-center"
            onClick={redirigirADetalles}
            style={{ cursor: "pointer" }}
          >
            Precio: S/ {producto.precio || 0.0}
          </p>
        </div>
      </div>
    </div>
  );
}
