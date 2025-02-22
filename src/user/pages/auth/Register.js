import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../../../state/auth/Action";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { success, isLoading } = useSelector((state) => state.auth);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        const userData = {
            username: data.get("username"),
            firstname: data.get("firstname"),
            lastname: data.get("lastname"),
            email: data.get("email"),
            password: data.get("password")
        }
        dispatch(register(userData))
    }

    // navigate to the login page
    if (success) {
        navigate('/login')
    }

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="sm:w-full p-6 rounded-lg shadow-lg bg-slate-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-0">
                <h1 className="text-2xl font-semibold text-center mb-8">Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label className="block mb-1 text-md text-slate-800 font-medium ">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter Username"
                            className="w-full border border-black  h-10 p-2 outline-none rounded-md placeholder:text-white"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block mb-1 text-md text-slate-800 font-medium">First Name</label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                placeholder="Enter Firstname"
                                className="w-full border border-black h-10 p-2 outline-none rounded-md placeholder:text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-md text-slate-800 font-medium">Last Name</label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                placeholder="Enter Lastname"
                                className="w-full border border-black h-10 p-2 outline-none rounded-md placeholder:text-white"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="block mb-1 text-md text-slate-800 font-medium"> Email </div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            className="w-full border border-black h-10 p-2 outline-none rounded-md placeholder:text-white"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1 text-md text-slate-800 font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter Password"
                            className="w-full border border-black h-10 p-2 outline-none rounded-md placeholder:text-white"
                            required
                        />
                    </div>

                    <Link to='/login' className="text-sm hover:underline hover:text-blue-600 mt-6 inline-block cursor-pointer">
                        Already have an account?
                    </Link>
                    <button type="submit" className="w-full flex items-center justify-center px-5 py-2 text-md font-medium text-center bg-sky-700 bg-opacity-50 rounded cursor-pointer hover:text-slate-900 mt-1" disabled={isLoading}>
                        {isLoading ? (
                            <span>Loading...</span>
                        ) : (
                            "Register"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register