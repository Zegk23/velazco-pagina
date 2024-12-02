import React from "react";
import "../stylesPages/StyleHomePage.css";
import Carrusel from "../components/Carrusel";
import ProductosDestacados from "../components/ProductosDestacados";

export default function HomePage() {
  return (
    <>
      <Carrusel />
      <ProductosDestacados />

      {/* Sección de Nosotros */}
      <div className="section-nosotros">
        <div className="about-section">
          <div className="inner-container">
            <h1 className="text-center">Nuestra Historia</h1>
            <p className="text">
              La Panadería y Pastelería Velazco, fundada en 1936 en Ica por Don
              José Velazco, ha preservado la tradición y calidad en cada uno de
              sus productos. Lo que comenzó como un pequeño negocio familiar se
              ha convertido en un referente de la panadería artesanal en la
              región, manteniendo vivas las recetas originales y deleitando a
              generaciones de familias. Hoy, Velazco continúa expandiéndose sin
              perder su esencia, ofreciendo dulces y panes que combinan historia
              y sabor auténtico
            </p>
          </div>
        </div>
      </div>

      {/* Cards de Misión, Visión y Valores */}
      <div className="container my-5">
        <div className="row g-4 justify-content-center align-items-stretch">
          <div className="col-lg-4 col-md-6 col-sm-12 d-flex">
            <div className="card text-center custom-card mx-auto">
              <div className="card-body">
                <h1 className="titulo-card">Nuestra Misión</h1>
                <p className="card-texto">
                  Ofrecer los más exquisitos dulces y pasteles llenos de
                  tradición y sabor único.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 d-flex">
            <div className="card text-center custom-card mx-auto">
              <div className="card-body">
                <h1 className="titulo-card">Nuestra Visión</h1>
                <p className="card-texto">
                  Continuar siendo la empresa pastelera líder en Ica y
                  expandirnos a nivel nacional.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 d-flex">
            <div className="card text-center custom-card mx-auto">
              <div className="card-body">
                <h1 className="titulo-card">Nuestros Valores</h1>
                <p className="card-texto">
                  Compromiso, integridad y pasión por la calidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Mapa */}
      <div className="container my-5 text-center">
        <h2 className="text-center text-dark">Encuéntranos Aquí</h2>
        <div className="map-container mt-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7740.4354120853295!2d-75.73005606744452!3d-14.064317803853925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9110e2bcfcbb2557%3A0xbb2a3f7870d205ff!2sDulcer%C3%ADa%20y%20Pasteler%C3%ADa%20Velazco!5e0!3m2!1ses-419!2spe!4v1729714057601!5m2!1ses-419!2spe"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="responsive-iframe"
            title="Ubicación en Google Maps"
          ></iframe>
        </div>
      </div>
    </>
  );
}
