import PrimaryButton from "../elements/buttons/PrimaryButton"
import { useRef } from 'react'

export default function useWritter(props) {
    const BodyRef = useRef()

    const onPostHandler = () => {
        props?.onPost(BodyRef?.current?.value)
    }

    const View = () => {
        return (
            <div className={"flex p-2 items-end " + props?.divClass}>
                <div className="flex-1 flex overflow-hidden " >
                    <textarea resize='none' ref={BodyRef} className="flex-1 p-1 min-h-[40px] px-3 bg-gray-100 mx-1 rounded-2xl max-h-[150px]" type="text" />
                </div>
                <PrimaryButton onClick={onPostHandler} className='rounded-full'>Post</PrimaryButton>
            </div>
        )
    }

    return {
        View,
    }
}