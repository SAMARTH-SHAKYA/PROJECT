import { Link } from "react-router-dom"
export default function RegisterPage(){
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className=" mb-64">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form className="max-w-md mx-auto">
                <input type="text" name="" id="" placeholder="Enter your name" />
                <input type="email" placeholder="enter your email" />
                <input type="password" name="" id="" placeholder="enter  your password" />
                <button className="primary">Register</button>
                <div className="text-center py-2 text-gray-500">Already  have an account? <Link className="underline text-bn" to="/login">Login</Link> 
                </div>
            </form>
            </div>
        </div>
    )
}