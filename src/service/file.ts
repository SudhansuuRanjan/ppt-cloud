import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export const uploadFile = async (file: File, name:string, path ="") => {
    try {
        const storageRef = ref(storage, path + name);
        const res = await uploadBytes(storageRef, file);
        return res;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const downloadFile = async (fileName: string) => {
    try {
        const storageRef = ref(storage, fileName);

        try {
            const res = await getDownloadURL(storageRef);
            return res;
        } catch (error: any) {
            switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    return "File doesn't exist";
                    break;
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    return "User doesn't have permission to access the object";
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    return "User canceled the upload";
                    break;

                // ...

                case 'storage/unknown':
                    return "Unknown error occurred, inspect the server response";
                    // Unknown error occurred, inspect the server response
                    break;
            }
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const deleteFile = async (fileName: string) => {
    try {
        const storageRef = ref(storage, fileName);
        await deleteObject(storageRef);
    } catch (error: any) {
        throw new Error(error.message);
    }
}