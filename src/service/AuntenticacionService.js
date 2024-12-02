import axios from "axios";

// Reemplaza el localhost con tu URL del backend en producción
const API_URL = "https://backend-integrador-production.up.railway.app/api/auth";

export const LogearUsuario = (correo, password) => {
  return axios.post(`${API_URL}/login`, { correo, password });
};

export const RegistrarUsuario = (userData) => {
  return axios.post("https://backend-integrador-production.up.railway.app/api/usuarios/registrar", userData, {
    headers: { "Content-Type": "application/json" },
  });
};

export const ActualizarUsuario = (token, updatedUser) => {
  return axios.put(`${API_URL}/update`, updatedUser, { 
    headers: {
      Authorization: `Bearer ${token}`, 
      "Content-Type": "application/json",
    },
  });
};
