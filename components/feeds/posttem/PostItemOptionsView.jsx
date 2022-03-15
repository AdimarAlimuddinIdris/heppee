
import { useState } from 'react'

export default function PostItemOptions({ data }) {
    const [show, setShow] = useState()


    if (data?.authId != data?.userId) {
        return null
    }

    if (show) {
        return <div className='relative'>
            <div
                className={`absolute right-1 -top-5 p-2 ring-1 ring-gray-300 rounded-lg 
                flex flex-col min-w-[100px]`}
                onMouseLeave={() => setShow(false)}>

                <button onClick={data?.onDelete}>
                    <small>delete</small>
                </button>

                <button onClick={data?.onEdit}>
                    <small>edit</small>
                </button>

            </div >
        </div>
    }
    return <span onClick={() => setShow(true)} class="hover:text-gray-500 material-icons text-gray-400 cursor-pointer">
        more_horiz
    </span>
}

