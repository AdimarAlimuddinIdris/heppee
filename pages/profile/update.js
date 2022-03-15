import ProfileView from "../../components/profile/ProfileView";
import ProfileUpdate from "../../components/profile/profileUpdate/ProfileUpdateView";
import authRouter from "../../src/auth/authRouter";

export default authRouter.protect({
    Component: ProfileUpdate,
})