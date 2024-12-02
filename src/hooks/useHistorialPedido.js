import { useState } from "react";
import { obtenerDetallePedido } from "../service/HistorialService";
import Swal from "sweetalert2";

export const useHistorialPedido = (volverARealizarPedido) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  const handleVerDetalles = async (pedido, setShowModal) => {
    setPedidoSeleccionado(pedido);
    setShowModal(true);

    try {
      const response = await obtenerDetallePedido(pedido.pedidoId);
      setPedidoSeleccionado((prev) => ({ ...prev, ...response.data }));
    } catch (error) {
      console.error("Error al obtener los detalles del pedido:", error);
      Swal.fire("Error", "No se pudo cargar los detalles del pedido.", "error");
    }
  };

  const handleVolverAPedir = (productos) => {
    const resultado = volverARealizarPedido(productos);

    if (resultado.success) {
      Swal.fire("¡Éxito!", resultado.message, "success");
    } else {
      Swal.fire("Error", resultado.message, "error");
    }
  };

  return {
    currentPage,
    setCurrentPage,
    pedidoSeleccionado,
    setPedidoSeleccionado,
    handleVerDetalles,
    handleVolverAPedir,
  };
};