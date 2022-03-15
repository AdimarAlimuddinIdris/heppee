import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase.config";
import { snapToObject } from "../../src/appApi";

const chatsRef = collection(db, 'chats')
const chatRef = id => doc(db, 'chats', id)
const userRef = id => doc(db, 'users', id)

export async function addChat(from, to, data) {
    const data_ = {
        ...data,
        users: `${from}/${to}`,
        from, to,
        timeAdded: new Date().toDateString(),
        timestamp: serverTimestamp(),
    }
    return await addDoc(chatsRef, data_)
}

export async function deleteAChate(id) {
    return await deleteDoc(chatRef(id))
}

export function listenConver(cId, sId, caller = () => { }) {// cId == currentUserId , sId == selectedUserId
    if (!cId || !sId) return
    const users = [`${cId}/${sId}`, `${sId}/${cId}`]
    const q = query(chatsRef, where('users', 'in', users), orderBy('timestamp', 'asc'))
    return onSnapshot(q, snap => caller(snapToObject(snap)))
}

export function listenChat(from, caller = () => { }) {
    if (!from) return
    const q = query(chatsRef, where('users', 'array-contains', from))
    return onSnapshot(chatsRef, snap => {
        caller(snapToObject(snap))
    })
}



