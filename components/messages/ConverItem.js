
import { useEffect, useState } from 'react'
import Icon from '../elements/icons/Icon'
import AvatarSmall from '../mainComponents/AvatarSmall'
import useChat from '../tool/useChat'

export default function ConverItem(props) {

    const { maximize, closeConver } = useChat()
    const { chatter } = props
    const [showOption, setShowOption] = useState(false)

    useEffect(() => {
        console.log(props);
    }, [])

    const onClickHandler = () => maximize(chatter?.id)
    const onMinimizeHandler = () => closeConver(chatter?.id)

    return (
        <div className=' '
            onMouseEnter={() => setShowOption(true)}
            onMouseLeave={() => setShowOption(false)}
        >
            {
                showOption && <div className='relative'>
                    <Icon onClick={onMinimizeHandler} round={true} className='absolute -top-2 -right-2'>close</Icon>
                </div>
            }
            <AvatarSmall onClick={onClickHandler} className='min-w-[50px] min-h-[50px] shadow-lg m-2 cursor-pointer ' src={chatter?.photoURL} />
        </div>
    )
}


