import HomePage from '../components/main/HomePage'
import UserHomePage from '../components/main/UserHomePage'
import authRouter from '../src/auth/authRouter'

export default authRouter.protect({
  Component: UserHomePage,
  BackPage: HomePage
})

