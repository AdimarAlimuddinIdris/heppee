import { addDoc, arrayUnion, collection, doc, getDoc, arrayRemove, onSnapshot, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase.config";
import { docToObject, snapToObject } from "../../src/appApi";


const notifsRef = collection(db, 'notif')
const notifRef = id => doc(db, 'notif', id)
const userRef = id => doc(db, 'users', id)

export function listenNotification(userId, caller = () => { }) {
    const q = query(notifsRef, where('to', '==', userId))
    return onSnapshot(q, snap => {
        caller(snapToObject(snap))
    })
}


export async function addNotif(data, user) {
    if (!user?.watchers?.find(s => s == data?.to)) {
        return await addDoc(notifsRef, {
            ...data,
            read: false,
            addedAt: new Date().toDateString(),
            timestamp: serverTimestamp()
        })
    }
}

export async function watchUser(from, to) {
    await updateDoc(userRef(to), {
        watchers: arrayUnion(from),
    })
    // alert('watch')
}

export async function unWatchUser(from, to) {
    await updateDoc(userRef(to), {
        watchers: arrayRemove(from),
    })
    // alert('unWatch')
}

export async function readNotif(id) {
    return await updateDoc(notifRef(id), {
        read: true,
        readAt: new Date().toDateString()
    })
}

