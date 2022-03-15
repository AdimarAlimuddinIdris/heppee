import { deletePost } from "../feedsApi"



export default function PostOption({ postData }) {

    const deleteHandler = () => {
        deletePost(postData?.id)
    }

    return (
        <div>
            <button onClick={deleteHandler}>
                delete
            </button>
        </div>
    )
}