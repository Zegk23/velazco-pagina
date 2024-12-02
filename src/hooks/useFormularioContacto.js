import { useState } from "react";
import Swal from "sweetalert2";
import { enviarContacto } from "../service/ContactoService"; // Importación correcta
import {
  esNombreValidoFormulario,
  esCorreoValidoFormulario,
  esTelefonoValidoFormulario,
  esMensajeValidoFormulario,
  esCampoSeguro,
  esTextoSeguro,
  escaparHTML,
} from "../utils/validaciones";

export default function useFormularioContacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    const valorSanitizado = escaparHTML(value); // Escapar caracteres peligrosos
    setFormData((prevData) => ({
      ...prevData,
      [id]: valorSanitizado,
    }));
  };

  const validarFormulario = () => {
    if (!esNombreValidoFormulario(formData.nombre) || !esCampoSeguro(formData.nombre)) {
      Swal.fire("Error", "El nombre contiene caracteres inválidos o supera el límite permitido.", "error");
      return false;
    }
    if (!esCorreoValidoFormulario(formData.correo)) {
      Swal.fire("Error", "Correo electrónico inválido.", "error");
      return false;
    }
    if (!esTelefonoValidoFormulario(formData.telefono) || !esCampoSeguro(formData.telefono)) {
      Swal.fire("Error", "El teléfono contiene caracteres inválidos.", "error");
      return false;
    }
    if (!esMensajeValidoFormulario(formData.mensaje) || !esTextoSeguro(formData.mensaje)) {
      Swal.fire("Error", "El mensaje contiene caracteres peligrosos o excede el límite permitido.", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      const response = await enviarContacto(formData); // Llamada a la API
      if (response.status === 201) {
        Swal.fire("Éxito", "Formulario enviado con éxito.", "success");
        setFormData({ nombre: "", correo: "", telefono: "", mensaje: "" });
      } else {
        Swal.fire("Error", "No se pudo enviar el formulario.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Ocurrió un error al enviar el formulario.", "error");
      console.error("Error:", error);
    }
  };

  return { formData, handleChange, handleSubmit };
}
