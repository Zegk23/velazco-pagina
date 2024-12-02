import { useEffect, useState } from "react";
import productoDestacadoService from "../service/ProductosService";

export default function useProductosDestacados() {
    const [productosDestacados, setProductosDestacados] = useState([]);

    useEffect(() => {
        productoDestacadoService.obtenerProductosDestacados()
            .then(response => {
                setProductosDestacados(response.data);
            })
            .catch(error => {
                console.error("Error al obtener los productos más vendidos:", error);
            });
    }, []);

    return productosDestacados;
}
