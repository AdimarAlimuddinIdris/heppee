import { addDoc, collection, doc, getDocs, serverTimestamp, updateDoc, arrayUnion, onSnapshot, deleteDoc, arrayRemove, query, where, orderBy } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../firebase.config";
import { docToObject, snapToObject } from "../../src/appApi";
import { deleteFile, uploadImage } from "../../src/appDbApi";


const postsRef = collection(db, 'post')
const postRef = id => doc(db, 'post', id)

const postImagesPath = (post, img, ind) => `posts_images/${post?.userId}/${post?.id}/${img?.name || ind}`

// GET ALL POST-----------------------------------------------------------------
export async function getAllPost() {
    const postsSnap = await getDocs(postsRef, orderBy('timeStamp', 'desc'))
    return snapToObject(postsSnap)
}

// LISTEN TO POST COLLECTION---------------------------------------------------
export async function listenPosts(caller = () => { }) {
    return onSnapshot(postsRef, snap => caller(snapToObject(snap)))
}

// LISTEN TO USER"S POSTS
export async function listenUserPosts(userId, caller = () => { }) {
    if (!userId) return
    const q = query(postsRef, where('userId', '==', userId), orderBy('timeStamp', 'desc'))
    return onSnapshot(q, snap => caller(snapToObject(snap)))
}

// ADD A POST-----------------------------------------------------------------
export async function addPost(data, user) {
    if (!user) return null
    const snap = await addDoc(postsRef, {
        body: data?.body,
        images: [],
        userId: user?.uid,
        reacts: [],
        comments: [],
        dateAdded: new Date().toDateString(),
        timeStamp: serverTimestamp()
    })

    console.log(snap)

    addPostImages(data?.images, { id: snap?.id, userId: user?.uid })

    return snap
}
// ADD POST IMAGES IF ANY -------------------------------------------------------
// `posts_images/${user?.uid}/${postId}/${image?.name || ind}`
async function addPostImages(images, post) {
    console.log(post);
    if (images && images?.length > 0) {
        images.map(async (image, ind) => {
            uploadImage(image?.file, postImagesPath(post, image, ind), url => {
                updateDoc(postRef(post?.id), {
                    images: arrayUnion({
                        url, name: image?.name, ind
                    })
                })
            })
        })
    }
}

// UPDATE A POST --------------------------------------------------------------
export async function updatePost(id, data) {
    return await updateDoc(postRef(id), data)
}

// DELETE A POST---------------------------------------------------------------
export async function deletePost(post) {
    await deleteDoc(postRef(post?.id))
    await deletePostImages(post)
}

// DELETE POST IMAGES 
export async function deletePostImages(post) {
    if (!post?.images || post?.images?.length <= 0) return null
    post?.images?.map((img, ind) => {
        deleteFile(postImagesPath(post, img, ind))
    })
}

// LOVE A POST-----------------------------------------------------------------
export async function lovePost(authId, postId, { loves, likes }) {

    if (loves && loves.find(s => s == authId)) {
        updateDoc(postRef(postId), {
            loves: arrayRemove(authId)
        })
    } else {
        updateDoc(postRef(postId), {
            loves: arrayUnion(authId),
            likes: arrayRemove(authId)
        })
    }
}

// LIKE A POST-----------------------------------------------------------------
export async function likePost(authId, postId, { likes, loves }) {

    if (likes && likes.find(s => s == authId)) {
        updateDoc(postRef(postId), {
            likes: arrayRemove(authId),
        })
    } else {
        updateDoc(postRef(postId), {
            likes: arrayUnion(authId),
            loves: arrayRemove(authId),
        })
    }
}




