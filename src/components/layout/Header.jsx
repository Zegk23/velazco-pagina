import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate} from "react-router-dom";
import "../../stylesComponent/StyleHeader.css";
import CarritoDeCompras from "../CarritoDeCompras";

export default function Header() {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const cerrarCarrito = () => {
    setMostrarCarrito(false); 
  };
  const navigate = useNavigate();

  return (
    <>
      <header>
        {/* Barra Naranja de Arriba */}
        <div className="container-fluid py-2 text-light fw-semibold" style={{ background: "#E65032" }}>
          <div className="row">
            <div className="col-6 text-start">
              {/* SVG Telefono */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-telephone-fill mb-1 ms-3"
                viewBox="0 0 16 16"
                id="iconos-telefono"
              >
                <path
                  fillRule="evenodd"
                  d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                />
              </svg>
              <span className="ms-3">(056) 221587</span>

              {/* SVG Facebook */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-facebook mb-1 ms-3"
                viewBox="0 0 16 16"
                id="iconos-facebook"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
              </svg>
            </div>
            <div className="col-6 text-end">
              {/* Svg Delivery */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-truck"
                viewBox="0 0 16 16"
                id="iconos-delivery"
              >
                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
              </svg>
              <span className="me-3 ms-2">Delivery</span>
            </div>
          </div>
        </div>

        <nav className="navbar navbar-expand-lg navbar-dark bg-white">
          <div className="container-fluid justify-content-between" id="divHeader">
            {/* Logo */}
            <Link to={"/"} className="mx-4">
              <img src={logo} alt="Logo" className="logo" />
            </Link>

            {/* Toggle Button */}
            <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Sidebar */}
            <div className="sidebar offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              {/* Sidebar header */}
              <div className="offcanvas-header text-white border-bottom">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menú</h5>
                <button type="button" className="btn-close btn-close-white shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>

              {/* Sidebar body */}
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-center flex-grow-1 px-3 pe-5">
                  <li className="nav-item mx-2">
                    <Link to={"/"}>Inicio</Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link to={"/productos"}>Productos</Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link to={"/contacto"}>Contacto</Link>
                  </li>
                </ul>
                {/* Login / Sign up  & Cart */}
                <div className="d-flex justify-content-center align-items-center gap-3 mx-4">
                  {/* Icono Perfil */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="black"
                    className="bi bi-person"
                    id="iconos-perfil-bolsa"
                    viewBox="0 0 16 16"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate('/usuario')}
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>

                  {/* Icono Carrito */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="black"
                    className="bi bi-cart4"
                    viewBox="0 0 16 16"
                    id="iconos-perfil-bolsa"
                    style={{ cursor: "pointer" }}
                    onClick={() => setMostrarCarrito(!mostrarCarrito)} 
                  >
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <CarritoDeCompras mostrarCarrito={mostrarCarrito} cerrarCarrito={cerrarCarrito} />
    </>
  );
}