

import { updateDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../../firebase.config'
import { uploadImage } from '../../../src/appDbApi';
const userRef = id => doc(db, 'users', id,)


export async function UpdateProfile(data) {
    await uploadImage(data?.featuredImageFile,
        `featured_image/${data?.userId}`,
        url => {
            updateDoc(userRef(data?.userId), { featuredImage: url })
        })

    await uploadImage(data?.avatarImageFile,
        `avatar_image/${data?.userId}`,
        url => {
            updateDoc(userRef(data?.userId), { photoURL: url })
        })

    await updateBio(data)

}

async function updateBio(data) {
    if (data?.bio) {
        await updateDoc(userRef(data?.userId), { bio: data?.bio })
    }
}

// `featured_image/${data?.userId}`


