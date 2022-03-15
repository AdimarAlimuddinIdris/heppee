import { useEffect, useState } from "react"
import useAuth from "../../../src/auth/authProvider"
import Body from "../../elements/outputs/Body"
import BodyEditor from "../../mainComponents/BodyEditor"
import UserHeader from "../../mainComponents/UserHeader"
import Comments from "../comments/CommentsView"
import CommentWriter from "../comments/CommentWriterView"
import PostFooter from "../components/PostFooter"
import PostOption from "../components/PostOptionView"
import ReactView from "../components/ReactViews"
import { deletePost, likePost, lovePost, reactPost, updatePost } from "../feedsApi"
import ImagesViewer from "./PostImagesViewerView"
import PostItemOptions from "./PostItemOptionsView"


export default function PostItem({ data }) {

    const { getUserProfile, user } = useAuth()
    const [userProfile, setUserProfile] = useState()
    const [editing, setEditing] = useState()

    useEffect(async () => {
        const userProfileData = await getUserProfile(data?.userId)
        setUserProfile(userProfileData)
    }, [])

    const reactProps = {
        likes: data?.likes, loves: data?.loves, userId: user?.uid,
        onLike: () => likePost(user?.uid, data?.id, { loves: data?.loves, likes: data?.likes }),
        onLove: () => lovePost(user?.uid, data?.id, { loves: data?.loves, likes: data?.likes })
    }

    const optionsData = {
        userId: data?.userId,
        authId: user?.uid,
        onDelete: () => deletePost(data),
        onEdit: () => setEditing(true)
    }

    const bodyEditorData = {
        editing, setEditing, userProfile,
        onUpdate: async body => updatePost(data?.id, { body })
    }

    return (
        <div className="bg-white my-4 rounded-xl ">
            <div className="flex items-center p-3 pb-0 justify-between">
                <UserHeader userData={userProfile} className='flex-1'>
                    <small className="-mt-1 mx-1">{data?.dateAdded}</small>
                </UserHeader>
                <PostItemOptions data={optionsData} />
            </div>
            <Body show={!editing} state={{ editing }}>{data?.body}</Body>
            <ImagesViewer images={data?.images} post={data} />
            <div className="px-4 mt-4">
                <BodyEditor data={bodyEditorData}>{data?.body}</BodyEditor>
                <ReactView props={reactProps} />
            </div>
            <Comments postData={data} />
        </div>
    )
}

