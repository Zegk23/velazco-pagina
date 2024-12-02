import { useState } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { LogearUsuario } from "../service/AuntenticacionService";
import { esCorreoValido, esContrasenaValida, esCampoSeguro } from "../utils/validaciones";

export const useManejoSesion = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const notyf = new Notyf({
    position: { x: "center", y: "top" },
    duration: 3000,
  });

  const validarDatos = () => {
    if (!esCorreoValido(correo)) {
      notyf.error("Correo electrónico no es válido.");
      return false;
    }

    if (!esCampoSeguro(correo)) {
      notyf.error("El correo contiene caracteres inválidos.");
      return false;
    }

    if (!esContrasenaValida(password)) {
      notyf.error("La contraseña debe tener al menos 8 caracteres.");
      return false;
    }

    if (!esCampoSeguro(password)) {
      notyf.error("La contraseña contiene caracteres inválidos.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarDatos()) return;

    try {
      const respuestaLogin = await LogearUsuario(correo, password);
      const { token } = respuestaLogin.data;

      if (!token) {
        notyf.error("Token no válido o no recibido.");
        return;
      }

      localStorage.setItem("token", token);

      notyf.success("Inicio de sesión exitoso");

      // Recarga la página después de 2 segundos
      setTimeout(() => {
        console.log("Recargando la página...");
        window.location.reload();
      }, 2000);
    } catch (error) {
      notyf.error("Correo o contraseña incorrectos.");
      console.error("Error al iniciar sesión:", error.response?.data || error.message);
    }
  };

  return {
    correo,
    password,
    setCorreo,
    setPassword,
    handleSubmit,
  };
};
