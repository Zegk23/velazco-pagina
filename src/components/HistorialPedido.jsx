import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { useHistorialPedido } from "../hooks/useHistorialPedido";
import { useModal } from "../hooks/useModal";
import "../stylesComponent/HistorialPedido.css";

export default function HistorialPedido({ historial }) {
  const { volverARealizarPedido } = useContext(CarritoContext);

  const {
    currentPage,
    setCurrentPage,
    pedidoSeleccionado,
    setPedidoSeleccionado,
    handleVerDetalles,
    handleVolverAPedir,
  } = useHistorialPedido(volverARealizarPedido);

  const { showModal, setShowModal, handleCloseModal } = useModal();

  const itemsPerPage = 2;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = historial.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(historial.length / itemsPerPage);

  return (
    <div className="container mt-4">
      {currentItems.length > 0 ? (
        currentItems.map((pedido) => (
          <div
            key={pedido.pedidoId}
            className="cartapedido position-relative"
            onClick={() => handleVerDetalles(pedido, setShowModal)}
            style={{ cursor: "pointer" }}
          >
            <div
              className="estado-pedido position-absolute"
              style={{
                top: "10px",
                right: "10px",
                padding: "5px 15px",
                backgroundColor:
                  pedido.estado === "Pendiente"
                    ? "#007bff" // Azul
                    : pedido.estado === "Entregado"
                      ? "#28a745" // Verde
                      : pedido.estado === "En Proceso"
                        ? "#ffc107" // Amarillo
                        : "#6c757d", // Gris para otros estados
                color: "#fff",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              {(pedido.estado || "Desconocido").toUpperCase()}
            </div>


            <div className="pedido-info">
              <p>
                <strong>ID Pedido:</strong> {pedido.pedidoId}
              </p>
              <p>
                <strong>Total:</strong> S/{pedido.total}
              </p>
              <div className="productos">
                {pedido.productos.map((producto, index) => (
                  <img
                    key={index}
                    src={producto.imageUrl}
                    alt={producto.nombreProducto}
                    className="img-fluid producto-img"
                  />
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No tienes pedidos en tu historial.</p>
      )}

      {totalPages > 1 && (
        <div className="pagination mt-4 d-flex justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`btn mx-1 ${currentPage === index + 1
                  ? "btn-primary"
                  : "btn-outline-secondary"
                }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {showModal && pedidoSeleccionado && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2 className="text-dark">Detalles del Pedido</h2>
            <div className="modal-form">
              <p>
                <strong>ID Pedido:</strong> {pedidoSeleccionado.pedidoId}
              </p>
              <p>
                <strong>Total:</strong> S/{pedidoSeleccionado.total}
              </p>
              <p>
                <strong>Estado:</strong> {pedidoSeleccionado.estado}
              </p>
              <p>
                <strong>Método de Entrega:</strong>{" "}
                {pedidoSeleccionado.metodoEntrega}
              </p>
              <p>
                <strong>Detalle de Entrega:</strong>{" "}
                {pedidoSeleccionado.detalleEntrega}
              </p>
              <p>
                <strong>Fecha:</strong> {pedidoSeleccionado.fecha}
              </p>
              <h5>Productos:</h5>
              <div className="productos-grid">
                {pedidoSeleccionado.productos.map((producto, index) => (
                  <div
                    key={index}
                    className="producto-detalle"
                    style={{
                      borderBottom: "1px solid #ddd",
                      marginBottom: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <img
                      src={producto.imageUrl}
                      alt={producto.nombreProducto}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                    <div>
                      <p>
                        <strong>Nombre:</strong> {producto.nombreProducto}
                      </p>
                      <p>
                        <strong>Cantidad:</strong> {producto.cantidad}
                      </p>
                      <p>
                        <strong>Subtotal:</strong> S/{producto.subtotal}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-buttons">
              <button
                className="btn btn-success"
                onClick={() =>
                  handleVolverAPedir(pedidoSeleccionado.productos)
                }
              >
                Volver a Hacer Pedido
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleCloseModal(setPedidoSeleccionado)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}