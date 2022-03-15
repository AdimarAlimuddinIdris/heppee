
import { useState, useEffect } from 'react'
import { getAllUsers, getAllUsersIn } from '../../../src/auth/authApi'
import UserListItem from '../../mainComponents/UserListItem'
import Icon from '../../elements/icons/Icon'

export default function ProfileFollowersView({ label, relations, show, setShow }) {
    if (!show) return null

    const [users, setUsers] = useState()

    useEffect(async () => {
        const res = await getAllUsersIn(relations[label])
        setUsers(res)

    }, [label])

    const UsersLists = () => {
        if (users && !users?.length <= 0) {
            return users?.map(user => <UserListItem label={label} data={user} key={user?.id} />)
        }
        return <h1 className='m-auto mt-10 text-larger'>
            No {label}
        </h1>

    }

    return (
        <div onClick={() => setShow(false)} className="popup-div flex flex-col justify-center">
            <div className="max-w-lg w-full min-h-[80%] mx-auto">
                <Icon className='-ml-4 text-larger' round={true} onClick={() => setShow(false)}>close</Icon>
                <div className='flex flex-col bg-white rounded-md -mt-3 shadow-md h-full'>
                    <h2 className='p-2 text-center'>{label?.toUpperCase()} {users?.length}</h2>
                    <hr />
                    <div className='flex flex-col mx-auto'>
                        <UsersLists />
                    </div>
                </div>
            </div>
        </div>
    )
}

