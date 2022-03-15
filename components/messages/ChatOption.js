
import { useState } from 'react'
import Icon from '../elements/icons/Icon'

export default function ChatOption({ onDelete }) {
    const [show, setShow] = useState(false)

    const onDeleteHandler = () => {
        setShow(false)
        onDelete()
    }

    return (
        <div>
            <Icon onClick={() => setShow(s => !s)}>more_horiz</Icon>
            {
                show && <div className='relative'>
                    <div className='absolute top-0 p-2 bg-gray-50 shadow-md rounded-md'>
                        <button onClick={onDeleteHandler}>
                            <small>delete</small>
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}