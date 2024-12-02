import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import useRegistroUsuario from "../hooks/useRegistroUsuario";
import "bootstrap/dist/css/bootstrap.min.css";
import "../stylesComponent/styleRegister.css";

export default function Register() {
  const {
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
  } = useRegistroUsuario();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Inicializamos useNavigate

  const handleBackToUserPage = () => {
    navigate("/usuario"); // Redirige a la página de usuario
  };

  return (
    <div className="register-wrapper d-flex align-items-center justify-content-center text-dark">
      <div className="register-container d-flex">
        <div className="image-section d-none d-md-block">
          <img
            src="https://proingra.com/wp-content/uploads/2023/03/23-FEB-BRAHMAN-I.jpg"
            alt="Imagen de registro"
            className="register-image"
          />
        </div>

        <div className="form-section p-5">
          <h2 className="text-center mb-4 text-dark">Crear Cuenta</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label text-dark">Primer Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  value={primerNombre}
                  onChange={(e) => setPrimerNombre(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-dark">Segundo Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  value={segundoNombre}
                  onChange={(e) => setSegundoNombre(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-dark">Primer Apellido:</label>
                <input
                  type="text"
                  className="form-control"
                  value={primerApellido}
                  onChange={(e) => setPrimerApellido(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-dark">Segundo Apellido:</label>
                <input
                  type="text"
                  className="form-control"
                  value={segundoApellido}
                  onChange={(e) => setSegundoApellido(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label text-dark">Correo Electrónico:</label>
              <input
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-dark">Teléfono:</label>
              <input
                type="tel"
                className="form-control"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <label className="form-label text-dark">Contraseña:</label>
            <div className="form-group mb-3 password-container">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="btn-icon-password"
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </button>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Registrar Usuario
            </button>
          </form>

          {/* Botón para regresar a /usuario */}
          <div className="text-center mt-3">
            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              onClick={handleBackToUserPage}
            >
              Volver al login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
