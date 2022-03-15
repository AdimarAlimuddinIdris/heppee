import useAuth from "../../src/auth/authProvider";
import PrimaryButton from "../elements/buttons/PrimaryButton";
import Input from "../elements/Input";



export default function SignInView() {

    const { loginWithEmailAndPassword } = useAuth()

    const onSubmitHandler = (e) => {
        e.preventDefault()
        const { target: { email, password } } = e
        // console.log({ email, password });
        loginWithEmailAndPassword(email?.value, password?.value)
    }

    return (
        <div className=" p-10 max-w-md rounded-lg bg-white m-4">
            <h1 className=" text-center">Sign In</h1>
            <form onSubmit={onSubmitHandler}>
                <Input type='email'>email</Input>
                <Input type='password'>password</Input>
                <PrimaryButton type='submit'>Sign In</PrimaryButton>
            </form>
        </div>
    )
}

