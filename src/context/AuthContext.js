import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 
import { obtenerHistorialPorUsuario } from "../service/HistorialService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});
  const [historial, setHistorial] = useState([]); 

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const correo = decoded.sub || "";

        setUserData({ ...decoded, correo });
        setIsAuthenticated(true);

        if (decoded.userId) {
          obtenerHistorialPorUsuario(decoded.userId)
            .then((response) => setHistorial(response.data))
            .catch((error) => console.error("Error al obtener el historial:", error));
        }
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
    setHistorial([]);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userData,
        setUserData,
        historial, 
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
