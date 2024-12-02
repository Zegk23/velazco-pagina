import React, { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const agregarProducto = (producto) => {
    const nuevoCarrito = [...carrito];
    const productoExistente = nuevoCarrito.find(
      (item) => item.id === producto.id
    );
  
    if (!productoExistente && nuevoCarrito.length >= 4) {
      return { success: false, message: "No puedes agregar más de 4 productos distintos al carrito." };
    }
  
    if (productoExistente) {
      // Validar que no se exceda el stock
      if (productoExistente.cantidad + producto.cantidad > producto.stock) {
        return { success: false, message: "No hay suficiente stock disponible." };
      }
  
      // Validar que no se exceda el límite de 10 unidades
      if (productoExistente.cantidad + producto.cantidad > 10) {
        return { success: false, message: "No puedes agregar más de 10 unidades de este producto." };
      }
  
      productoExistente.cantidad += producto.cantidad;
    } else {
      // Validar stock inicial
      if (producto.cantidad > producto.stock) {
        return { success: false, message: "No hay suficiente stock disponible." };
      }
  
      // Validar límite inicial de 10 unidades
      if (producto.cantidad > 10) {
        return { success: false, message: "No puedes agregar más de 10 unidades de este producto." };
      }
  
      nuevoCarrito.push(producto);
    }
  
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    return { success: true, message: "Producto agregado al carrito." };
  };
  
  
  

  const volverARealizarPedido = (productos) => {
    const nuevoCarrito = [...carrito];
    let mensaje = "";
  
    const productosExistentes = nuevoCarrito.map((item) => item.id);
    const nuevosProductos = productos.filter(
      (producto) => !productosExistentes.includes(producto.productoId)
    );
  
    if (nuevosProductos.length + nuevoCarrito.length > 4) {
      return { success: false, message: "No puedes agregar más de 4 productos distintos al carrito." };
    }
  
    productos.forEach((producto) => {
      const productoExistente = nuevoCarrito.find((item) => item.id === producto.productoId);
  
      if (productoExistente) {
        if (productoExistente.cantidad + producto.cantidad > producto.stock) {
          mensaje = "Algunos productos no tienen suficiente stock.";
          return;
        }
  
        if (productoExistente.cantidad + producto.cantidad > 10) {
          mensaje = "No puedes agregar más de 10 unidades de un producto.";
          return;
        }
  
        productoExistente.cantidad += producto.cantidad;
      } else {
        if (producto.cantidad > producto.stock) {
          mensaje = "Algunos productos no tienen suficiente stock.";
          return;
        }
  
        if (producto.cantidad > 10) {
          mensaje = "No puedes agregar más de 10 unidades de un producto.";
          return;
        }
  
        nuevoCarrito.push({
          id: producto.productoId,
          nombre: producto.nombreProducto,
          cantidad: producto.cantidad,
          precio: producto.subtotal / producto.cantidad,
          stock: producto.stock || 100,
          imageUrl: producto.imageUrl,
        });
      }
    });
  
    if (mensaje) {
      return { success: false, message: mensaje };
    }
  
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    return { success: true, message: "Pedido agregado al carrito con éxito." };
  };
  
  


  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        setCarrito,
        agregarProducto,
        vaciarCarrito,
        volverARealizarPedido, // Agregado aquí
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
