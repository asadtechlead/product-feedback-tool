import {useContext, useState, useEffect} from 'react';
import { signUp } from '../../services/ApiService';
import {AuthContext} from "../../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";
function RegisterForm() {
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { makeLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    function handleChange(event) {
        const { name, value } = event.target;
        setUserData(prevUserData => ({ ...prevUserData, [name]: value }));
    }

    async function handleSubmit(event) {
        setError(null)
        event.preventDefault();
        try {
            const result = await signUp(userData);
            if(result && result.user && result.token)
            {
                localStorage.setItem('token', result.token);
                console.log('User signed up:', result);
                makeLogin(result.user);
                setSuccess(result.message)
                if(success) {
                    setTimeout(() => {
                        navigate("/");
                    }, 400)

                }
            }
            else
            {
                setError(result.message)
            }
        } catch (error) {
            setError(error.message)
            console.error(error.message);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign up new account
                    </h2>
                </div>
                <form className="mt-8 space-y-6"  onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <input id="name" value={userData.name} onChange={handleChange} name="name" type="text" autoComplete="name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Full Name" />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" value={userData.email} onChange={handleChange} name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password"  value={userData.password} onChange={handleChange} name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign Up
                        </button>
                    </div>
                </form>
                <div>
                    <Link  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" to="/login">Already have an account? Sign In</Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
