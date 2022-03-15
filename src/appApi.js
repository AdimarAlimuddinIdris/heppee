


export function docToObject(doc) {
    return { id: doc.id, ...doc.data() }
}

export function snapToObject(snap) {
    return snap.docs.map(doc => docToObject(doc))
}

export function selectUser(userId, authId, router) {
    if (!userId || !authId || !router) return
    if (userId === authId) {
        router.push('/profile')
    } else {
        router.push(`/profile/${userId}`)
    }
}

