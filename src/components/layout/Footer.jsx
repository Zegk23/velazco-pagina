import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "../../stylesComponent/styleFooter.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Información de Contacto */}
        <div className="footer-section">
          <h5 className="footer-title">Información de Contacto</h5>
          <p>Av. Grau 199, Ica, Perú</p>
          <p>Telf. (056) 221587</p>
          <p>velazcoCorreo@gmail.com</p>
          <div className="social-icons">
            <FaFacebook className="icon" />
            <FaInstagram className="icon" />
            <FaTwitter className="icon" />
          </div>
        </div>

        {/* Horario de Atención */}
        <div className="footer-section">
          <h5 className="footer-title">Horario de Atención</h5>
          <p>Lunes a Viernes: 8:00 am - 8:00 pm</p>
          <p>Sábado y Domingo: 9:00 am - 5:00 pm</p>
        </div>

        {/* Política de Privacidad */}
        <div className="footer-section">
          <h5 className="footer-title">Política de Privacidad y Términos de Uso</h5>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; 2024 Dulcería y Pastelería Velazco. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
