import { useEffect, useState } from "react"
import { listenComment } from "./commentApi"
import CommentItem from "./CommentItemView"
import CommentWriter from "./CommentWriterView"


export default function Comments({ postData }) {
    const [comments, setComments] = useState()
    const [show, setShow] = useState(true)

    useEffect(() => {
        const unsub = listenComment(postData?.id, commentsData => {
            setComments(commentsData)
            if (commentsData?.length <= 0) setShow(false);
        })
        return unsub;
    }, [])

    return (
        <div className="overflow-hidden flex flex-col">
            <button onClick={() => setShow(s => !s)}>
                <p className="text-gray-400 p-3">
                    {comments?.length > 0 ? comments?.length + ' comments' : 'comments'}
                </p>
            </button>
            {
                show && <div className="max-h-[1000px] flex flex-col h-fit overflow-x-hidden overflow-y-auto p-3">
                    {
                        comments?.map(comment => <CommentItem data={comment} key={comment?.id} />)
                    }
                </div>
            }
            {show && <CommentWriter postData={postData} />}

        </div>
    )
}

