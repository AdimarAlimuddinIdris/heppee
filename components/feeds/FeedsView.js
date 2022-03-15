import { useEffect, useState } from "react"
import useAuth from "../../src/auth/authProvider"
import useChat from "../tool/useChat"
import { listenPosts } from "./feedsApi"
import PostItem from "./posttem/PostItemView"
import PostWriter from "./postWriter/PostWriterView"

export default function Feeds() {
    const [posts, setPosts] = useState()
    // const chat = useChat()
    useEffect(async () => {
        const unsub = listenPosts(setPosts)
    }, [])

    return (
        <div className=" w-full  max-w-md m-3 ">
            <PostWriter />
            {
                posts?.map(post => <PostItem data={post} key={post?.id} />)
            }
        </div>
    )
}

