import { useState, useEffect } from 'react'
import { getUserProfile } from '../../src/auth/authApi';
import useAuth from '../../src/auth/authProvider';
import Icon from '../elements/icons/Icon';
import AvatarSmall from '../mainComponents/AvatarSmall';
import { listenNotification, readNotif } from '../messages/notificationApi'


export default function useNotification() {

    const { notifs, setShowChat } = useAuth()
    const [show, setShow] = useState(false)

    function listen(userId) {
        return listenNotification(userId, data => {
            console.log({ data });
            setLists(data)
        })
    }

    const set = (data) => setLists(data)
    const checkNotif = () => notifs?.find(s => s?.read == false)


    function ViewIcon() {
        return <div onClick={() => setShow(s => !s)} className='flex flex-col mx-3'>
            <div className='flex '>
                <Icon round={true}>notifications</Icon>
                {
                    checkNotif() && <div className='relative '>
                        <span className='absolute top-0 -left-2 p-1 bg-red-400 rounded-full '></span>
                    </div>
                }
            </div>
            {
                show && <View />
            }
        </div>
    }

    function View() {
        return (
            <div className='bg-red-300 relative'>
                <div className='overflow-hidden flex flex-col  right-0 absolute bg-white rounded-xl shadow-md top-5 '>
                    <div className='overflow-y-scroll flex-1 flex flex-col min-h-[200px] max-h-[400px] -mr-2'>
                        {
                            notifs?.map(notif => <NotifItem setShowChat={setShowChat} {...notif} key={notif?.id} />)
                        }
                    </div>
                </div>
            </div>
        )
    }


    return {
        listen, notifs,
        View, set, ViewIcon,
    }
}

function NotifItem(props) {

    const [from, setFrom] = useState()
    useEffect(async () => {
        const fromData = await getUserProfile(props?.from)
        setFrom(fromData)
    }, [props?.from])

    const checkIcon = () => props?.type == 'chat' ? 'chat' : 'help_center'
    const checkRead = (a = 'text-gray-300', b = 'text-purple-500') => props?.read ? a : b

    const onRead = () => {
        readNotif(props?.id)
        if (props?.type == 'chat') {
            props?.setShowChat(true)
        }
    }

    return (
        <div onClick={onRead} className={'w-full cursor-pointer p-3  whitespace-nowrap flex items-center ' + checkRead('bg-gray-100', 'bg-purple-200 hover:bg-purple-300')}>
            <div>
                <AvatarSmall src={from?.photoURL} />
                <div className='relative '>
                    <Icon className={'absolute rounded-md mr-2 -mt-4 bg-white text-[20px] ' + checkRead()}>{checkIcon()}</Icon>
                </div>
            </div>
            <div className='flex flex-col'>
                <small>{props?.label}</small>
                <small className='text-xs'>{props?.addedAt}</small>
            </div>
        </div>
    )
}