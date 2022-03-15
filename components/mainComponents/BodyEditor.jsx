import { useEffect, useRef, useState } from 'react'
import PrimaryButton from '../elements/buttons/PrimaryButton'
import UserHeader from "./UserHeader"


export default function BodyEditor({ data, children }) {
    const [body, setBody] = useState(data?.body)
    const bodyRef = useRef()

    useEffect(() => {
        bodyRef?.current?.select()
    })

    const onSaveHandler = async () => {
        const x = await data?.onUpdate(bodyRef?.current?.value)
        data?.setEditing(false)
    }

    if (!data?.editing) return ''

    return (
        <div className="flex popup-div items-center justify-center fixed h-full w-full top-0 left-0 ">
            <div className="bg-white p-3 rounded-md shadow-md opacity-100">
                <button onClick={() => data?.setEditing(false)}>x</button>
                <UserHeader userData={data?.userProfile} />
                <textarea ref={bodyRef} cols="30" rows="10" >{children}</textarea>
                <PrimaryButton onClick={onSaveHandler}>save</PrimaryButton>
            </div>
        </div >
    )
}