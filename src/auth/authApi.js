import { addDoc, collection, doc, documentId, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { db } from "../../firebase.config";
import { docToObject, snapToObject } from "../appApi";


const userRef = id => doc(db, 'users', id)
const relationRef = id => doc(db, 'relations', id)
const usersRef = collection(db, 'users')

export async function getUserProfile(id) {
    if (!id) return
    const doc = await getDoc(userRef(id))
    return docToObject(doc)
}

export function listenUserProfile(id, caller) {
    if (!id || !caller) return;
    return onSnapshot(doc(db, 'users', id), user => caller(docToObject(user)))
}

export async function createUser(data) {
    const user = await addDoc(usersRef, {
        ...data,
        dateAdded: new Date().toDateString(),
        timestamp: serverTimestamp()
    })
    return user
}

export async function createRelations(userId) {
    return await setDoc(relationRef(userId), {
        followers: [], following: []
    })
}

export async function createUserCred(user, data) {
    const checkUser = await getDoc(userRef(user?.uid))
    if (!checkUser?.data()) {
        console.log('create a user cred');
        const res = await setDoc(userRef(user?.uid), {
            userName: data?.username,
            displayName: user?.displayName || '',
            email: user?.email || '',
            photoURL: user?.photoURL || '',
            emailVerified: user?.emailVerified || '',
            phoneNumber: user?.phoneNumber || '',
            timestamp: serverTimestamp(),
            dateAdded: new Date().toDateString()
        })
        createRelations(user?.uid)
        return res;
    }
}

export async function getAllUsers() {
    const snap = await getDocs(usersRef)
    return snapToObject(snap)
}

export async function getAllUsersIn(array) {
    if (!array || array?.length <= 0) return null;
    const q = query(usersRef, where(documentId(), 'in', array))
    const snap = await getDocs(q)
    return snapToObject(snap)
}

