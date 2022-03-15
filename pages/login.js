
import LoginPage from "../components/main/LoginPageView";
import useAuth from "../src/auth/authProvider";
import authRouter from '../src/auth/authRouter'


const Pre = () => <p>loading...</p>



export default authRouter.reverse(LoginPage, '/')

// export default function LoginRoute() {
//     const { user, loading } = useAuth()
//     if (user) {

//     }
//     return <LoginPage />
// }