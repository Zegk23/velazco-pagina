import React from "react";
import Swal from "sweetalert2";
import { esCampoSeguro } from "../utils/validaciones";

const DeliveryDetails = ({ deliveryDetails, handleDeliveryDetailsChange }) => {
  const validarCampo = (id, value) => {
    if (id === "direccion") {
      if (value.length > 30) {
        Swal.fire("Error", "La dirección no puede exceder los 30 caracteres.", "error");
        return false;
      }
      if (value.length > 0 && !esCampoSeguro(value)) {
        Swal.fire("Error", "La dirección contiene caracteres no permitidos.", "error");
        return false;
      }
    }

    if (id === "referencia") {
      if (value.length > 30) {
        Swal.fire("Error", "La referencia no puede exceder los 30 caracteres.", "error");
        return false;
      }
      if (value.length > 0 && !/^[a-zA-Z0-9\s.,-]*$/.test(value)) {
        Swal.fire("Error", "La referencia contiene caracteres no permitidos.", "error");
        return false;
      }
    }

    return true;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (value === "" || validarCampo(id, value)) {
      handleDeliveryDetailsChange(e); // Permitir borrar o escribir el campo
    }
  };

  return (
    <div>
      <h5 className="text-dark fw-bold fs-5">Detalles para el Delivery</h5>
      <div className="mb-3">
        <label htmlFor="pais" className="form-label text-dark fw-bold">País:</label>
        <input type="text" id="pais" name="pais" className="form-control" value={deliveryDetails.pais} readOnly />
      </div>
      <div className="mb-3">
        <label htmlFor="ciudad" className="form-label text-dark fw-bold">Ciudad:</label>
        <input type="text" id="ciudad" name="ciudad" className="form-control" value={deliveryDetails.ciudad} readOnly />
      </div>
      <div className="mb-3">
        <label htmlFor="direccion" className="form-label text-dark fw-bold">Dirección:</label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          className="form-control"
          placeholder="Ej: Calle Los Olivos 123"
          value={deliveryDetails.direccion}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="referencia" className="form-label text-dark fw-bold">Referencia:</label>
        <input
          type="text"
          id="referencia"
          name="referencia"
          className="form-control"
          placeholder="Ej: Cerca al parque"
          value={deliveryDetails.referencia}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default DeliveryDetails;
