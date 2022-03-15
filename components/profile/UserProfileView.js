
import ProfileHeader from './components/ProfileHeaderView'
import ProfilePosts from './components/ProfilePostsView'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getUserProfile } from '../../src/auth/authApi'
import useAuth from '../../src/auth/authProvider'
import ChatView from '../messages/chatView'

export default function UserProfile() {

    const router = useRouter()
    const { userId } = router.query
    const { setTo, to } = useAuth()

    useEffect(async () => {
        const profileData = await getUserProfile(userId)
        setTo(profileData)
    }, [])

    return (
        <div className='max-w-3xl mx-auto'>
            <ProfileHeader profile={to} user={true} />
            {/* <ChatView /> */}
            <div className='flex'>
                <ProfilePosts user={true} userId={to?.id} />
            </div>
        </div>
    )
}

