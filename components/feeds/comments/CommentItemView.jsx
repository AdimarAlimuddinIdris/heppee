import { useEffect, useState } from "react"
import useAuth from "../../../src/auth/authProvider"
import Body from "../../elements/outputs/Body"
import AvatarSmall from "../../mainComponents/AvatarSmall"
import ReactView from "../components/ReactViews"
import { deleteComment, likeComment, LoveComment } from "./commentApi"
import CommentsOptions from "./CommentOptionsView"
import CommentUpdate from "./updateCommentView"

export default function CommentItem({ data }) {

    const { user, getUserProfile } = useAuth()
    const [userProfile, setUserProfile] = useState()
    const [isEditing, setIsEditing] = useState(false)


    useEffect(async () => {
        setUserProfile(await getUserProfile(data?.userId))
    }, [])

    const reactProps = {
        likes: data?.likes, loves: data?.loves, userId: user?.uid,
        onLike: () => likeComment(data?.id, user?.uid, data?.likes),
        onLove: () => LoveComment(data?.id, user?.uid, data?.loves)
    }

    const commentOptionsData = {
        userId: data?.userId, authId: user?.uid, userProfile,
        onDelete: () => deleteComment(data?.id),
        onEdit: () => setIsEditing(true),
    }

    const isMyComment = () => data?.userId == user?.uid ? 'bg-violet-50' : 'bg-gray-100'

    return (
        <div className="my-2 flex items-start ">
            <AvatarSmall src={userProfile?.photoURL} />
            <div className="flex flex-col">
                <div className=" mx-2 flex items-start">
                    <CommentUpdate data={data} show={isEditing} setIsEditing={setIsEditing} />
                    <Body show={!isEditing} className={`bg-gray-100 max-w-xs overflow-auto ${isMyComment()} ring-1 min-w-[100px] ring-gray-200 p-2 px-4 rounded-3xl`} userProfile={userProfile} >{data?.body}</Body>
                    {!isEditing && <CommentsOptions data={commentOptionsData} />}
                </div>
                <div className="flex items-center py-1 px-3 ">
                    <ReactView props={reactProps} className='ml-3' />
                    <small className="ml-4">{data?.dateAdded}</small>
                </div>
            </div>
        </div>
    )
}