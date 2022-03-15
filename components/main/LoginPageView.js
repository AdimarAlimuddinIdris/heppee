import useAuth from "../../src/auth/authProvider"
import PrimaryButton from "../elements/buttons/PrimaryButton"

export default function LoginPage() {
    const { loginWithGoogle, registerWithEmailAndPassword } = useAuth()

    const onLoginWithEmailPassHandler = (e) => {
        e.preventDefault()
        const data = {
            username: e.target?.username?.value,
            email: e.target?.email?.value,
            password: e.target?.password?.value,
        }
        console.log(data);
        registerWithEmailAndPassword(data)
    }

    return (
        <div className="bg-white h-screen flex p-10">
            <div className="flex-1">
                <form
                    onSubmit={onLoginWithEmailPassHandler}
                    className="my-3 shadow-md p-3 rounded-lg max-w-sm py-5 w-full">
                    <div className="flex">
                        <h1>login</h1>
                    </div>
                    <Input name='username' >User Name</Input>
                    <Input type='email'>Email</Input>
                    <Input type='password'>Password</Input>
                    <PrimaryButton className=' w-full '>SignIn</PrimaryButton>
                </form>
                <button onClick={loginWithGoogle}>login With Google</button>
            </div>
        </div>
    )
}

function Input({ children, type, name }) {
    return (
        <div className="flex flex-col my-2 m-1">
            {children && <label>{children}</label>}
            <input name={name || type} type={type || "text"} required className="ring-1 ring-gray-200 rounded-md p-1 my-1 px-2" />

        </div>
    )
}