import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const CartPage = () => {
  const { carrito, setCarrito } = useContext(CarritoContext);
  const notyf = new Notyf({
    duration: 3000,
    dismissible: true,
  });

  const actualizarCantidad = (id, cantidad) => {
    const nuevoCarrito = carrito
      .map((producto) => {
        if (producto.id === id) {
          const nuevaCantidad = producto.cantidad + cantidad;
  
          if (nuevaCantidad > producto.stock) {
            notyf.error("No hay suficiente stock disponible para este producto.");
            return producto;
          }
  
          if (nuevaCantidad > 10) {
            notyf.error("No puedes agregar más de 10 unidades de este producto.");
            return producto;
          }
  
          if (nuevaCantidad < 1) {
            notyf.success("Producto eliminado del carrito.");
            return null;
          }
  
          return { ...producto, cantidad: nuevaCantidad };
        }
        return producto;
      })
      .filter(Boolean);
  
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };
  

  const calcularTotal = () => {
    return carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  };

  if (carrito.length === 0) {
    return <p className="text-center mt-5 text-dark">Tu carrito está vacío.</p>;
  }

  const linkStyles = {
    fontSize: "0.9rem",
    color: "#6c3b2a",
    fontWeight: "bold",
    textDecoration: "none",
  };

  const linkHoverStyles = {
    color: "#ca4a28",
  };

  const styles = {
    imgProducto: {
      width: "80px",
      height: "80px",
      objectFit: "cover",
    },
    btnCantidad: {
      fontSize: "0.8rem",
      width: "30px",
      height: "30px",
      padding: "0",
      borderRadius: "4px",
    },
    btnPagar: {
      backgroundColor: "#b08877",
      border: "none",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "0.9rem",
      padding: "8px 12px",
      borderRadius: "4px",
    },
    btnPagarHover: {
      backgroundColor: "#a07665",
      color: "#fff",
    },
    subtotalText: {
      fontSize: "1rem",
      color: "#333",
    },
    tabla: {
      fontSize: "0.85rem",
    },
  };

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <Link
          to="/productos"
          style={linkStyles}
          onMouseEnter={(e) => (e.target.style.color = linkHoverStyles.color)}
          onMouseLeave={(e) => (e.target.style.color = linkStyles.color)}
        >
         <i className="bi bi-arrow-left"></i> Productos
        </Link>
        {" / "}
        <span style={{ fontWeight: "bold", color: "#6c3b2a" }}>Carrito</span>
      </div>
      <h2 className="mt-2 text-dark">Tu Carrito de Compras ({carrito.length}):</h2>
      <div className="table-responsive">
        <table
          className="table table-bordered text-center align-middle"
          style={styles.tabla}
        >
          <thead>
            <tr>
              <th>Producto</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Precio Total</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((producto) => (
              <tr key={producto.id}>
                <td>
                  <img
                    src={producto.imageUrl}
                    alt={producto.nombre}
                    className="img-fluid"
                    style={styles.imgProducto}
                  />
                </td>
                <td>{producto.nombre}</td>
                <td>S/ {producto.precio.toFixed(2)}</td>
                <td>
                  <div className="d-flex justify-content-center align-items-center">
                    <button
                      className="btn btn-sm btn-danger mx-1"
                      style={styles.btnCantidad}
                      onClick={() => actualizarCantidad(producto.id, -1)}
                    >
                      -
                    </button>
                    <span>{producto.cantidad}</span>
                    <button
                      className="btn btn-sm btn-success mx-1"
                      style={styles.btnCantidad}
                      onClick={() => actualizarCantidad(producto.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>S/ {(producto.precio * producto.cantidad).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-md-end align-items-md-center">
        <h5 className="me-md-3 mb-3 mb-md-0" style={styles.subtotalText}>
          <strong className="fw-bold">SubTotal:</strong> S/{" "}
          {calcularTotal().toFixed(2)}
        </h5>
        <Link to="/checkout">
          <button
            className="btn"
            style={styles.btnPagar}
            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.btnPagarHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.btnPagar.backgroundColor)}
          >
            Ir a pagar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
