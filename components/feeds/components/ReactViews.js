
import { useState } from 'react'
import { FaKissWinkHeart, FaHeart } from 'react-icons/fa';
import Icon from '../../elements/icons/Icon';
import UsersNameLists from '../../mainComponents/UsersNameLists';

export default function ReactView(props_) {
    const { props } = props_
    const [showButtons, setShowButtons] = useState(false)
    const [showLovers, setShowLovers] = useState(false)
    const [showLikers, setShowLikers] = useState(false)


    const hide = () => {
        setShowButtons(false)
        setShowLikers(false)
        setShowLovers(false)
    }

    const ReactsButton = () => {
        if (!showButtons) return null
        return (
            <div
                onMouseLeave={hide} onClick={hide}
                className={'absolute -top-2 -left-2 pt-10 z-50 ' + props_?.className}>
                <div className='flex rounded-full p-1 bg-white ring-1 ring-gray-100 shadow-md'>
                    <ReactIcon
                        onMouseEnter={() => setShowLikers(true)}
                        onMouseLeave={() => setShowLikers(false)}
                        onClick={props?.onLike}
                        userId={props?.userId}
                        lists={props?.likes}
                        icon='thumb_up'
                    />

                    <ReactIcon
                        onMouseEnter={() => setShowLovers(true)}
                        onMouseLeave={() => setShowLovers(false)}
                        onClick={props?.onLove}
                        userId={props?.userId}
                        lists={props?.loves}
                        icon='favorite'
                    />
                    {props_?.children}
                </div>
                <div className='absolute flex'>
                    <UsersNameLists show={showLikers} usersId={props?.likes} title='liked' />
                    <UsersNameLists show={showLovers} usersId={props?.loves} title='loved' />
                </div>
            </div>
        )
    }

    const hasLoves = () => props?.loves?.length > 0 ? <Icon round={true} className='bg-purple-300 text-white text-[16px] -ml-1 ring-1 ring-white'>favorite</Icon> : ''
    const hasLikes = () => props?.likes?.length > 0 ? <Icon round={true} className='bg-sky-300    text-white text-[16px] -ml-1 ring-1 ring-white'>thumb_up</Icon> : ''

    return (
        <div
            onMouseEnter={() => setShowButtons(true)}
            className='flex flex-col max-w-fit'>
            <div className='relative'>
                <ReactsButton />
            </div>
            <div className='flex items-center ' >
                {hasLikes()}
                {hasLoves()}
                <small className='mx-1'> {props?.likes?.length + props?.loves?.length || 'react'}</small>
            </div>
        </div>
    )
}


function ReactIcon(props) {

    const { children, icon, userId, lists, onClick } = props
    const style = () => {
        if (lists?.find(s => s == userId)) {
            return ' text-purple-500'
        }
        return ' text-gray-400 hover:text-gray-500'
    }

    return (
        <div className='flex items-center m-2 min-w-[30px] justify-start' {...props}>
            <span onClick={onClick} class={"material-icons cursor-pointer " + style()} >
                {icon}
            </span>
            <small>{lists?.length || ''}</small>
        </div>
    )
}