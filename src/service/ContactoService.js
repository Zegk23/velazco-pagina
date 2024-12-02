import axios from "axios";

// Cambiar localhost por el URL de producción
const CONTACT_API_URL = "https://backend-integrador-production.up.railway.app/api/contacto";

export const enviarContacto = (formData) => {
  return axios.post(`${CONTACT_API_URL}/enviar`, formData);
};
