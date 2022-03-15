
import { useState } from 'react'
import ButtonThird from '../../elements/buttons/ButtonThird'

export default function CommentsOptions({ data }) {
    const [show, setShow] = useState(false)


    if (data?.authId != data?.userId) {
        return null
    };

    if (show) {
        return (
            <div className='relative'>
                <div
                    onMouseLeave={() => setShow(false)}
                    className={`absolute flex flex-col -top-2 -right-10 bg-white p-1 shadow-md ring-1 ring-gray-200 rounded-lg `}
                >
                    <ButtonThird onClick={data?.onEdit}><small>Edit</small></ButtonThird>
                    <ButtonThird onClick={data?.onDelete}><small>Delete</small></ButtonThird>
                </div>
            </div>
        )
    }
    return (
        <div className=' text-center items-center flex'>
            <h1 onClick={() => setShow(true)}>
                <span class="hover:bg-gray-100 rounded-full p-1 cursor-pointer material-icons mx-1 text-[20px] text-gray-400 hover:text-gray-500">
                    more_horiz
                </span>
            </h1>
        </div >
    )
}