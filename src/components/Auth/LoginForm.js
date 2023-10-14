import {useState, useContext, useEffect} from 'react';
import {login, logout} from '../../services/ApiService';
import {AuthContext} from "../../contexts/AuthContext";
import {Link, useNavigate} from 'react-router-dom';
function LoginForm() {

    const { makeLogin } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();
    function handleChange(event) {
        const { name, value } = event.target;
        setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }));
    }

    /*useEffect(() => {
        logout()
    }, [])*/
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const result = await login(credentials);
            if(result && result.user && result.token)
            {
                localStorage.setItem('token', result.token);
                console.log('User signed in:', result);
                makeLogin(result.user);
                setSuccess(result.message)
                setTimeout(() => {
                    navigate("/");
                }, 400)
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
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6"  onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" value={credentials.email} onChange={handleChange} name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" value={credentials.password} onChange={handleChange} type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign in
                        </button>
                    </div>
                </form>
                <div>
                    <Link  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" to="/register">Don't have an account? Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
