
import Icon from '../../elements/icons/Icon'
import PrimaryButton from '../../elements/buttons/PrimaryButton'
import { useRef, useState, useEffect } from 'react'
import useImageEditor from '../../tool/imageEditor'
import { UpdateProfile } from './profileUpdateApi'
import UpdatingProfileView from './profileUpdateComponents/updatingView'
import { useRouter } from 'next/router'

export default function ProfileUpdateHeader({ user, profile }) {

    const [bio, setBio] = useState(profile?.bio || '')
    const [updating, setUpdating] = useState(false)
    const featuredImg = useImageEditor()
    const avatarImg = useImageEditor()
    const router = useRouter()

    const data = () => ({ featuredImageFile: featuredImg?.file, avatarImageFile: avatarImg?.file, bio, userId: user?.uid })

    const onSaveChangesHandler = async () => {
        setUpdating(true)
        await UpdateProfile(data())
        setUpdating(false)
        router.replace('/profile')

    }

    // console.log(profile);

    return (
        <div className="m-3 bg-white  rounded-lg overflow-hidden">
            <UpdatingProfileView updating={updating} />
            <FeaturedImage defaultURL={profile?.featuredImage} image={featuredImg} />
            <div className='flex items-center'>
                <Avatar defaultURL={profile?.photoURL} image={avatarImg} profile={profile} />
                <Bio bio={bio} setBio={setBio} />
                <PrimaryButton onClick={onSaveChangesHandler}>Save Changes</PrimaryButton>
            </div>
        </div>
    )
}



function FeaturedImage({ src, image, defaultURL }) {

    useEffect(() => {
        image?.read()
    })

    return <div
        style={{ backgroundImage: `url(${image?.url || defaultURL})` }}
        className={`min-h-[200px] bg-gray-100 flex justify-end bg-center bg-cover bg-no-repeat `}>
        <image.Input />
        <div className='flex flex-col items-center'>
            <Icon onClick={image?.select} round={true} className='float-right m-2'>edit</Icon>
            <Icon onClick={image?.reset} round={true} className='float-right m-2'>restart_alt</Icon>
        </div>
    </div>
}

function Avatar({ image, defaultURL }) {

    useEffect(() => {
        image?.read()
    })

    return <div
        style={{ backgroundImage: `url(${image?.url || defaultURL})` }}
        className={`items-center justify-end bg-gray-200 flex -mt-20 ml-20 bg-cover bg-no-repeat bg-center min-h-[140px] min-w-[140px] max-h-[140px] max-w-[140px] rounded-full`}>
        <image.Input />
        <div className='flex flex-col items-center'>
            <Icon onClick={image?.select} round={true} className='float-right m-2'>edit</Icon>
            <Icon onClick={image?.reset} round={true} className='float-right m-2'>restart_alt</Icon>
        </div>
    </div>
}

function Bio({ bio, setBio }) {
    return <div className='p-2 m-2 flex flex-col '>
        <label htmlFor="bio">bio </label>
        <input
            onChange={({ target }) => setBio(target?.value)}
            value={bio} type="text" name='bio' className='ring-1 rounded-md ring-gray-200' />
    </div>
}

