import { useRef } from "react"
import useAuth from "../../../src/auth/authProvider";
import PrimaryButton from "../../elements/buttons/PrimaryButton";
import TextArea from "../../elements/TextArea";
import AvatarSmall from "../../mainComponents/AvatarSmall";
import { postComment } from "./commentApi";


export default function CommentWriter({ postData }) {

    const { user, profile } = useAuth();

    function onSubmitHandler(e) {
        e.preventDefault()
        const form = e.target
        const body = form?.body?.value
        postComment({ body }, user?.uid, postData?.id)
    }


    return (
        <div className="flex items-center p-3">
            <AvatarSmall src={profile?.photoURL || user?.photoURL} />
            <form onSubmit={onSubmitHandler}
                className='flex-1 flex bg-gray-100 ml-2 rounded-full items-center'>
                <textarea placeholder="write a react . . ." name="body" rows="1" className="flex-1 bg-transparent px-3 p-1.5 mr-2 "></textarea>
                <PrimaryButton type='submit'>Post</PrimaryButton>
            </form>
        </div>
    )
}