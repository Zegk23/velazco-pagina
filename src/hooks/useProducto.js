import { useContext } from "react";
import { Notyf } from "notyf";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import "notyf/notyf.min.css";

export const useProductoActions = (producto) => {
  const { agregarProducto } = useContext(CarritoContext);
  const navigate = useNavigate();
  const notyf = new Notyf({
    duration: 3000,
    dismissible: true,
  });

  const redirigirADetalles = () => {
    navigate(`/descripcionProducto/${producto.id}`);
  };

  const agregarAlCarrito = (cantidad = 1) => {
    const resultado = agregarProducto({ ...producto, cantidad });

    if (resultado.success) {
      notyf.success(resultado.message);
    } else {
      notyf.error(resultado.message);
    }
  };

  return {
    redirigirADetalles,
    agregarAlCarrito,
  };
};
