import { useTheme } from "next-themes"
import Link from "next/link"
import useAuth from "../../src/auth/authProvider"
import ProfileHeaderIcon from "../mainComponents/ProfileHeaderIcon"
import useNotification from "../tool/useNotification"
import ThemeView from "./ThemeView"

export default function Header() {

    const auth = useAuth()
    const { logout, user, profile } = auth
    const { systemTheme, theme, setTheme } = useTheme()
    const { ViewIcon } = useNotification()

    return (
        <div className="h-[60px]">
            <div className="fixed w-full  flex bg-white p-3 justify-between items-center">
                <div className="flex">
                    <Link href={'/'}>
                        <div className="cursor-pointer">
                            <h1>logo</h1>
                        </div>
                    </Link>
                </div>
                <nav >
                    <ul className="flex justify-evenly flex-1 items-center">
                        <li>
                            {auth?.user?.uid}
                        </li>
                        <Menu href='/' protect={true} user={user}>HOME</Menu>
                        <li>
                            <ViewIcon />
                        </li>
                        <li>
                            <ProfileHeaderIcon auth={auth} profile={profile} />
                        </li>
                    </ul>
                </nav>
                {/* <ThemeView /> */}
            </div>
        </div>
    )
}

function Menu(props) {

    if (props?.protect && !props?.user) return null;


    return <li className="mx-3">
        <Link href={props?.href}>{props?.children}</Link>
    </li>
}