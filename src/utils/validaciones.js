// Valida que un campo no contenga caracteres peligrosos para prevenir SQL Injection y XSS
export const esCampoSeguro = (campo) => /^[a-zA-Z0-9\s.,\-@]+$/.test(campo);

// Valida que una URL sea válida (incluyendo localhost y direcciones IP)
export const esURLValida = (url) =>
  /^(https?:\/\/)?((localhost|[\w\-]+\.[\w\-]+)|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/[\w\-]*)*\/?$/.test(url);

// Valida que un texto no contenga etiquetas HTML o scripts para prevenir XSS
export const esTextoSeguro = (texto) => !/<\/?[a-z][\s\S]*>/i.test(texto);

// Valida que un número sea positivo (ejemplo: cantidades o precios)
export const esNumeroPositivo = (numero) => /^[1-9]\d*(\.\d+)?$/.test(numero);

// Valida un código postal (estándar de 5 dígitos)
export const esCodigoPostalValido = (codigoPostal) => /^\d{5}$/.test(codigoPostal);

// Valida que no se incluyan comandos maliciosos (como `;`, `--`, `<`, `>`)
export const esInputSinInyeccion = (input) => !/['";`<>\\]/.test(input);

// Valida que un texto esté entre un rango de caracteres específico
export const esTextoDeLongitudValida = (texto, min = 10, max = 500) =>
  texto.length >= min && texto.length <= max;

// Valida que una fecha esté en formato válido (YYYY-MM-DD)
export const esFechaValida = (fecha) => /^\d{4}-\d{2}-\d{2}$/.test(fecha);

// Valida que no se ingresen espacios al inicio o al final de un texto
export const esTextoSinEspaciosExtremos = (texto) => texto.trim() === texto;

// Valida que un campo no esté vacío (sin solo contener espacios)
export const esCampoNoVacio = (campo) => campo.trim().length > 0;

// Valida que un texto sea alfanumérico (con espacios opcionales)
export const esAlfanumerico = (texto) => /^[a-zA-Z0-9\s]+$/.test(texto);

// Valida que un número de tarjeta sea válido (usando algoritmo de Luhn)
export const esTarjetaCreditoValida = (tarjeta) => {
  const limpiarTarjeta = tarjeta.replace(/\D/g, ""); // Elimina caracteres no numéricos
  let suma = 0;
  let alternar = false;

  for (let i = limpiarTarjeta.length - 1; i >= 0; i--) {
    let digito = parseInt(limpiarTarjeta.charAt(i), 10);
    if (alternar) {
      digito *= 2;
      if (digito > 9) digito -= 9;
    }
    suma += digito;
    alternar = !alternar;
  }
  return suma % 10 === 0;
};

// Valida que un nombre de usuario sea alfanumérico y tenga entre 3 y 15 caracteres
export const esNombreUsuarioValido = (usuario) => /^[a-zA-Z0-9]{3,15}$/.test(usuario);

// Valida que un rango de números sea válido (por ejemplo, edad entre 18 y 99)
export const esRangoValido = (numero, min, max) => numero >= min && numero <= max;

// Escapa caracteres especiales en un texto para prevenir XSS
export const escaparHTML = (texto) =>
  texto.replace(/[&<>"']/g, (caracter) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[caracter])
  );

// Valida que el nombre solo contenga letras y espacios
export const esNombreValido = (nombre) => /^[a-zA-Z\s]+$/.test(nombre);

// Valida el formato de un correo electrónico
export const esCorreoValido = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

// Valida el teléfono para que contenga solo dígitos
export const esTelefonoValido = (telefono) => /^[0-9]+$/.test(telefono);

// Valida que la contraseña tenga al menos 8 caracteres
export const esContrasenaValida = (contrasena) => contrasena.length >= 8;

// Valida que el nombre esté entre 1 y 50 caracteres
export const esNombreValidoFormulario = (nombre) => nombre.length > 0 && nombre.length <= 50;

// Valida el correo en un formulario
export const esCorreoValidoFormulario = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

// Valida que el teléfono tenga exactamente 9 dígitos
export const esTelefonoValidoFormulario = (telefono) => /^\d{9}$/.test(telefono);

// Valida que el mensaje esté entre 1 y 500 caracteres
export const esMensajeValidoFormulario = (mensaje) => mensaje.length > 0 && mensaje.length <= 500;
