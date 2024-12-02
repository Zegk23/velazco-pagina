import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AppRoutes, { validRoutes } from "./routes/AppRoutes";
import { CarritoProvider } from "./context/CarritoContext";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Swal from "sweetalert2";

import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();
  const navigate = useNavigate(); // Hook para redirección
  const { isAuthenticated } = useContext(AuthContext); // Usa correctamente el AuthContext
  const [hideHeader, setHideHeader] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);

  const noHeaderRoutes = ["/usuario", "/registro"];
  const noFooterRoutes = [
    "/carrito",
    "/productos",
    "/checkout",
    "/usuario",
    "/descripcionProducto/:id", "/registro"
  ];

  useEffect(() => {
    const isDescripcionProducto = location.pathname.startsWith(
      "/descripcionProducto/"
    );

    const isNotFoundPage = !validRoutes.some((route) =>
      location.pathname.match(new RegExp(`^${route.replace(/:\w+/g, "\\w+")}$`))
    );

    // Determina si el Header debe ocultarse
    setHideHeader(
      noHeaderRoutes.includes(location.pathname) || isNotFoundPage
    );

    // Determina si el Footer debe ocultarse
    setHideFooter(
      noFooterRoutes.includes(location.pathname) || isDescripcionProducto || isNotFoundPage
    );

    // Verifica si está en "/checkout" sin estar autenticado
    if (!isAuthenticated && location.pathname === "/checkout") {
      Swal.fire({
        title: "No estás autenticado",
        text: "Por favor, inicia sesión o regístrate para continuar.",
        icon: "warning",
        confirmButtonText: "Ir a inicio de sesión",
        allowOutsideClick: false, // No permite cerrar al hacer clic fuera
        allowEscapeKey: false, // No permite cerrar con la tecla Escape
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/usuario"); // Redirige al presionar el botón
        }
      });
    }
  }, [location.pathname, isAuthenticated, navigate]);

  return (
    <CarritoProvider>
      {!hideHeader && <Header />}
      <AppRoutes />
      {!hideFooter && <Footer />}
    </CarritoProvider>
  );
}

function RootApp() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default RootApp;
