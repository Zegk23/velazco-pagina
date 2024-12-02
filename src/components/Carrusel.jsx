import React from "react";
import "../stylesComponent/StyleCarrusel.css";
import { Link } from "react-router-dom";

export default function Carrusel() {
  return (
    <div className="container-fluid bg-white">
      <div
        id="hero-carousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#hero-carousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#hero-carousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#hero-carousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active c-item">
            <img
              src="https://www.colbake.com/wp-content/uploads/2019/01/tradicion-maquinaria-panaderia.jpg"
              className="d-block w-100 c-img"
              alt="Slide 1"
            />
            <div className="carousel-caption top-0 mt-4">
              <p
                className="text-center fs-3 mt-5 text-dark fw-bold fs-1"
                id="parrafo-texto"
              >
                Descubre el <span className="text-destacado">Auténtico Sabor</span> de la Tradición.
              </p>
              <p
                className="display-1 fw-bolder text-capitalize text-dark fs-3"
                id="parrafo-texto"
              >
                Disfruta Cada Bocado con{" "}
                <span className="text-destacado">Ingredientes de Calidad</span>
              </p>
              <Link to={"/productos"}>
                <button
                  className="btn btn-dark px-4 py-2 fs-5 mt-5"
                  id="botonCarrusel"
                >
                  Ver Productos
                </button>
              </Link>
            </div>
          </div>

          <div className="carousel-item c-item">
            <img
              src="https://img.freepik.com/fotos-premium/panaderia-pan-hd-8k-papel-pared-imagen-fotografica-stock_1066384-343.jpg"
              className="d-block w-100 c-img"
              alt="Slide 2"
            />
            <div className="carousel-caption top-0 mt-4">
              <p
                className="text-center fs-3 mt-5 text-dark fw-bold fs-1"
                id="parrafo-texto"
              >
                Disfruta del <span className="text-destacado">Sabor Artesanal</span> en Cada Mordisco.
              </p>
              <p
                className="display-1 fw-bolder text-capitalize text-dark fs-3"
                id="parrafo-texto"
              >
                Disfruta Cada Bocado con{" "}
                <span className="text-destacado">Ingredientes de Calidad</span>
              </p>
              <Link to={"/productos"}>
                <button
                  className="btn btn-dark px-4 py-2 fs-5 mt-5"
                  id="botonCarrusel"
                >
                  Ver Productos
                </button>
              </Link>
            </div>
          </div>

          <div className="carousel-item c-item">
            <img
              src="https://img.freepik.com/premium-photo/bakery-items-background-hd-8k-wallpaper-stock-photographic-image_1064748-71.jpg"
              className="d-block w-100 c-img"
              alt="Slide 3"
            />
            <div className="carousel-caption top-0 mt-4">
              <p
                className="text-center fs-3 mt-5 text-dark fw-bold fs-1"
                id="parrafo-texto"
              >
                Siente la <span className="text-destacado">Calidad y Frescura</span> en Cada Bocado.
              </p>
              <p
                className="display-1 fw-bolder text-capitalize text-dark fs-3"
                id="parrafo-texto"
              >
                Disfruta Cada Bocado con{" "}
                <span className="text-destacado">Ingredientes de Calidad</span>
              </p>
              <Link to={"/productos"}>
                <button
                  className="btn btn-dark px-4 py-2 fs-5 mt-5"
                  id="botonCarrusel"
                >
                  Ver Productos
                </button>
              </Link>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#hero-carousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#hero-carousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
