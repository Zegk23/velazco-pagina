import { useEffect, useState } from "react";
import ProductosService from "../service/ProductosService";
import { obtenerCategoria } from "../service/CategoriaService";

export default function useProductosYFiltrado() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [precioMin, setPrecioMin] = useState(1);
  const [precioMax, setPrecioMax] = useState(10);
  const [filtroPrecio, setFiltroPrecio] = useState([1, 10]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [orden, setOrden] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 9;

  useEffect(() => {
    const obtenerProductosYCategorias = async () => {
      try {
        const respuestaProductos = await ProductosService.obtenerTodosLosProductos();
        setProductos(respuestaProductos.data);

        const respuestaCategorias = await obtenerCategoria();
        setCategorias(respuestaCategorias.data);
      } catch (error) {
        console.error("Error al obtener los productos o categorías", error);
      }
    };

    obtenerProductosYCategorias();
  }, []);

  const filtrarProductos = () => {
    let productosFiltrados = [...productos]
      .filter(
        (producto) =>
          producto.precio >= filtroPrecio[0] &&
          producto.precio <= filtroPrecio[1]
      )
      .filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
      )
      .filter((producto) => {
        if (!categoriaSeleccionada) return true;
        return producto.categoria.nombre === categoriaSeleccionada;
      });

    if (orden === "bajo-alto") {
      productosFiltrados.sort((a, b) => a.precio - b.precio);
    } else if (orden === "alto-bajo") {
      productosFiltrados.sort((a, b) => b.precio - a.precio);
    }

    return productosFiltrados;
  };

  const productosFiltrados = filtrarProductos();
  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const productosAMostrar = productosFiltrados.slice(
    indiceInicio,
    indiceInicio + productosPorPagina
  );

  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
  };

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  return {
    productosAMostrar,
    productosFiltrados,
    categorias,
    setFiltroPrecio,
    setBusqueda,
    setCategoriaSeleccionada,
    setOrden,
    precioMin,
    precioMax,
    filtroPrecio,
    busqueda,
    categoriaSeleccionada,
    orden,
    paginaActual,
    cambiarPagina,
    totalPaginas,
  };
}
