import { useAmp } from "next/amp"
import { useEffect, useState } from "react"
import useAuth from "../../../src/auth/authProvider"
import { listenUserPosts } from "../../feeds/feedsApi"
import PostItem from '../../feeds/posttem/PostItemView'
import PostWriter from '../../feeds/postWriter/PostWriterView'

export default function ProfilePosts({ userId, user }) {
    const [posts, setPosts] = useState()

    useEffect(async () => {
        const unsub = await listenUserPosts(userId, setPosts)
        return unsub;
    }, [userId])

    return (
        <div className="m-3 w-full max-w-lg">
            {
                !user && <PostWriter />
            }

            {posts?.map(post => <PostItem data={post} key={post?.id} />)}
        </div>
    )
}