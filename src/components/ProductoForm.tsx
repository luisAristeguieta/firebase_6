import { useEffect, useState, type SyntheticEvent } from "react";
import { crearProducto, actualizarProducto, type Producto } from "../services/productoService";
import "./ProductoForm.css";

interface ProductoFormProps {
    productoSeleccionado?: Producto | null;
    onProductoGuardado?: () => void;
    onCancelarEdicion?: () => void;
}

export function ProductoForm({ productoSeleccionado, onProductoGuardado, onCancelarEdicion }: ProductoFormProps) {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [guardando, setGuardando] = useState(false);

    const modoEdicion = productoSeleccionado !== null && productoSeleccionado !== undefined;

    useEffect(() => {
        if (productoSeleccionado) {
            setNombre(productoSeleccionado.nombre);
            setPrecio(String(productoSeleccionado.precio));
            setStock(String(productoSeleccionado.stock));
        } else {
            setNombre("");
            setPrecio("");
            setStock("");
        }
    }, [productoSeleccionado]);

    const limpiarFormulario = () => {
        setNombre("");
        setPrecio("");
        setStock("");
    };

    const guardarProducto = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();

        if (!nombre.trim() || !precio || !stock) {
            alert("Por favor completa todos los campos.");
            return;
        }

        try {
            setGuardando(true);
            const nombreLimpio = nombre.trim();

            if (modoEdicion) {
                await actualizarProducto(productoSeleccionado.id, {
                    nombre: nombreLimpio,
                    precio: Number(precio),
                    stock: Number(stock),
                });
                console.log("Producto actualizado:", productoSeleccionado.id);
                alert(`Producto "${nombreLimpio}" actualizado correctamente.`);
            } else {
                const productoId = await crearProducto(
                    nombreLimpio,
                    Number(precio),
                    Number(stock)
                );
                console.log("Producto creado:", productoId);
                alert(`Producto "${nombreLimpio}" guardado correctamente.`);
            }

            limpiarFormulario();
            onProductoGuardado?.();
        } catch (error) {
            console.error("Error al guardar producto:", error);
            alert("Ocurrió un error al guardar el producto en Firestore.");
        } finally {
            setGuardando(false);
        }
    };

    const cancelarEdicion = () => {
        limpiarFormulario();
        onCancelarEdicion?.();
    };

    return (
        <div className="form-wrapper">
            <div className={`form-card ${modoEdicion ? "form-card--editing" : ""}`}>
                <h2 className="form-card__title">
                    {modoEdicion ? "Editar Producto" : "Registrar Producto"}
                </h2>
                <form onSubmit={guardarProducto}>
                    <div className="form-field">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            id="nombre"
                            type="text"
                            placeholder="Ej. Cuaderno A5"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="precio">Precio ($)</label>
                        <input
                            id="precio"
                            type="number"
                            placeholder="0.00"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="stock">Stock</label>
                        <input
                            id="stock"
                            type="number"
                            placeholder="0"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="form-submit" disabled={guardando}>
                            {guardando
                                ? "Guardando..."
                                : modoEdicion
                                    ? "Actualizar"
                                    : "Guardar"}
                        </button>
                        {modoEdicion && (
                            <button
                                type="button"
                                className="form-cancel"
                                onClick={cancelarEdicion}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
