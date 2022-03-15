import ProfileView from '../../components/profile/ProfileView'
import authRouter from '../../src/auth/authRouter'

export default authRouter.protect({
    Component: ProfileView ,
})




