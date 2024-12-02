import React from "react";

const OrderSummary = ({ cart, subtotal }) => (
  <div>
    <h4 className="text-dark fw-bold">Resumen del Pedido</h4>
    <ul className="list-group">
      {cart.map((item) => (
        <li key={item.id} className="list-group-item d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src={item.imageUrl}
              alt={item.nombre}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            />
            <div>
              <h6 className="mb-0">{item.nombre}</h6>
              <small className="text-muted">Cantidad: {item.cantidad}</small>
              <br />
              <small className="text-muted">Precio unitario: S/ {item.precio.toFixed(2)}</small>
            </div>
          </div>
          <span className="fw-bold">S/ {(item.precio * item.cantidad).toFixed(2)}</span>
        </li>
      ))}
    </ul>
    <h5 className="mt-3">Subtotal: S/ {subtotal.toFixed(2)}</h5>
  </div>
);

export default OrderSummary;
