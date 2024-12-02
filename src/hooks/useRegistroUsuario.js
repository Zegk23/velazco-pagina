import { useState } from "react";
import { RegistrarUsuario } from "../service/AuntenticacionService";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import {
  esNombreValido,
  esCorreoValido,
  esTelefonoValido,
  esContrasenaValida,
  esCampoSeguro,
} from "../utils/validaciones";

export default function useRegistroUsuario() {
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rolId] = useState(2); // Rol por defecto

  const notyf = new Notyf({
    duration: 3000,
    dismissible: true,
    position: { x: "center", y: "top" },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validaciones usando funciones importadas
    if (!esNombreValido(primerNombre) || !esNombreValido(primerApellido)) {
      notyf.error("Los nombres y apellidos deben contener solo letras y espacios");
      return;
    }
    if (!esCampoSeguro(primerNombre) || !esCampoSeguro(primerApellido)) {
      notyf.error("Los nombres y apellidos contienen caracteres no permitidos");
      return;
    }
    if (!esCorreoValido(correo)) {
      notyf.error("Correo electrónico no es válido");
      return;
    }
    if (telefono && !esTelefonoValido(telefono)) {
      notyf.error("El número de teléfono debe contener solo dígitos");
      return;
    }
    if (!esContrasenaValida(contrasena)) {
      notyf.error("La contraseña debe tener al menos 8 caracteres");
      return;
    }
  
    // Concatenar nombres y apellidos
    const nombre = `${primerNombre} ${segundoNombre}`.trim();
    const apellido = `${primerApellido} ${segundoApellido}`.trim();
  
    const nuevoUsuario = {
      nombre,
      apellido,
      correo,
      telefono,
      password: contrasena,
      rol: { id: rolId },
    };
  
    try {
      const respuesta = await RegistrarUsuario(nuevoUsuario);
      if (respuesta.status === 201) {
        notyf.success("Usuario registrado exitosamente");
        console.log("Usuario registrado:", respuesta.data);
      } else {
        notyf.error("Error desconocido al registrar usuario");
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      if (error.response) {
        if (error.response.data === "El correo electrónico ya está registrado") {
          notyf.error("El correo electrónico ya existe en la base de datos");
        } else {
          notyf.error("Error al registrar el usuario: " + error.response.data);
        }
      } else {
        notyf.error("Error desconocido al registrar el usuario");
      }
    }
  };
  
  return {
    primerNombre,
    setPrimerNombre,
    segundoNombre,
    setSegundoNombre,
    primerApellido,
    setPrimerApellido,
    segundoApellido,
    setSegundoApellido,
    correo,
    setCorreo,
    telefono,
    setTelefono,
    contrasena,
    setContrasena,
    handleSubmit,
  };
}
