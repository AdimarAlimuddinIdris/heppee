import { useEffect, useState } from "react";
import useAuth from "../../src/auth/authProvider";
import useChat from "../tool/useChat";
import useWritter from "../tool/useWritter";
import { addChat, listenChat, listenConver } from "./chatApi";
import ChatHeader from "./chatComponents/chatHeaderView";
import ChatItem from "./ChatItem";
import ScrollToBottom from 'react-scroll-to-bottom';


export default function OpenConverItem(props) {

    // console.log(props);
    const { user, profile } = useAuth()
    const chat = useChat()
    const { chatter } = props
    const writer = useWritter({ onPost })
    const [chats, setChats] = useState()


    useEffect(() => {
        listenConver(user?.uid, chatter?.id, setChats)
    }, [])

    console.log('redner converitem');

    const onMinimizeHandler = () => chat?.minimize(chatter?.id)
    const onCloseHandler = () => chat?.closeConver(chatter?.id)

    function onPost(body) {
        addChat(user?.uid, chatter?.id, { body })
    }

    return (
        <div className="m-2 flex flex-col bg-white rounded-xl overflow-hidden shadow-md min-w-[250px] min-h-[300px]">
            <ChatHeader chatter={chatter} onMinimizeHandler={onMinimizeHandler} onMaximizeHandler={onCloseHandler} />
            <hr />
            <ScrollToBottom className=" flex-1 max-h-[300px] max-w-xs ">
                {
                    chats?.map(chat => <ChatItem auth={profile} user={chatter} {...chat} key={chat?.id} />)
                }
            </ScrollToBottom>
            <writer.View />
        </div>
    )
}





