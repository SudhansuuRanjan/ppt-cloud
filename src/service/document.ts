import { db } from "../firebase";
import { doc, getDoc, addDoc, setDoc, deleteDoc, getDocs, collection, query, where, DocumentData, orderBy } from "firebase/firestore";


export const getDocument = async (collectionId: string, documentId: string) => {
    try {
        const docRef = doc(db, collectionId, documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            throw new Error("No such document exists");
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getDocuments = async (collectionId: string) => {
    try {
        const q = query(collection(db, collectionId));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.forEach((doc) => doc.data());
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getPPTByUserId = async (collectionId: string, userId: string): Promise<DocumentData[]> => {
    try {
        const q = query(collection(db, collectionId), where("uid", "==", userId), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        let data : DocumentData[] = [];
        querySnapshot.forEach((doc) => {
            let item = {
                id: doc.id,
                ...doc.data()
            }
            data.push(item);
        });
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }

}

export const addDocument = async (collectionId: string, data: any) => {
    try {
        const collectionRef = collection(db, collectionId);
        const res = await addDoc(collectionRef, data);
        return res;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const updateDocument = async (collectionId: string, documentId: string, data: any) => {
    try {
        const docRef = doc(db, collectionId, documentId);
        await setDoc(docRef, data);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const deleteDocument = async (collectionId: string, documentId: string) => {
    try {
        const docRef = doc(db, collectionId, documentId);
        await deleteDoc(docRef);
    } catch (error: any) {
        throw new Error(error.message);
    }
}
