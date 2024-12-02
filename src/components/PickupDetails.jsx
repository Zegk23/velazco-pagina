import React from "react";
import Swal from "sweetalert2";
import { esCampoSeguro } from "../utils/validaciones";

const PickupDetails = ({ pickupDetails, handlePickupDetailsChange, generateTimeOptions }) => {
  const validarCampo = (id, value) => {
    if (id === "receptor") {
      if (value.length > 30) {
        Swal.fire("Error", "El nombre del receptor no puede exceder los 30 caracteres.", "error");
        return false;
      }
      if (value.length > 0 && !esCampoSeguro(value)) {
        Swal.fire("Error", "El nombre del receptor contiene caracteres no permitidos.", "error");
        return false;
      }
    }

    if (id === "dni") {
      if (value.length > 8) {
        Swal.fire("Error", "El DNI no puede exceder 8 dígitos.", "error");
        return false;
      }
      if (value.length > 0 && !/^\d*$/.test(value)) {
        Swal.fire("Error", "El DNI solo puede contener números.", "error");
        return false;
      }
    }

    return true;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (value === "" || validarCampo(id, value)) {
      handlePickupDetailsChange(e); // Permitir borrar o escribir el campo
    }
  };

  return (
    <div>
      <h5 className="text-dark fw-bold fs-5">Detalles para recoger en tienda</h5>
      <div className="mb-3">
        <label htmlFor="local" className="form-label text-dark fw-bold">Elija el local para el recojo:</label>
        <select
          id="local"
          name="local"
          className="form-select"
          value={pickupDetails.local}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un local</option>
          <option value="Velazco Av Grau 199">Velazco Av Grau 199</option>
          <option value="Velazco Megaplaza">Velazco Megaplaza</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="horario" className="form-label text-dark fw-bold fs-6">Elija el horario para el recojo:</label>
        <select
          id="horario"
          name="horario"
          className="form-select"
          value={pickupDetails.horario}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un horario</option>
          {generateTimeOptions().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex gap-3">
        <div className="mb-3 flex-grow-1">
          <label htmlFor="receptor" className="form-label text-dark fw-bold">Nombre del receptor:</label>
          <input
            type="text"
            id="receptor"
            name="receptor"
            className="form-control"
            value={pickupDetails.receptor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 flex-grow-1">
          <label htmlFor="dni" className="form-label text-dark fw-bold">DNI del receptor:</label>
          <input
            type="text"
            id="dni"
            name="dni"
            className="form-control"
            value={pickupDetails.dni}
            onChange={handleChange}
            maxLength={8} // Limita el campo a 8 caracteres
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PickupDetails;
