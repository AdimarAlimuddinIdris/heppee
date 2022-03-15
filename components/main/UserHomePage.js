// import useAuth from "../../auth/authProvider"
import Feeds from "../feeds/FeedsView"
import useAuth from '../../src/auth/authProvider'
import UsersLists from "./UsersListsView"

// import Feeds from '../feeds/FeedsView'

export default function UserHomePage() {

    const { user } = useAuth()


    return (
        <div className="flex justify-center ">
            <Feeds />
            <UsersLists />
        </div>
    )
}