
import useAuth from '../../../src/auth/authProvider'
import ProfileUpdateHeader from './ProfileUpdateHeaderView';

export default function ProfileUpdate() {

    const { user, profile } = useAuth();

    console.log({ user, profile });

    return (
        <div className='max-w-3xl mx-auto'>
            <ProfileUpdateHeader user={user} profile={profile} />
        </div>
    )
}