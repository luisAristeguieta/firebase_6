import { useState } from 'react'
import './App.css'
import { ProductoForm } from './components/ProductoForm'
import { ProductoLista } from './components/ProductoLista'
import type { Producto } from './services/productoService'

function App() {
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [recargarKey, setRecargarKey] = useState(0);

  const seleccionarProducto = (producto: Producto) => {
    setProductoSeleccionado(producto);
  };

  const handleProductoGuardado = () => {
    setProductoSeleccionado(null);
    setRecargarKey((prev) => prev + 1);
  };

  const handleCancelarEdicion = () => {
    setProductoSeleccionado(null);
  };

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <span className="app-header__tag">Firestore · Cloud Database</span>
        <h1 className="app-header__title">Inventario de Productos</h1>
      </header>

      <main className="app-content">
        <ProductoForm
          productoSeleccionado={productoSeleccionado}
          onProductoGuardado={handleProductoGuardado}
          onCancelarEdicion={handleCancelarEdicion}
        />
        <ProductoLista
          onSeleccionarProducto={seleccionarProducto}
          recargarKey={recargarKey}
        />
      </main>
    </div>
  )
}

export default App
