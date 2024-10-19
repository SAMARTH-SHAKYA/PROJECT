import { Link } from "react-router-dom"
export default function LoginPage(){
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className=" mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto">
                <input type="email" placeholder="enter your email" />
                <input type="password" name="" id="" placeholder="enter  your password" />
                <button className="primary">login</button>
                <div className="text-center py-2 text-gray-500">Don't have an account yet?
                    <Link className="underline text-bn" to="/register">Register</Link>
                </div>
            </form>
            </div>
        </div>
    )
}