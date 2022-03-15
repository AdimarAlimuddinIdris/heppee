import { useEffect, useState } from "react"
import { getAllUsers } from "../../src/auth/authApi"
import UserListItem from "../mainComponents/UserListItem"


export default function UsersLists() {
    const [users, setUsers] = useState()
    useEffect(async () => {
        const usersData = await getAllUsers()
        setUsers(usersData);
    }, [])


    return (
        <div className="h-0">
            <div className=" z-0 fixed mt-4 m-1 bg-white  rounded-xl max-w-[250px] w-full ">
                <h1 className="p-3 text-center">Make Friends</h1>
                <hr />
                {
                    users?.map(user => <UserListItem
                        data={user}
                        key={user?.id}
                    />)
                }
            </div>
        </div>
    )
}



