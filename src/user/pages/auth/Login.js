import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { getUser, login } from "../../../state/auth/Action";
import { useEffect } from "react";


const Login = ({ onLoginSuccess }) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const { isLoading } = useSelector(state => state.auth);
    const tokenData = localStorage.getItem("token");
    const token = tokenData ? JSON.parse(tokenData).token : null;
    const navigate = useNavigate()

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        const loginData = {
            email: data.get("email"),
            password: data.get("password")
        }
        dispatch(login(loginData))
    }

    // useEffect hook to get the user data if a token is present
    useEffect(() => {
        if (token) {
            dispatch(getUser());
        }
    }, [dispatch, token]);

    // useEffect hook to handle redirect on role based (admin or user)
    useEffect(() => {
        if (token) {
            onLoginSuccess()
            if (auth?.user?.role === 1) {
                navigate("/admin")
            }
        }
    }, [token, onLoginSuccess, auth?.user?.role, navigate]);

    return (

        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="sm:w-full p-6 rounded-lg shadow-lg bg-slate-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center mb-8"> Login </h1>

                <form onSubmit={handleSubmit}>
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

                    <Link to='/register' className="text-sm hover:underline hover:text-blue-600 mt-6 inline-block cursor-pointer">
                        Don't have an account?
                    </Link>
                    <button type="submit" className="w-full flex items-center justify-center px-5 py-2 text-md font-medium text-center bg-sky-700 bg-opacity-50 rounded cursor-pointer hover:text-slate-900 mt-1" disabled={isLoading}>
                        {isLoading ? (
                            <span>Loading...</span>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login

