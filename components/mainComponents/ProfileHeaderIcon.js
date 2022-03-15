
import { useState } from 'react'
import AvatarSmall from './AvatarSmall';
import AvatarBig from './AvatarBig';
import { FaAngleDown } from 'react-icons/fa';
import PrimaryButton from '../elements/buttons/PrimaryButton'
import Link from 'next/link'

export default function ProfileHeaderIcon({ auth, profile }) {
    const [more, setMore] = useState()

    if (!auth?.user) return null;


    const closePop = () => {
        // return setTimeout(() => {
        //     setMore(false)
        // }, 100)
    }

    return (
        <div
            onMouseEnter={() => setMore(true)}
            className='flex items-center justify-center cursor-pointer'>
            <AvatarSmall src={profile?.photoURL || auth?.user?.photoURL} />
            <FaAngleDown />
            {

                more && <div className='relative'>
                    <div
                        className='flex z-8th flex-col justify-end absolute top-6 right-0 bg-white shadow-md p-3 rounded-md min-w-[100px] min-h-[100px]'
                        onMouseLeave={() => setMore(false)}
                    >
                        <input className='max-h-0 opacity-0' onBlur={closePop} type="text" autoFocus={true} />
                        <AvatarBig size='100' className=' mx-auto' src={profile?.photoURL || auth?.user?.photoURL} />
                        <h2 className='text-center my-1'>{auth?.profile?.userName?.toUpperCase() || auth?.user?.displayName?.toUpperCase()}</h2>
                        <Link href='/profile'><PrimaryButton>Profile</PrimaryButton></Link>
                        <button onClick={auth?.logout} className=' p-1 my-1 rounded-md bg-gray-200'>Logout</button>
                    </div>
                </div>
            }
        </div>
    )


}