import Icon from "../../elements/icons/Icon"
import AvatarSmall from "../../mainComponents/AvatarSmall"

export default function ChatHeader({ chatter, onMinimizeHandler, onMaximizeHandler }) {
    return <div className=" flex">
        <div className="p-2 flex-1 cursor-pointer hover:bg-gray-100 flex items-center">
            <AvatarSmall src={chatter?.photoURL} />
            <div className="flex flex-col">
                <p>{chatter?.displayName}</p>
                <small>{chatter?.bio}</small>
            </div>
        </div>
        <div className="items-center flex justify-center px-3">
            <Icon onClick={onMinimizeHandler}>minimize</Icon>
            <Icon className='' onClick={onMaximizeHandler}>close</Icon>
        </div>
    </div>
}