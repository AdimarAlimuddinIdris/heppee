import AvatarBig from "../../mainComponents/AvatarBig";
import ProfileFeaturedImage from "./ProfileFeaturedImage";
import ProfileRelationsMenu from './ProfileRelationsMenu'
import useAuth from "../../../src/auth/authProvider";
import ProfileActions from "./ProfileActions";
import useRelations from "../../tool/useRelations";

export default function ProfileHeader({ profile, user }) {

    const auth = useAuth()
    const relations = useRelations(auth?.user?.uid, profile?.id)


    return (
        <div className="m-3 overflow-hidden rounded-xl bg-white min-h-[280px] flex flex-col">
            <ProfileFeaturedImage src={profile?.featuredImage} />
            <hr />
            <div className="flex">
                <AvatarBig src={profile?.photoURL} className='  -mt-16 ml-10 ' />
                <div className="m-3">
                    <h1>{profile?.userName || profile?.displayName}</h1>
                    <p>{profile?.bio}</p>
                    <ProfileActions profile={profile} relations={relations} user={user} />
                </div>
            </div>
            <ProfileRelationsMenu relations={relations} />
        </div>
    )
}


