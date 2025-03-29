import React, { useState } from 'react';
import illustrationIntro from '../../../images/signup2.png';
import useAuth from '../../config/hooks/authContext';
import google_signup from '../registerComponent/google.png';

const LoginComponent = () => {

    const { login } = useAuth();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(Email, Password); 
        } catch (error) {
            setError("Invalid email or password");
        }
    };

    const googleAuth = () => {
        window.open(`${process.env.REACT_APP_BACKEND_URL}/google-auth/google/callback`, "_self");
        //get the return value by callback endpoint 
    };

    return (
        <div className='flex flex-col md:flex-row'>
            {/* Image */}
            <div className="flex items-center justify-center md:flex-1">
                <img src={illustrationIntro} alt="Your Image" className="h-auto max-h-full" />
            </div>
            <div className='md:flex-1'>
                <section>
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-5">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Login to your account
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>
                                    {error && <p className="text-sm text-red-500">{error}</p>}
                                    <button type="submit" className="w-full text-white hover:text-black bg-orange-600 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don't have an account? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up here</a>
                                    </p>
                                    <button className="w-full flex items-center justify-center text-white bg-gray-100 hover:bg-gray-200 border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-500" onClick={googleAuth} type="button">
                                        <img src={google_signup} alt="Google icon" className="w-5 h-5 mr-2" />
                                        <span className="text-gray-900 dark:text-white">Sign in with Google</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default LoginComponent;
