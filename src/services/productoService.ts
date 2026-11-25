import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    updateDoc,
    type Unsubscribe,
} from "firebase/firestore";
import { db } from "../firebase";

export interface NuevoProducto {
    nombre: string;
    precio: number;
    stock: number;
}

export interface Producto extends NuevoProducto {
    id: string;
}

const PRODUCTOS_COLLECTION = "productos";

export const crearProducto = async (
    nombre: string,
    precio: number,
    stock: number
): Promise<string> => {
    const nuevoProducto: NuevoProducto = {
        nombre,
        precio,
        stock,
    };

    const docRef = await addDoc(
        collection(db, PRODUCTOS_COLLECTION),
        nuevoProducto
    );

    return docRef.id;
};

export const obtenerProductos = async (): Promise<Producto[]> => {
    const querySnapshot = await getDocs(collection(db, PRODUCTOS_COLLECTION));

    const productos = querySnapshot.docs.map((docFirestore) => ({
        id: docFirestore.id,
        ...docFirestore.data()
    })) as Producto[];

    return productos;
};

export const escucharProductos = (
    onProductos: (productos: Producto[]) => void,
    onError?: (error: Error) => void
): Unsubscribe => {
    return onSnapshot(
        collection(db, PRODUCTOS_COLLECTION),
        (querySnapshot) => {
            const productos = querySnapshot.docs.map((docFirestore) => ({
                id: docFirestore.id,
                ...docFirestore.data(),
            })) as Producto[];

            onProductos(productos);
        },
        (error) => {
            console.error("Error al escuchar productos:", error);
            onError?.(error);
        }
    );
};

export const actualizarProducto = async (
    id: string,
    datos: Partial<NuevoProducto>
): Promise<void> => {
    const productoRef = doc(db, PRODUCTOS_COLLECTION, id);
    await updateDoc(productoRef, datos);
};

export const eliminarProducto = async (id: string): Promise<void> => {
    const productoRef = doc(db, PRODUCTOS_COLLECTION, id);
    await deleteDoc(productoRef);
};