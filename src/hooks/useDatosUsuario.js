import { useState, useEffect } from "react";
import {jwtDecode }from "jwt-decode"; 
import { ActualizarUsuario } from "../service/AuntenticacionService";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function useDatosUsuario() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [error, setError] = useState("");

  const notyf = new Notyf({
    duration: 3000,
    dismissible: true,
    position: { x: "center", y: "top" },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Usar jwtDecode en lugar de jwt_decode
        setUserData({
          id: decodedToken.userId,
          nombre: decodedToken.nombre,
          apellido: decodedToken.apellido,
          correo: decodedToken.sub,
          telefono: decodedToken.telefono,
          rolId: decodedToken.rolId, // Asegúrate de incluir este campo en tu token
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setIsAuthenticated(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserData({});
    window.location.reload();
  };

  const validateForm = () => {
    if (userData.nombre.length < 2) {
      setError("El nombre debe tener al menos 2 caracteres");
      return false;
    }
    if (userData.apellido.length < 2) {
      setError("El apellido debe tener al menos 2 caracteres");
      return false;
    }
    const emailPattern = /^[A-Za-z0-9+_.-]+@(.+)$/;
    if (!emailPattern.test(userData.correo)) {
      setError("El correo electrónico no tiene un formato válido");
      return false;
    }
    if (nuevaContrasena && nuevaContrasena.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return false;
    }
    setError("");
    return true;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      const updatedUser = {
        nombre: userData.nombre,
        apellido: userData.apellido,
        correo: userData.correo,
        telefono: userData.telefono,
        password: nuevaContrasena || undefined,
      };

      await ActualizarUsuario(token, updatedUser);

      // Actualiza la información local
      setUserData((prev) => ({
        ...prev,
        nombre: updatedUser.nombre,
        apellido: updatedUser.apellido,
        correo: updatedUser.correo,
        telefono: updatedUser.telefono,
      }));

      notyf.success("Datos actualizados exitosamente");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      notyf.error("Hubo un problema al actualizar los datos");
    }
  };

  return {
    isAuthenticated,
    userData,
    setUserData,
    nuevaContrasena,
    setNuevaContrasena,
    handleLogout,
    handleUpdate,
    error,
  };
}
