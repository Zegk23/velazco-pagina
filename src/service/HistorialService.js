import axios from "axios";

const API_URL = "https://backend-integrador-production.up.railway.app/api/historial-pedidos";

export const obtenerHistorialPorUsuario = (idUsuario) => {
  return axios.get(`${API_URL}/usuario/${idUsuario}`);
};

export const obtenerDetallePedido = (pedidoId) => {
  return axios.get(`${API_URL}/detalle/${pedidoId}`);
};
