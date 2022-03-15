import { arrayRemove, arrayUnion, collection, doc, getDoc, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase.config";
import { docToObject } from "../../src/appApi";


const userRef = id => doc(db, 'users', id)
const relationsRef = collection(db, 'relations')
const relationRef = id => doc(db, 'relations', id)

// FOLLOW A USER ------------------------------------------
export async function followUser(follower, following) {
    if (!follower || !following) return null;
    await updateDoc(relationRef(following), {
        followers: arrayUnion(follower)
    })

    await updateDoc(relationRef(follower), {
        followings: arrayUnion(following)
    })
}

// UN FOLLOW A USER ----------------------------------------
export async function unFollowUser(follower, following) {
    if (!follower || !following) return null;
    await updateDoc(relationRef(following), {
        followers: arrayRemove(follower)
    })

    await updateDoc(relationRef(follower), {
        followings: arrayRemove(following)
    })
}

// CHECK FOLLOWING ------------------------------------------
export async function checkFollowing(follower, following) {
    const relations = await getRelations(following)
    var isFollowing = false
    if (relations?.followers?.find(s => s == follower)) {
        isFollowing = true
    } else {
        isFollowing = false
    }
    return {
        relations, isFollowing
    }
}

// GET RELATIONS --------------------------------------------
export async function getRelations(userId) {
    if (!userId) return
    const doc_ = await getDoc(relationRef(userId))
    return docToObject(doc_)
}



