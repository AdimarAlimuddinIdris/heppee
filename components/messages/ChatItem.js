import AvatarSmall from "../mainComponents/AvatarSmall"
import { deleteAChate } from "./chatApi"
import ChatOption from './ChatOption'

export default function ChatItem({ from, to, auth, user, body, id }) {
    function onDeleteHandler() {
        deleteAChate(id)
    }
    // if (to?.id != user?.id) return null;

    if (from == auth?.id) {
        return (
            <div className='flex m-3  items-start   '>
                <AvatarSmall className='shadow-md' src={auth?.photoURL} />
                <div className='p-2 rounded-xl shadow-md bg-purple-100 m-1 flex flex-col min-w-[100px] w-fit '>
                    <small>{auth?.userName || auth?.displayName}</small>
                    <small>{body}</small>
                </div>

                <ChatOption onDelete={onDeleteHandler} />
            </div>
        )
    } else {

        return (
            <div className='flex m-3 justify-end  items-start   '>
                <div className='p-2 rounded-xl shadow-md bg-green-50 m-1 flex flex-col min-w-[100px] w-fit '>
                    <small>{user?.userName || user?.displayName}</small>
                    <small>{body}</small>
                </div>
                <AvatarSmall className='shadow-md' src={user?.photoURL} />
            </div>
        )
    }
}

