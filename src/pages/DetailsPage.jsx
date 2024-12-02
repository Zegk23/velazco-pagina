import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import "../stylesPages/DetailsPage.css";
import { CarritoContext } from "../context/CarritoContext";
import ProductosService from "../service/ProductosService";

export default function DetailsPage() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);

  const { agregarProducto } = useContext(CarritoContext);
  const notyf = new Notyf({
    duration: 3000,
    dismissible: true,
  });

  const agregarAlCarrito = () => {
    const resultado = agregarProducto({ ...producto, cantidad });

    if (resultado.success) {
      notyf.success(resultado.message);
    } else {
      notyf.error(resultado.message);
    }
  };

  const incrementarCantidad = () => {
    if (cantidad < producto.stock) {
      setCantidad(cantidad + 1);
    } else {
      notyf.error("No hay suficiente stock disponible.");
    }
  };

  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  useEffect(() => {
    const obtenerDetallesProducto = async () => {
      try {
        const response = await ProductosService.obtenerProductoPorId(id);
        setProducto(response.data);
      } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerDetallesProducto();
  }, [id]);

  if (loading) {
    return <p className="details-loading">Cargando detalles del producto...</p>;
  }

  if (!producto) {
    return <p className="details-not-found">No se encontró el producto.</p>;
  }

  const volverLinkStyles = {
    fontSize: "0.9rem",
    color: "#6c3b2a",
    fontWeight: "bold",
    textDecoration: "none",
  };

  const volverLinkHoverStyles = {
    color: "#ca4a28",
  };

  return (
    <div className="container details-container">
      <div className="details-back-link">
        <Link
          to="/productos"
          style={volverLinkStyles}
          onMouseEnter={(e) => (e.target.style.color = volverLinkHoverStyles.color)}
          onMouseLeave={(e) => (e.target.style.color = volverLinkStyles.color)}
        >
          <i className="bi bi-arrow-left"></i> Volver a Productos
        </Link>
      </div>

      <h2 className="details-title text-dark mx-5 my-5">Detalles del Producto</h2>
      <div className="row details-row">
        <div className="col-sm-12 col-md-6 details-image-container">
          <img
            src={producto.imageUrl}
            alt={producto.nombre}
            className="details-producto-imagen"
          />
        </div>
        <div className="col-sm-12 col-md-6 details-info-container">
          <h2 className="details-producto-nombre text-dark">{producto.nombre}</h2>
          <p className="details-producto-descripcion text-dark">{producto.descripcion}</p>
          <p className="details-producto-precio text-dark fw-bold">Precio: S/ {producto.precio}</p>

          <div className="details-control-group">
            <div className="details-cantidad-control">
              <button
                onClick={disminuirCantidad}
                className="details-btn-cantidad btn text-light"
              >
                -
              </button>
              <span className="details-cantidad">{cantidad}</span>
              <button
                onClick={incrementarCantidad}
                className="details-btn-cantidad btn text-light"
              >
                +
              </button>
            </div>

            <button
              onClick={agregarAlCarrito}
              className="details-btn-agregar-carrito btn text-light my-3"
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
