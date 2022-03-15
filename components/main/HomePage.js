import Link from "next/link";
import SignInView from "./SiginInView";



export default function Homepage({ auth }) {

    return <div className="">
        homepage
        please sign in
        <br />
        <button>
            <Link href={'/login'}>
                <a>register page</a>
            </Link>
        </button>
        <hr />
        <SignInView />
    </div>
}