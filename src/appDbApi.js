import { db, storage, } from "../firebase.config"
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { doc, updateDoc } from "firebase/firestore";


export async function uploadImage(file, path, caller) {
    if (file) {
        const imageRef = ref(storage, path)
        const snap = await uploadBytes(imageRef, file)
        return await getDownloadURL(snap.ref).then(caller)
    }
}

export async function deleteFile(path, caller) {
    const fileRef = ref(storage, path)
    return await deleteObject(fileRef).then(caller)
}
