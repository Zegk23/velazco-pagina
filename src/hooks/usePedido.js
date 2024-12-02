import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext"; 
import StripeService from "../service/StripeService"; 
const usePedido = () => {
  const { carrito, vaciarCarrito } = useContext(CarritoContext); 
  const { userData } = useContext(AuthContext); 
  const [loading, setLoading] = useState(false);

  const registrarPedido = async (deliveryOption, billingDetails, deliveryDetails, pickupDetails) => {
    setLoading(true);
    try {
      if (!userData || !userData.userId) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se encontró un usuario autenticado. Inicia sesión nuevamente.",
        });
        setLoading(false);
        return;
      }

      const userId = userData.userId; 

      const carritoData = JSON.parse(localStorage.getItem("carrito")) || [];
      if (carritoData.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Carrito vacío",
          text: "No hay productos en el carrito para realizar un pedido.",
        });
        setLoading(false);
        return;
      }

      const productos = carritoData.map((item) => ({
        producto: { id: item.id },
        cantidad: item.cantidad,
      }));

      
      const pedido = {
        pedido: {
          usuario: { id: userId }, 
          fecha: new Date().toISOString().split("T")[0], 
          estado: "Pendiente",
          ...(deliveryOption === "delivery"
            ? { direccion: { ...deliveryDetails } }
            : {}),
        },
        productos,
        recojoTienda:
          deliveryOption === "pickup"
            ? {
                local: pickupDetails.local,
                horario: pickupDetails.horario,
                receptorNombre: pickupDetails.receptor,
                receptorDni: pickupDetails.dni,
              }
            : null,
      };

      console.log("Pedido final a enviar:", pedido); 

      const response = await StripeService.crearPedidoYPaymentIntent(pedido);

      console.log("Respuesta del backend:", response);

      Swal.fire({
        icon: "success",
        title: "¡Pedido realizado con éxito!",
        text: "Estamos procesando tu pedido.",
      });

      localStorage.removeItem("carrito");
      vaciarCarrito();
      return response;
    } catch (error) {
      console.error("Error al procesar el pedido:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Error al procesar el pedido",
        text: error.response?.data?.message || "Hubo un problema inesperado.",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    registrarPedido,
    loading,
  };
};

export default usePedido;
