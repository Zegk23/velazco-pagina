import axios from "axios";

// Cambiar localhost por el URL de producción
const API_URL = "https://backend-integrador-production.up.railway.app/api/pedidos";

const StripeService = {
  crearPedidoYPaymentIntent: async (pedido) => {
    const token = localStorage.getItem("token"); 
    try {
      const response = await axios.post(`${API_URL}/crear-pedido`, pedido, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear el pedido:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default StripeService;
