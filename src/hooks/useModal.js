import { useState } from "react";

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = (setPedidoSeleccionado) => {
    setShowModal(false);
    setPedidoSeleccionado(null);
  };

  return {
    showModal,
    setShowModal,
    handleCloseModal,
  };
};
