import React from "react";
import Swal from "sweetalert2";
import { esCampoSeguro, esCorreoValido } from "../utils/validaciones";

const BillingDetails = ({ billingDetails, handleBillingDetailsChange }) => {
  const validarCampo = (id, value) => {
    if (id === "fullName") {
      if (value.length > 30) {
        Swal.fire("Error", "El nombre completo no puede exceder los 30 caracteres.", "error");
        return false;
      }
      if (value.length > 0 && !esCampoSeguro(value)) {
        Swal.fire("Error", "El nombre completo contiene caracteres no permitidos.", "error");
        return false;
      }
    }

    if (id === "email") {
      // Valida contra SQL Injection y XSS, pero permite escribir libremente
      if (value.length > 0 && !esCampoSeguro(value)) {
        Swal.fire("Error", "El correo contiene caracteres no permitidos.", "error");
        return false;
      }
    }

    if (id === "phone") {
      // Valida que solo se escriban números
      if (value.length > 9) {
        Swal.fire("Error", "El teléfono no puede exceder los 9 dígitos.", "error");
        return false;
      }
      if (value.length > 0 && !/^\d*$/.test(value)) {
        Swal.fire("Error", "El teléfono solo puede contener números.", "error");
        return false;
      }
    }

    return true;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (value === "" || validarCampo(id, value)) {
      handleBillingDetailsChange(e); // Permitir borrar o escribir el campo
    }
  };

  return (
    <div>
      <h4 className="text-dark fw-bold fs-5">Detalles de Pago</h4>
      <div className="mb-3">
        <label htmlFor="fullName" className="text-dark fw-bold fs-6">Nombre Completo:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          className="form-control"
          value={billingDetails.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="text-dark fw-bold fs-6">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          value={billingDetails.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="text-dark fw-bold fs-6">Teléfono:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          className="form-control"
          value={billingDetails.phone}
          onChange={handleChange}
          maxLength={9} // Limita el número de caracteres a 9
          required
        />
      </div>
    </div>
  );
};

export default BillingDetails;
