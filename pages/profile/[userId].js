import useAuth from "../../src/auth/authProvider";
import authRouter from "../../src/auth/authRouter";
import UserProfile from "../../components/profile/UserProfileView";


export default authRouter.protect({
    Component: UserProfile,
})

