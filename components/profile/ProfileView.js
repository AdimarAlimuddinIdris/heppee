
import { useEffect } from 'react'
import ProfileHeader from './components/ProfileHeaderView'
import ProfilePosts from './components/ProfilePostsView'

export default function ({ auth }) {

    const { profile, user } = auth

    useEffect(() => {

    }, [])


    return (
        <div className='max-w-3xl mx-auto '>
            <ProfileHeader profile={profile} user={false} />
            <ProfilePosts userId={user?.uid} user={false} />
        </div>
    )
}