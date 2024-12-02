import React from 'react'
import {Link} from 'react-router-dom'
import "../stylesPages/stylesNotFound.css";
export default function NotFoundPage() {
  return (
    <div className="not-found-container text-center">
      <div className="not-found-text">
        <h1 className="error-code">
          <span className="error-404">404</span> ERROR
        </h1>
        <h2 className="oh-no text-dark">
          OH NO! <span className="okay-text text-dark">Pero, esta bien!</span>
        </h2>
        <p className="description">
          Incluso las personas interesantes se pierden en algún momento, y hoy
          es tu punto. No te preocupes, encontrarás el camino de regreso.
        </p>
        <Link to="/" className="btn btn-home mt-4">
          Volver al Inicio
        </Link>
      </div>
    </div>
  )
}
