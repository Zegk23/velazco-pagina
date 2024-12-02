import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importamos useNavigate
import { useManejoSesion } from "../hooks/useManejoSesion";
import "../stylesComponent/styleLogin.css";

export default function Login() {
  const { correo, password, setCorreo, setPassword, handleSubmit } =
    useManejoSesion();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Usamos useNavigate para redirigir a la página principal

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleBackToHome = () => {
    navigate("/"); // Redirige a la página principal
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <div className="login-container d-flex">
        <div className="image-section d-none d-md-block">
          <img
            src="https://proingra.com/wp-content/uploads/2023/03/23-FEB-BRAHMAN-I.jpg"
            alt="Imagen de inicio de sesión"
            className="login-image"
          />
        </div>

        <div className="form-section p-5">
          <h2 className="text-center mb-4 text-dark">Bienvenido</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="correo" className="form-label text-dark">
                Correo electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="correo"
                placeholder="Ingresa tu correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <label htmlFor="password" className="form-label text-dark">
              Contraseña
            </label>
            <div className="form-group mb-3 password-container">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </button>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Iniciar Sesión
            </button>
          </form>

          <div className="text-center mt-3">
            <p>
              ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
            </p>
          </div>

          {/* Botón para volver a la página principal */}
          <div className="text-center mt-3">
            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              onClick={handleBackToHome}
            >
              Volver a la página principal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
