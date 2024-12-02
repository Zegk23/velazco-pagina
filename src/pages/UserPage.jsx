import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import { AuthContext } from "../context/AuthContext";
import HistorialPedido from "../components/HistorialPedido";
import Login from "../components/Login";
import { ActualizarUsuario } from "../service/AuntenticacionService";
import Swal from "sweetalert2";
import { esCampoSeguro, esCorreoValido } from "../utils/validaciones";
import "../stylesPages/styleUserPage.css";

export default function UserPage() {
  const navigate = useNavigate(); // Inicializa el hook
  const { isAuthenticated, userData, historial, handleLogout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    nombre: userData.nombre || "",
    apellido: userData.apellido || "",
    correo: userData.correo || "",
    telefono: userData.telefono || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  const handleSaveChanges = async () => {
    if (!editData.nombre || !editData.apellido || !editData.correo || !editData.telefono) {
      Swal.fire("Error", "Todos los campos deben estar llenos.", "error");
      return;
    }

    if (!esCorreoValido(editData.correo)) {
      Swal.fire("Error", "El correo no tiene un formato válido.", "error");
      return;
    }

    if (
      !esCampoSeguro(editData.nombre) ||
      !esCampoSeguro(editData.apellido) ||
      !esCampoSeguro(editData.correo)
    ) {
      Swal.fire("Error", "Los campos contienen caracteres no permitidos.", "error");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire("Error", "No tienes una sesión activa.", "error");
        return;
      }

      await ActualizarUsuario(token, editData);
      Swal.fire({
        title: "¡Éxito!",
        text: "Datos actualizados. Por favor, inicia sesión nuevamente.",
        icon: "success",
        confirmButtonText: "Cerrar sesión",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      });
    } catch (error) {
      Swal.fire("Error", error.response?.data || "Hubo un problema al actualizar los datos.", "error");
    }
  };





  const confirmLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
        Swal.fire("Cerraste sesión", "Tu sesión ha sido cerrada exitosamente.", "success");
      }
    });
  };

  return (
    <div className="container-perfil">
      {/* Sección de Perfil */}
      <div className="perfil-header">
        <div className="perfil-imagen">
          <i className="bi bi-person-circle icono-perfil"></i>
        </div>
        <div className="perfil-informacion">
          <h2>
            ¡Bienvenido,{" "}
            {`${userData.nombre || "Nombre"} `}!
          </h2>
          <p>{userData.correo || "Correo no disponible"}</p>
        </div>
        <div className="perfil-botones mt-3">
          <button
            className="btn btn-success" // Agrega estilos CSS para el botón
            onClick={() => navigate("/")} // Redirige a la página principal
          >
            Volver a Inicio
          </button>
          <button className="boton-primario" onClick={() => setShowModal(true)}>
            Editar Datos
          </button>
          <button className="boton-peligro" onClick={confirmLogout}>
            Cerrar Sesión
          </button>

        </div>
      </div>

      {/* Formulario */}
      <div className="perfil-formulario">
        <div className="grupo-formulario">
          <label>Nombre Completo</label>
          <input
            type="text"
            placeholder={`${userData.nombre || "Nombre"} ${userData.apellido || "no disponible"
              }`}
            disabled
          />
        </div>
        <div className="grupo-formulario">
          <label>Correo Electrónico</label>
          <input type="email" placeholder={userData.correo || "Correo no disponible"} disabled />
        </div>
        <div className="grupo-formulario">
          <label>Teléfono</label>
          <input type="tel" placeholder={userData.telefono || "Teléfono no disponible"} disabled />
        </div>
        <div className="grupo-formulario">
          <label>País</label>
          <input type="text" placeholder="Perú" disabled />
        </div>
      </div>

      {/* Sección de Pedidos */}
      <div className="perfil-pedidos">
        <div className="pedidos-header">
          <i className="bi bi-bag-fill icono-pedidos"></i>
          <h3>Mis Pedidos</h3>
        </div>
        <HistorialPedido historial={historial} />
      </div>
      {/* Modal para editar datos */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2 className="text-dark">Editar Datos</h2>
            <div className="modal-form">
              {/* Validación para Nombre */}
              <div className="grupo-formulario">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={editData.nombre}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    if (value.length > 30) {
                      Swal.fire("Error", "El nombre no puede exceder los 30 caracteres.", "error");
                    } else if (!esCampoSeguro(value) && value.length > 0) {
                      Swal.fire("Error", "El nombre contiene caracteres no permitidos.", "error");
                    } else {
                      // Actualizar el estado solo si el valor es válido
                      setEditData((prevData) => ({ ...prevData, [name]: value }));
                    }
                  }}
                />
              </div>

              {/* Validación para Apellido */}
              <div className="grupo-formulario">
                <label>Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={editData.apellido}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    if (value.length > 30) {
                      Swal.fire("Error", "El apellido no puede exceder los 30 caracteres.", "error");
                    } else if (!esCampoSeguro(value) && value.length > 0) {
                      Swal.fire("Error", "El apellido contiene caracteres no permitidos.", "error");
                    } else {
                      // Actualizar el estado solo si el valor es válido
                      setEditData((prevData) => ({ ...prevData, [name]: value }));
                    }
                  }}
                />
              </div>

              {/* Validación para Correo Electrónico */}
              <div className="grupo-formulario">
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  name="correo"
                  value={editData.correo}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    // Actualizar el estado siempre
                    setEditData((prevData) => ({ ...prevData, [name]: value }));
                  }}
                  onBlur={(e) => {
                    const { value } = e.target;
                    // Validar al salir del campo
                    if (!esCorreoValido(value)) {
                      Swal.fire("Error", "El correo no tiene un formato válido.", "error");
                    } else if (!esCampoSeguro(value)) {
                      Swal.fire("Error", "El correo contiene caracteres no permitidos.", "error");
                    }
                  }}
                />
              </div>

              {/* Validación para Teléfono */}
              <div className="grupo-formulario">
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={editData.telefono}
                  maxLength={9} // Limitar siempre a 9 caracteres
                  onChange={(e) => {
                    const { name, value } = e.target;
                    if (value.length > 9) {
                      Swal.fire("Error", "El teléfono no puede exceder los 9 dígitos.", "error");
                    } else if (!/^\d*$/.test(value) && value.length > 0) {
                      Swal.fire("Error", "El teléfono solo puede contener números.", "error");
                    } else {
                      // Actualizar el estado solo si el valor es válido
                      setEditData((prevData) => ({ ...prevData, [name]: value }));
                    }
                  }}
                />
              </div>
            </div>

            {/* Botones para guardar o cancelar */}
            <div className="modal-buttons">
              <button className="boton-primario" onClick={handleSaveChanges}>
                Guardar Cambios
              </button>
              <button className="boton-peligro" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}