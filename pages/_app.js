import { AuthProvider } from '../src/auth/authProvider'
import MainLayout from '../components/main/MainLayout'
import '../styles/globals.css'
import '../styles/default.css'
import { ThemeProvider } from 'next-themes'
import { ChatProvider } from '../components/tool/useChat'

function MyApp({ Component, pageProps }) {


  return <AuthProvider>
    <ThemeProvider attribute='class'>
      <ChatProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ChatProvider>
    </ThemeProvider>
  </AuthProvider>

}

export default MyApp
