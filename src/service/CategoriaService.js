import axios from "axios";

// Reemplaza el localhost con tu URL del backend en producción
const API_URL = "https://backend-integrador-production.up.railway.app/api/categorias";

export const obtenerCategoria = async () => {
  return await axios.get(`${API_URL}/obtenerCategorias`);
};
