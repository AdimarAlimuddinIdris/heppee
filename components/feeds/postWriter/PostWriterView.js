import { useRef } from "react"
import useAuth from "../../../src/auth/authProvider"
import PrimaryButton from "../../elements/buttons/PrimaryButton"
import { addPost } from "../feedsApi"
import useImageEditor from '../../tool/imageEditor'
import { useState } from "react"
import Icon from "../../elements/icons/Icon"
import ImageDiv from "../../elements/images/ImageDiv"

export default function PostWriter() {

    const bodyRef = useRef()
    const { user } = useAuth()
    const image = useImageEditor()

    const addPostHandler = () => {
        const data = {
            images: image?.lists,
            body: bodyRef?.current?.value
        }
        // console.log(data);
        addPost(data, user)
    }


    return (
        <div className="bg-white  mb-4 mt-1 p-2 rounded-xl">
            <textarea className="bg-gray-100 p-2 rounded-md w-full" ref={bodyRef} cols="30" rows="2" placeholder={`what's in your mind?`}></textarea>
            <ImageLists images={image} />
            <div className="flex justify-end items-center">
                <image.Input />
                <Icon onClick={image?.select} >images</Icon>
                <PrimaryButton onClick={addPostHandler}>Post</PrimaryButton>
            </div>
        </div >
    )
}


function ImageLists({ images }) {

    if (images?.lists?.length <= 0) return null;

    const ImageView = ({ image }) => {
        const [showButton, setShowButton] = useState(false)

        const onRemoveHandler = () => {
            images?.removeList(image)
        }

        return <ImageDiv
            src={image?.url}
            className=' rounded-md m-1'
            size='95'
            rounded='full'
            onMouseEnter={() => setShowButton(true)}
            onMouseLeave={() => setShowButton(false)}
        >
            {showButton && <Icon onClick={onRemoveHandler} round={true}>close</Icon>}
        </ImageDiv>
    }

    return (
        <div className="flex flex-wrap max-h-[315px] overflow-y-auto">
            {
                images?.lists?.map(image => <ImageView image={image} key={image?.name} />)
            }
        </div>
    )
}