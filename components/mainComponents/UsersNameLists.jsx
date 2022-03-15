

import { useEffect, useState } from 'react'
import { getAllUsersIn } from '../../src/auth/authApi'
import useAuth from '../../src/auth/authProvider'

export default function UsersNameLists({ show, usersId, title }) {

    const [lists, setLists] = useState()
    const { user } = useAuth()

    if (!show) return null

    useEffect(async () => {

        const data = await getAllUsersIn(usersId)
        console.log(data);
        setLists(data)
        return () => {

        }
    }, [])


    const checkTitle = () => {
        if (usersId?.find(u => u == user?.uid)) {
            if (usersId?.length > 1) {
                return `you and ${usersId?.length - 1} other ${title} this post`
            } else {
                return `you ${title} this post`
            }
        } else {
            return `${usersId?.length} had ${title} this post`
        }
    }

    return (
        <div className='bg-gray-50 p-3 rounded-md shadow-md m-2 ring-1 ring-gray-200 opacity-90'>
            <p className=' whitespace-nowrap'>{checkTitle()}</p>
            <ul className='flex flex-col'>
                {lists?.map(user => <li>
                    <small className=''>{user?.displayName || user?.userName || user?.bio}</small>
                </li>)}
            </ul>
        </div>
    )
}