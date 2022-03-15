import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { listenChat } from "../../components/messages/chatApi";
import { listenNotification } from "../../components/messages/notificationApi";
import useNotification from "../../components/tool/useNotification";
import { db, auth } from '../../firebase.config'
import { createUserCred, createUser, getUserProfile, listenUserProfile } from "./authApi";

const AuthContext = createContext()

export function AuthProvider(props) {
    const [user, setUser] = useState()
    const [profile, setProfile] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const [chats, setChats] = useState([])
    const [notifs, setNotifs] = useState([])
    const [showChat, setShowChat] = useState(true)
    const [to, setTo] = useState()


    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async user => {
            setUser(user)
            listenUserProfile(user?.uid, profile => {
                setProfile(profile)
                listenChat(user?.uid, setChats)
                listenNotification(user?.uid, setNotifs)
            })
            setLoading(false)
        })
        return unsub
    }, [])


    function loginWithGoogle() {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(cred => {
                router.push('/')
                createUserCred(cred?.user)
            })
    }

    async function registerWithEmailAndPassword(data) {
        const cred = await createUserWithEmailAndPassword(auth, data?.email, data?.password)
        createUserCred(cred?.user, data)
    }

    async function loginWithEmailAndPassword(email, password) {
        if (!email || !password) return
        console.log({ email, password });
        signInWithEmailAndPassword(auth, email, password)
            .then(cred => {
                console.log(cred);
            })
    }

    function logout() {
        signOut(auth)
    }

    const value = {
        user, setUser, profile, setProfile, error, loading,
        loginWithGoogle, logout, getUserProfile,
        registerWithEmailAndPassword,
        loginWithEmailAndPassword,
        chats, notifs,
        setShowChat, showChat,
        to, setTo,

    }

    return <AuthContext.Provider value={value} {...props} />
}
const useAuth = () => useContext(AuthContext)
export default useAuth;
