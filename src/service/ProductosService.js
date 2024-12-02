import axios from 'axios';

// Cambiar localhost por el URL de producción
const API_URL = 'https://backend-integrador-production.up.railway.app/api/productos';

const obtenerTodosLosProductos = () => {
    return axios.get(`${API_URL}/listarProductos`);
};

const obtenerProductosDestacados = () => {
    return axios.get(`${API_URL}/masVendidos`);
};

const obtenerProductoPorId = (id) => {
    return axios.get(`${API_URL}/obtenerPorId/${id}`);
};

export default {
    obtenerTodosLosProductos,
    obtenerProductosDestacados,
    obtenerProductoPorId,
};
