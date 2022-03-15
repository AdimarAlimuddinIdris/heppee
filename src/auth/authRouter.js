import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAuth from "./authProvider"


const authRouter = {
    protect,
    reverse,
}
export default authRouter;

export function reverse(Component, redirect, LoadingCom = <p>loading...</p>) {

    return function PublicRoute() {
        const { user, loading } = useAuth()
        const router = useRouter()
        const [S, ss] = useState(<Component />)

        useEffect(() => {
            if (user && !loading) {
                if (redirect) {
                    router.push(redirect)
                } else {
                    ss(<T />)
                }
            }
        }, [user, loading, S])

        if (loading) return <p>loading me....</p>
        return S
    }
}

export function protect({ data, Component, redirect, BackPage, Loading = <p>test loading...</p> }) {


    return function ProtectedComponent() {
        const { user, loading } = useAuth();
        const router = useRouter()

        useEffect(() => {
            if (!user && !loading && !BackPage) {
                router.push(redirect || '/login')
            }
        }, [user, loading])

        if (loading) return <p>test loading...</p>
        if (!user && !loading && BackPage) return <BackPage />
        return <Component auth={useAuth()} />
    }
}

function T() {
    return <p>test...</p>
}