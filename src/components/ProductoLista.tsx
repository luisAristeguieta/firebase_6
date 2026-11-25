import { useEffect, useState } from "react";
import { eliminarProducto, escucharProductos, type Producto } from "../services/productoService";
import "./ProductoLista.css";

interface ProductoListaProps {
    onSeleccionarProducto?: (producto: Producto) => void;
}

export function ProductoLista({ onSeleccionarProducto }: ProductoListaProps) {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const unsubscribe = escucharProductos(
            (lista) => {
                setProductos(lista);
                setCargando(false);
            },
            () => {
                setCargando(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const handleEliminar = async (id: string) => {
        try {
            await eliminarProducto(id);
            alert("Producto eliminado correctamente.");
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            alert("Ocurrió un error al eliminar el producto.");
        }
    };

    if (cargando) {
        return (
            <div className="lista-card">
                <div className="lista-loading">
                    <span className="lista-loading__dot"></span>
                    Cargando productos...
                </div>
            </div>
        );
    }

    return (
        <div className="lista-card">
            <div className="lista-card__header">
                <h2 className="lista-card__title">Productos</h2>
                <span className="lista-card__count">{productos.length}</span>
            </div>

            {productos.length === 0 ? (
                <p className="lista-empty">No hay productos registrados.</p>
            ) : (
                <table className="lista-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td className="product-name">
                                    {producto.nombre}
                                    <span className="product-id">{producto.id.slice(0, 6)}</span>
                                </td>
                                <td className="product-price">${producto.precio}</td>
                                <td>
                                    <span
                                        className={`stock-badge ${
                                            producto.stock > 0
                                                ? "stock-badge--available"
                                                : "stock-badge--empty"
                                        }`}
                                    >
                                        <span className="stock-badge__dot"></span>
                                        {producto.stock}
                                    </span>
                                </td>
                                <td>
                                    <div className="acciones-td">
                                        <button
                                            className="btn-editar"
                                            onClick={() => onSeleccionarProducto?.(producto)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn-eliminar"
                                            onClick={() => handleEliminar(producto.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
