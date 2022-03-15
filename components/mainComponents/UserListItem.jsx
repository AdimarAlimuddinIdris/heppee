import { useState } from "react";
import AvatarSmall from "./AvatarSmall";
import UserDetailPop from "./UserDetailPop";
import { useRouter } from 'next/router'
import useAuth from "../../src/auth/authProvider";


export default function UserListItem(props) {
    const { data } = props
    const [showDetails, setShowDetails] = useState(false)
    const { user } = useAuth()
    const router = useRouter()


    function onClickHandler() {
        if (user?.uid != data?.id) {
            router.push(`/profile/${data?.id}`)
        } else {
            router.push('/profile')
        }
    }


    return (
        <div {...props}
        >
            <div
                onClick={onClickHandler}
                onMouseEnter={() => setShowDetails(true)}
                onMouseLeave={() => setShowDetails(false)}
                className={"flex p-2 my-2 hover:bg-gray-50 cursor-pointer " + props?.className}
            >
                <AvatarSmall src={data?.photoURL} />
                <div className="mx-2">
                    <h2>{data?.userName || data?.displayName}</h2>
                </div>
            </div>
            <UserDetailPop
                label={props?.label}
                show={showDetails}
                data={data} />
        </div>
    )
}