import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
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