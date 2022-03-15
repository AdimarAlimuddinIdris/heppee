import ChatView from "../messages/chatView";
import useChat from "../tool/useChat";
import Header from "./Header";



export default function MainLayout({ children, header = Header, footer }) {
    // const chat = useChat()

    return (
        <div className="dark bg-gray-200 min-h-screen pb-20">
            <Header />
            {children}
            <ChatView/>
        </div>
    )
}