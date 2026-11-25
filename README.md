# 📦 Taller práctico N° 5: Eliminar documentos en Firestore

> Actividad académica que completa el ciclo CRUD (Create, Read, Update, Delete) en el sistema de inventario de productos implementando la operación **DELETE** sobre **Cloud Firestore**, utilizando `deleteDoc` junto con las operaciones existentes de escritura (`addDoc`), lectura (`getDocs`) y actualización (`updateDoc`) en una aplicación React + TypeScript + Vite.

## 🎯 Objetivo

Implementar la operación de eliminación de documentos en Firestore manteniendo el flujo unidireccional de datos, el tipado estricto en TypeScript y la sincronización en tiempo real de la interfaz de usuario:

- **CREATE:** Capturar datos del formulario y persistirlos como documentos en Firestore con `addDoc`.
- **READ:** Consultar la colección `productos` al montar el componente y renderizar la lista en la UI con `getDocs`.
- **UPDATE:** Precargar datos de un producto existente en el formulario y actualizar el documento en Firestore con `updateDoc`.
- **DELETE:** Eliminar un documento específico mediante su `id` con `deleteDoc` y removerlo inmediatamente del estado local de la lista.

## 📐 Diagrama de Flujo

```
┌──────────────────────────────────────────────────────────────────────┐
│                        FLUJO CREATE                                  │
│                                                                      │
│  ProductoForm ──► crearProducto() ──► addDoc() ──► Firestore 🔥      │
│  (formulario)     (servicio)          (SDK)        (colección:       │
│                                                     "productos")     │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                         FLUJO READ                                   │
│                                                                      │
│  Firestore 🔥  ──► getDocs() ──► obtenerProductos() ──► ProductoLista│
│  (colección:       (SDK)         (servicio)              (tabla UI)  │
│   "productos")                                                       │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                        FLUJO UPDATE                                  │
│                                                                      │
│  ProductoLista ──► [Editar] ──► ProductoForm ──► actualizarProducto() │
│  (selección)       (callback)   (modo edición)   (servicio)          │
│                                                                      │
│  actualizarProducto() ──► doc() + updateDoc() ──► Firestore 🔥       │
│  (servicio)                (SDK)                   (documento        │
│                                                     actualizado)     │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                        FLUJO DELETE                                  │
│                                                                      │
│  ProductoLista ──► [Eliminar] ──► handleEliminar()                   │
│  (tabla UI)        (evento click)  (try / catch)                     │
│                                                                      │
│  eliminarProducto() ──► doc() + deleteDoc() ──► Firestore 🔥         │
│  (servicio)               (SDK)                  (documento          │
│                                                   eliminado)         │
│                                                                      │
│  setProductos() ──► .filter(...) ──► UI actualizada al instante      │
└──────────────────────────────────────────────────────────────────────┘
```

## 📁 Estructura del Proyecto

```
taller5-firebase-update/
├── Entregable/
│   ├── Vista console actual.PNG          # Colección en Firestore antes de eliminar
│   ├── Producto eliminado web.PNG        # UI con producto eliminado de la lista
│   └── Console Producto Eliminado.PNG    # Colección en Firestore con documento eliminado
├── public/
│   └── image.png                         # Favicon personalizado
├── src/
│   ├── components/
│   │   ├── ProductoForm.tsx              # Formulario dual CREATE / UPDATE
│   │   ├── ProductoForm.css
│   │   ├── ProductoLista.tsx             # Lista con acciones [Editar] y [Eliminar]
│   │   └── ProductoLista.css
│   ├── services/
│   │   └── productoService.ts            # Lógica Firestore (addDoc / getDocs / updateDoc / deleteDoc)
│   ├── firebase.ts                       # Inicialización de Firebase
│   ├── App.tsx                           # Componente raíz y orquestación
│   ├── App.css
│   ├── index.css                         # Tokens de diseño y reset global
│   └── main.tsx                          # Entry point React
├── DESIGN.md                             # Sistema de diseño visual (Craft Docs)
├── roadmap.md                            # Roadmap de implementación por fases
├── index.html                            # HTML con Google Fonts y favicon
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Tecnologías

| Tecnología | Versión | Rol |
|------------|---------|-----|
| React | 19.x | Librería de UI |
| TypeScript | 6.x | Tipado estático |
| Vite | 8.x | Bundler y dev server |
| Firebase | 13.x | Backend (Cloud Firestore) |

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/luisAristeguieta/firebase_5.git
cd taller5-firebase-update
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las credenciales de tu proyecto Firebase:

```env
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=tu-sender-id
VITE_FIREBASE_APP_ID=tu-app-id
```

> **Nota:** El archivo `src/firebase.ts` inicializa la conexión con Cloud Firestore.

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### 5. Build de producción

```bash
npm run build
```

## 📸 Entregables

| Captura | Descripción |
|---------|-------------|
| ![Vista console actual](Entregable/Vista%20console%20actual.PNG) | Vista de la colección `productos` en Cloud Firestore antes de realizar la eliminación. |
| ![Producto eliminado web](Entregable/Producto%20eliminado%20web.PNG) | Interfaz web tras pulsar **Eliminar**, reflejando la remoción inmediata del elemento en la tabla. |
| ![Console Producto Eliminado](Entregable/Console%20Producto%20Eliminado.PNG) | Consola de Cloud Firestore actualizada, comprobando que el documento fue eliminado definitivamente. |

## 📋 Componentes Principales

### `ProductoForm`
Formulario interactivo con **modo dual**:
- **Modo CREATE** (`productoSeleccionado === null`): campos listos para nuevo registro, botón "Guardar", ejecuta `crearProducto()`.
- **Modo UPDATE** (`productoSeleccionado !== null`): precarga automática de datos, botón "Actualizar" y opción de "Cancelar", ejecuta `actualizarProducto()`.

### `ProductoLista`
Lista interactiva con refresco reactivo:
- Al montarse (`useEffect`), consulta Firestore con `obtenerProductos()`.
- Muestra columnas **Producto** (con ID resumido), **Precio**, **Stock** y **Acciones**.
- Contiene los botones **Editar** (activa edición en el formulario) y **Eliminar** (ejecuta `handleEliminar(id)`).
- `handleEliminar` llama a `eliminarProducto(id)`, actualiza el estado local mediante `.filter(...)` para que el cambio sea instantáneo en pantalla y muestra la respectiva notificación.

### `productoService.ts`
Módulo de servicio que centraliza la interacción directa con Cloud Firestore:
- `crearProducto(nombre, precio, stock)` → `addDoc()`
- `obtenerProductos()` → `getDocs()`
- `actualizarProducto(id, datos)` → `doc()` + `updateDoc()`
- `eliminarProducto(id)` → `doc()` + `deleteDoc()`
