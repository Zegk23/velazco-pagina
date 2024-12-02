import "../stylesPages/StyleContactPage.css";
import useFormularioContacto from "../hooks/useFormularioContacto";

export default function ContactPage() {
  const { formData, handleChange, handleSubmit } = useFormularioContacto();

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-dark">Formulario de Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="nombre" className="form-label fw-bold text-dark">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            placeholder="Ingresa tu nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="correo" className="form-label fw-bold text-dark">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="correo"
            placeholder="Ingresa tu correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="telefono" className="form-label fw-bold text-dark">Teléfono</label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            placeholder="Ingresa tu número de teléfono"
            value={formData.telefono}
            onChange={handleChange}
            maxLength={9}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="mensaje" className="form-label fw-bold text-dark">Mensaje</label>
          <textarea
            className="form-control"
            id="mensaje"
            rows="4"
            placeholder="Escribe tu mensaje aquí"
            value={formData.mensaje}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary text-light btn-block" id="btn-formulario">
          Enviar
        </button>
      </form>
    </div>
  );
}
