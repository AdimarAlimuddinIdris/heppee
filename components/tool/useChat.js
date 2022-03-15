import { createContext, useEffect, useContext, useState } from "react";
import useAuth from "../../src/auth/authProvider";
import { listenConver } from "../messages/chatApi";




const ChatContext = createContext()

export const ChatProvider = (props) => {

    const [users, setUsers] = useState([])
    const { profile } = useAuth()

    useEffect(() => {

    }, [profile])


    const minimize = (chatterId) => setOpen(chatterId, false)
    const maximize = (chatterId) => setOpen(chatterId, true)

    const setOpen = (chatterId, val) => {
        setUsers(l => l.map(c => {
            const ret = { ...c }
            if (c?.chatter?.id == chatterId) {
                c?.open == val
                ret = { ...c, open: val }
            }
            return ret
        }))
    }

    const openConver = (sUser) => {
        if (!sUser) return
        if (users?.find(s => s?.chatter?.id == sUser?.id)) return
        setUsers(l => [...l, { chatter: sUser, open: true }])
    }

    const closeConver = (chatterId) => {
        console.log('closing');
        setUsers(l => l.filter(c => c?.chatter?.id != chatterId))
    }

    const value = {
        openConver,
        users,
        minimize,
        maximize,
        closeConver,
    }
    return <ChatContext.Provider value={value}>{props.children}</ChatContext.Provider>
}

export default function useChat() { return useContext(ChatContext) }

