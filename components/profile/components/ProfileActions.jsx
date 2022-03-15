import PrimaryButton from "../../elements/buttons/PrimaryButton"
import Link from 'next/link'
import useChat from "../../tool/useChat"
import useNotification from "../../tool/useNotification"
import useAuth from "../../../src/auth/authProvider"

export default function ProfileActions({ user, relations, profile }) {

    const chat = useChat()


    const onChatHandler = () => {
        chat.openConver(profile)
    }
    

    if (user) {
        return <div className="flex flex-wrap gap1">
            <PrimaryButton onClick={relations?.follow} className='m-1 flex-1'>
                {relations?.isFollowing ? 'UnFollow' : 'Follow'}
            </PrimaryButton>
            <PrimaryButton
                onClick={onChatHandler}
                className='m-1 flex-1'>
                Chat
            </PrimaryButton>
        </div>
    }

    return <PrimaryButton>
        <Link href="/profile/update">
            <a>Update Profile</a>
        </Link>
    </PrimaryButton>
}