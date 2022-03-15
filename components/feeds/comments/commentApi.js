import { addDoc, collection, deleteDoc, doc, onSnapshot, query, arrayRemove, arrayUnion, serverTimestamp, updateDoc, where, orderBy } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { snapToObject } from "../../../src/appApi";

const commentsRef = collection(db, 'comments')
const commentRef = id => doc(db, 'comments', id)

export function listenComment(postId, caller = () => { }) {
    const q = query(commentsRef, where('postId', '==', postId), orderBy('timeStamp', 'asc'))
    return onSnapshot(q, snap => caller(snapToObject(snap)))
}

// POST A COMMENT ---------------------------------------------------------------
export async function postComment(data, userId, postId) {
    return await addDoc(commentsRef, {
        ...data,
        userId, postId,
        likes: [], loves: [],
        dateAdded: new Date().toDateString(),
        timeStamp: serverTimestamp()
    })
}

// LIKE A COMMENT --------------------------------------------------------------
export async function likeComment(commentId, authId, likes) {
    if (likes && likes.find(s => s == authId)) {
        updateDoc(commentRef(commentId), {
            likes: arrayRemove(authId)
        })
    } else {
        updateDoc(commentRef(commentId), {
            likes: arrayUnion(authId),
            loves: arrayRemove(authId),
        })
    }
}

// LOVE A COMMENT --------------------------------------------------------------
export async function LoveComment(commentId, authId, loves) {
    if (loves && loves.find(s => s == authId)) {
        updateDoc(commentRef(commentId), {
            loves: arrayRemove(authId)
        })
    } else {
        updateDoc(commentRef(commentId), {
            loves: arrayUnion(authId),
            likes: arrayRemove(authId),
        })
    }
}

// DELETE A COMMENT -------------------------------------------------------------
export async function deleteComment(commentId) {
    return await deleteDoc(commentRef(commentId))
}

// UPDATE A COMMENT ------------------------------------------------------------
export async function updateComment(commentId, data) {
    if (!commentId || !data) return
    updateDoc(commentRef(commentId), {
        ...data,
        updatedAt: new Date().toDateString(),
    })
}


