
import { useState, useEffect } from 'react'
import { checkFollowing, followUser, unFollowUser } from '../profile/profileApi'

export default function useRelations(follower, following) {

    const [isFollowing, setIsFollowing] = useState()
    const [followers, setFollowers] = useState()
    const [followings, setFollowings] = useState()


    useEffect(() => {
        load()
    }, [follower, following])

    const getData = () => ({
        isFollowing, followers, followings,
        load, follow,
    })

    async function follow() {
        if (isFollowing) {
            await unFollowUser(follower, following)
        } else {
            await followUser(follower, following)
        }
        await load()
        console.log(getData());
    }


    async function load() {
        const res = await checkFollowing(follower, following)
        setIsFollowing(res?.isFollowing)
        setFollowers(res?.relations?.followers)
        setFollowings(res?.relations?.followings)
    }

    return getData()
}