import ProfileFollowersView from "./ProfileFollowersView"
import { useState } from 'react'

export default function ProfileRelationsMenu({ relations }) {
    const [show, setShow] = useState(false)
    const [label, setLabel] = useState()
    const buttonStyle = 'hover:bg-gray-100 p-2 rounded-md px-3 mr-2'

    const showHandler = (e) => {
        setLabel(e)
        setShow(true)
    }

    // console.log({ relations });

    return (
        <div className="flex px-2 pb-2">
            <ProfileFollowersView label={label} setShow={setShow} relations={relations} show={show} />
            <button name='followers'
                onClick={() => showHandler('followers')}
                className={buttonStyle}>
                <p >Followers {relations?.followers?.length} </p>
            </button >
            <button name='following'
                onClick={() => showHandler('followings')}
                className={buttonStyle}>
                <p >Followings {relations?.followings?.length} </p>
            </button>
        </div>
    )
}

