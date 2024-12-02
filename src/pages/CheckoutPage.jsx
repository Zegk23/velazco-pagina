import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import BillingDetails from "../components/BillingDetails";
import PickupDetails from "../components/PickupDetails";
import DeliveryDetails from "../components/DeliveryDetails";
import OrderSummary from "../components/OrderSummary";
import usePedido from "../hooks/usePedido";
import Swal from "sweetalert2";
import {
  esCorreoValido,
  esTextoSeguro,
  esTelefonoValido,
  esTextoDeLongitudValida,
} from "../utils/validaciones";

const stripePromise = loadStripe("pk_test_51PTvWABzWFke1tUBiAGwKdfoTW3W4jLLQ88DvlcGGAcmB10Dj5kojMaf9r0lPi54sNv47wmdiN9hqDi29clrHDbU003qXTZU1n");

const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { registrarPedido, loading } = usePedido();
  const navigate = useNavigate();

  const [deliveryOption, setDeliveryOption] = useState(null);
  const [pickupDetails, setPickupDetails] = useState({
    local: "",
    horario: "",
    receptor: "",
    dni: "",
  });
  const [deliveryDetails, setDeliveryDetails] = useState({
    pais: "Perú",
    ciudad: "Ica",
    distrito: "Ica",
    direccion: "",
    referencia: "",
    telefonoContacto: "",
  });
  const [billingDetails, setBillingDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    postalCode: "",
  });
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const linkStyles = {
    fontSize: "0.9rem",
    color: "#6c3b2a",
    fontWeight: "bold",
    textDecoration: "none",
  };

  const linkHoverStyles = {
    color: "#ca4a28",
  };

  useEffect(() => {
    const updateCart = () => {
      const cartData = JSON.parse(localStorage.getItem("carrito")) || [];
      setCart(cartData);
      const total = cartData.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
      setSubtotal(total);
    };
    updateCart();
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  const validarDetalles = () => {
    if (!esTextoSeguro(billingDetails.fullName) || !esTextoDeLongitudValida(billingDetails.fullName, 1, 50)) {
      Swal.fire("Error", "El nombre completo no es válido.", "error");
      return false;
    }
    if (!esCorreoValido(billingDetails.email)) {
      Swal.fire("Error", "El correo electrónico no es válido.", "error");
      return false;
    }
    if (!esTelefonoValido(billingDetails.phone)) {
      Swal.fire("Error", "El número de teléfono no es válido.", "error");
      return false;
    }
    if (deliveryOption === "delivery") {
      if (!esTextoDeLongitudValida(deliveryDetails.direccion, 5, 100)) {
        Swal.fire("Error", "La dirección debe tener entre 5 y 100 caracteres.", "error");
        return false;
      }
    }
    if (deliveryOption === "pickup") {
      if (!pickupDetails.local || !pickupDetails.horario) {
        Swal.fire("Error", "Debes seleccionar un local y un horario para el recojo.", "error");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      Swal.fire("Error", "Stripe no está cargado correctamente.", "error");
      return;
    }

    if (!deliveryOption) {
      Swal.fire("Advertencia", "Por favor, selecciona cómo deseas recibir tu pedido.", "warning");
      return;
    }

    if (!validarDetalles()) return;

    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: billingDetails.fullName,
        email: billingDetails.email,
        address: { postal_code: billingDetails.postalCode },
      },
    });

    if (error) {
      Swal.fire("Error de pago", error.message, "error");
      return;
    }

    try {
      await registrarPedido(
        deliveryOption,
        billingDetails,
        { ...deliveryDetails, codigoPostal: paymentMethod.billing_details?.address?.postal_code },
        pickupDetails
      );

      Swal.fire("Pedido completado", "Tu pedido se ha realizado con éxito.", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", "Hubo un problema al procesar tu pedido.", "error");
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        iconColor: "#666EE8",
        color: "#31325F",
        fontWeight: "400",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        "::placeholder": { color: "#aab7c4" },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    hidePostalCode: false,
  };

  const generateTimeOptions = () =>
    Array.from({ length: 12 }, (_, i) => `${8 + i}:00 - ${9 + i}:00`);

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <Link
          to="/productos"
          style={linkStyles}
          onMouseEnter={(e) => (e.target.style.color = linkHoverStyles.color)}
          onMouseLeave={(e) => (e.target.style.color = linkStyles.color)}
        >
           <i className="bi bi-arrow-left"></i> Productos
        </Link>
        {" / "}
        <Link
          to="/carrito"
          style={linkStyles}
          onMouseEnter={(e) => (e.target.style.color = linkHoverStyles.color)}
          onMouseLeave={(e) => (e.target.style.color = linkStyles.color)}
        >
          Carrito
        </Link>
        {" / "}
        <span style={{ fontWeight: "bold", color: "#6c3b2a" }}>Checkout</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <h5 className="text-dark fw-bold fs-5">¿Cómo desea recibir su pedido?</h5>
            <div className="d-flex gap-3 my-3">
              <button
                type="button"
                className={`btn ${deliveryOption === "pickup" ? "btn-dark" : "btn-outline-dark"} flex-grow-1`}
                onClick={() => setDeliveryOption("pickup")}
              >
                Recoger en tienda
              </button>
              <button
                type="button"
                className={`btn ${deliveryOption === "delivery" ? "btn-dark" : "btn-outline-dark"} flex-grow-1`}
                onClick={() => setDeliveryOption("delivery")}
              >
                Delivery
              </button>
            </div>
            {deliveryOption === "pickup" && (
              <PickupDetails
                pickupDetails={pickupDetails}
                handlePickupDetailsChange={(e) =>
                  setPickupDetails({ ...pickupDetails, [e.target.name]: e.target.value })
                }
                generateTimeOptions={generateTimeOptions}
              />
            )}
            {deliveryOption === "delivery" && (
              <DeliveryDetails
                deliveryDetails={deliveryDetails}
                handleDeliveryDetailsChange={(e) =>
                  setDeliveryDetails({ ...deliveryDetails, [e.target.name]: e.target.value })
                }
              />
            )}
            <BillingDetails
              billingDetails={billingDetails}
              handleBillingDetailsChange={(e) =>
                setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value })
              }
            />
            <h5 className="text-dark fw-bold fs-5 mt-4">Información de la tarjeta</h5>
            <div className="p-3 border rounded" style={{ backgroundColor: "#f9f9f9" }}>
              <CardElement options={cardElementOptions} />
            </div>
            <button type="submit" className="btn btn-success mt-3 mb-5 px-2 py-2" disabled={!stripe || loading}>
              {loading ? "Procesando..." : "Confirmar Pedido"}
            </button>
          </div>
          <div className="col-md-6">
            <OrderSummary cart={cart} subtotal={subtotal} />
          </div>
        </div>
      </form>
    </div>
  );
};

const WrapperCheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutPage />
  </Elements>
);

export default WrapperCheckoutPage;
