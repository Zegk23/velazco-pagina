import React, { useContext } from "react";
import "../stylesComponent/styleCarrito.css";
import { CarritoContext } from "../context/CarritoContext";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { Link } from "react-router-dom";
export default function CarritoDeCompras({ mostrarCarrito, cerrarCarrito }) {
  const { carrito, setCarrito, vaciarCarrito } = useContext(CarritoContext);
  const notyf = new Notyf({
    duration: 3000, 
    dismissible: true, 
  });

  const aumentarCantidad = (index) => {
    const nuevoCarrito = [...carrito];
    const producto = nuevoCarrito[index];
  
    // Validar que no se exceda el stock disponible
    if (producto.cantidad + 1 > producto.stock) {
      notyf.error("No hay suficiente stock disponible.");
      return;
    }
  
    // Validar que no se exceda el límite de 10 unidades
    if (producto.cantidad + 1 > 10) {
      notyf.error("No puedes agregar más de 10 unidades de este producto.");
      return;
    }
  
    producto.cantidad += 1;
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };
  

  const disminuirCantidad = (index) => {
    const nuevoCarrito = [...carrito];
    const producto = nuevoCarrito[index];

    if (producto.cantidad > 1) {
      producto.cantidad -= 1;
    } else {
      nuevoCarrito.splice(index, 1);
    }

    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => {
      return total + producto.precio * (producto.cantidad || 1);
    }, 0);
  };

  return (
    <div className={`carrito-panel ${mostrarCarrito ? "mostrar" : ""}`}>
      {/* Botón para cerrar el carrito */}
      <button className="cerrar-carrito mt-1" onClick={cerrarCarrito}>
        &times;
      </button>

      <h2 className="text-dark fs-5 mt-2">Tu Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div>
          {carrito.map((producto, index) => (
            <div key={index} className="producto-carrito">
              <img
                src={producto.imageUrl}
                alt={producto.nombre}
                className="imagen-producto"
              />
              <div className="detalles-producto">
                <h5>{producto.nombre}</h5>
                <p>Precio: S/ {producto.precio}</p>
                <div className="cantidad-producto">
                  <button onClick={() => disminuirCantidad(index)}>-</button>
                  <span>{producto.cantidad || 1}</span>
                  <button onClick={() => aumentarCantidad(index)}>+</button>
                </div>
              </div>
            </div>
          ))}

          <div className="total-carrito">
            <h5 className="fw-bold">Total: S/ {calcularTotal().toFixed(2)}</h5>
          </div>
          <Link to={"/carrito"}>
          <button className="btn-pagina-carrito my-3">Ir a Pagar</button>
          </Link>
          <button className="btn-vaciar-carrito" onClick={vaciarCarrito}>
            Vaciar Carrito
          </button>
        </div>
      )}
    </div>
  );
}
