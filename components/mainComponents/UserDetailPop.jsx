import { useEffect } from "react";
import useAuth from "../../src/auth/authProvider";
import useRelations from "../tool/useRelations";
import AvatarBig from "./AvatarBig";


export default function UserDetailPop({ data, top, show, label, setShow = () => { } }) {
    if (!show) return null
    const { user } = useAuth()
    const relations = useRelations(user?.uid, data?.id)

    function IsFollowingComp() {
        if (label == 'followings' || relations?.isFollowing) {
            return <div className="mx-4 flex ">
                <p className="text-violet-500">Following</p>
                <span className="material-icons text-violet-400 ml-2">done</span>
            </div>
        }
        return null;
    }

    return (
        <div
            className="relative">
            <div
                onMouseEnter={() => setShow(false)}
                className={`absolute min-w-[230px] w-full top-${top || '20'} -left-5 bg-white overflow-hidden rounded-md shadow-md`}>

                <div
                    style={{ backgroundImage: `url(${data?.featuredImage})` }}
                    className="bg-gray-100 min-h-[80px] w-full bg-no-repeat bg-cover bg-center">
                </div>

                <hr />
                <div className="flex w-fit items-center justify-items-stretch">
                    <AvatarBig className=' -mt-10 ml-5' size='100' src={data?.photoURL} />
                    <div className="m-2">
                        <h2>{data?.displayName}</h2>
                        <small>{data?.bio}</small>
                    </div>
                </div>
                <IsFollowingComp />
                <div className="flex p-2">
                    <small className="px-2">followers {relations?.followers?.length}</small>
                    <small className="px-2">posts</small>
                </div>
            </div>
        </div>
    )
}