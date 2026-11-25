# 📦 Taller práctico N° 6: Sincronización en Tiempo Real con Firestore (`onSnapshot`)

## 🎬 Video Entregable

- **Ver video en Google Drive:** [Video Entregable — Sincronización en Tiempo Real](https://drive.google.com/file/d/1sXIDZN8-6BQh9pZaUGnKEjmTa9KS-pHy/view?usp=sharing)
- **Archivo con el enlace:** [`Entregable/video entregable.txt`](Entregable/video%20entregable.txt)

> Actividad académica que evoluciona el CRUD (Create, Read, Update, Delete) en el sistema de inventario de productos implementando **sincronización en tiempo real** sobre **Cloud Firestore**, utilizando `onSnapshot` en lugar de la lectura puntual con `getDocs`, junto con las operaciones de escritura (`addDoc`), actualización (`updateDoc`) y eliminación (`deleteDoc`) en una aplicación React + TypeScript + Vite.

## 🎯 Objetivo

Implementar la escucha en tiempo real de la colección `productos` en Firestore manteniendo el flujo unidireccional de datos, el tipado estricto en TypeScript y la limpieza automática de suscripciones al desmontar el componente:

- **CREATE:** Capturar datos del formulario y persistirlos como documentos en Firestore con `addDoc`.
- **READ (Tiempo Real):** Suscribirse a la colección `productos` al montar el componente con `onSnapshot` (`escucharProductos`), actualizando la UI automáticamente ante cualquier cambio y desuscribiéndose al desmontar (`unsubscribe`).
- **UPDATE:** Precargar datos de un producto existente en el formulario y actualizar el documento en Firestore con `updateDoc`.
- **DELETE:** Eliminar un documento específico mediante su `id` con `deleteDoc`, reflejándose automáticamente en la tabla gracias a `onSnapshot`.

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
│                   FLUJO READ (TIEMPO REAL)                           │
│                                                                      │
│  Firestore 🔥  ──► onSnapshot() ──► escucharProductos()              │
│  (colección:       (listener)       (retorna unsubscribe)            │
│   "productos")                                                       │
│        │                                                             │
│        └──► ProductoLista (useEffect actualiza estado al instante)   │
│             └──► cleanup: return () => unsubscribe()                 │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                        FLUJO UPDATE                                  │
│                                                                      │
│  ProductoLista ──► [Editar] ──► ProductoForm ──► actualizarProducto() │
│  (selección)       (callback)   (modo edición)   (servicio)          │
│                                                                      │
│  actualizarProducto() ──► doc() + updateDoc() ──► Firestore 🔥       │
│  (servicio)                (SDK)                   (onSnapshot       │
│                                                     notifica UI)     │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                        FLUJO DELETE                                  │
│                                                                      │
│  ProductoLista ──► [Eliminar] ──► handleEliminar()                   │
│  (tabla UI)        (evento click)  (try / catch)                     │
│                                                                      │
│  eliminarProducto() ──► doc() + deleteDoc() ──► Firestore 🔥         │
│  (servicio)               (SDK)                  (onSnapshot         │
│                                                   actualiza tabla)   │
└──────────────────────────────────────────────────────────────────────┘
```

## 📁 Estructura del Proyecto

```
taller6-firebase-sincronización/
├── Entregable/
│   └── video entregable.txt              # Enlace al video entregable en Google Drive
├── public/
│   └── image.png                         # Favicon personalizado
├── src/
│   ├── components/
│   │   ├── ProductoForm.tsx              # Formulario dual CREATE / UPDATE
│   │   ├── ProductoForm.css
│   │   ├── ProductoLista.tsx             # Lista en tiempo real con onSnapshot y [Editar] / [Eliminar]
│   │   └── ProductoLista.css
│   ├── services/
│   │   └── productoService.ts            # Lógica Firestore (addDoc / onSnapshot / updateDoc / deleteDoc)
│   ├── firebase.ts                       # Inicialización de Firebase
│   ├── App.tsx                           # Componente raíz y orquestación
│   ├── App.css
│   ├── index.css                         # Tokens de diseño y reset global
│   └── main.tsx                          # Entry point React
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
git clone https://github.com/luisAristeguieta/firebase_6.git
cd firebase_6
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

## 🎥 Entregables

- **Video de demostración (Google Drive):** https://drive.google.com/file/d/1sXIDZN8-6BQh9pZaUGnKEjmTa9KS-pHy/view?usp=sharing
- **Archivo de respaldo:** [`Entregable/video entregable.txt`](Entregable/video%20entregable.txt)

## 📋 Componentes Principales

### `ProductoForm`
Formulario interactivo con **modo dual**:
- **Modo CREATE** (`productoSeleccionado === null`): campos listos para nuevo registro, botón "Guardar", ejecuta `crearProducto()`.
- **Modo UPDATE** (`productoSeleccionado !== null`): precarga automática de datos, botón "Actualizar" y opción de "Cancelar", ejecuta `actualizarProducto()`.

### `ProductoLista`
Lista interactiva sincronizada en tiempo real:
- Al montarse (`useEffect`), se suscribe a Firestore con `escucharProductos()` y limpia la suscripción al desmontar (`return () => unsubscribe()`).
- Muestra columnas **Producto** (con ID resumido), **Precio**, **Stock** y **Acciones**.
- Contiene los botones **Editar** (activa edición en el formulario) y **Eliminar** (ejecuta `handleEliminar(id)`).
- Cualquier cambio (`CREATE`, `UPDATE`, `DELETE` o edición directa desde Firebase Console) se refleja automáticamente en pantalla sin recargar la página.

### `productoService.ts`
Módulo de servicio que centraliza la interacción directa con Cloud Firestore:
- `crearProducto(nombre, precio, stock)` → `addDoc()`
- `escucharProductos(onProductos, onError?)` → `onSnapshot()` (retorna `Unsubscribe`)
- `obtenerProductos()` → `getDocs()`
- `actualizarProducto(id, datos)` → `doc()` + `updateDoc()`
- `eliminarProducto(id)` → `doc()` + `deleteDoc()`
