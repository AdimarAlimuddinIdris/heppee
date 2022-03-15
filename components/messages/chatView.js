import useAuth from "../../src/auth/authProvider";
import Icon from "../elements/icons/Icon";
import useChat from "../tool/useChat";
import ConverItem from "./ConverItem";
import OpenConverItem from "./OpenConverItem";


export default function ChatView({ }) {
    const { users } = useAuth()
    const chat = useChat()

    return (
        <div className='fixed bottom-10 right-10 flex items-end '>
            <div className=" flex -mb-5">
                {
                    chat?.users?.filter(s => s?.open)?.map((conver, ind) => <OpenConverItem {...conver} key={ind} />)
                }
            </div>
            <div className="flex flex-col ">
                <div className='flex flex-col items-center py-2  '>
                    {
                        chat?.users?.filter(s => !s?.open)?.map((conver, ind) => <ConverItem {...conver} key={ind} />)
                    }
                </div>
                <Icon className='text-[50px]' round={true}>add</Icon>
            </div>
        </div>
    )
}

