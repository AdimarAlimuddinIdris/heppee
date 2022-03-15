import useAuth from "../../src/auth/authProvider";
import AvatarSmall from "./AvatarSmall";
import { useState } from 'react'
import { useRouter } from 'next/router'

import UserDetailPop from './UserDetailPop'
import { selectUser } from "../../src/appApi";

export default function UserHeader({ userData, className, children }) {
    const [showDetails, setShowDetails] = useState(false)
    const router = useRouter()
    const { user } = useAuth()

    const onSelectUserHandler = () => selectUser(userData?.id, user?.uid, router)

    return (
        <div className="flex flex-col">
            <div
                onMouseEnter={() => setShowDetails(true)}
                onMouseLeave={() => setShowDetails(false)}
                onClick={onSelectUserHandler}
                className={"flex items-center cursor-pointer " + className}>
                <AvatarSmall src={userData?.photoURL} />
                <div className="flex flex-col justify-center">
                    <p className="mx-1">{userData?.userName || userData?.displayName}</p>
                    {children}
                </div>
            </div>
            <UserDetailPop data={userData} show={showDetails} top='50' />
        </div>
    )
}