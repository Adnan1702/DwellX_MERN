// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { auth } from "../Firebase";

// const Login = () => {

//     const navigate = useNavigate()

//     const { backendUrl, setIsLoggedin } = useContext(AppContext)

//     const [state, setState] = useState('Login')
//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')

//     const onSubmitHandler = async (e) => {
//         try {
//             e.preventDefault();

//             axios.defaults.withCredentials = true

//             if (state === 'Sign Up') {
//                 const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password })

//                 if (data.success) {
//                     setIsLoggedin(true)
//                     navigate('/home')
//                 } else {
//                     toast.error(data.message)
//                 }
//             } else {
//                 const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password })

//                 if (data.success) {
//                     setIsLoggedin(true);
//                     localStorage.setItem("userId", data.userId);
//                     localStorage.setItem("user", JSON.stringify({
//                         name: data.user.name,
//                         email: data.user.email,
//                     }));
//                     navigate('/home');
//                 } else {
//                     toast.error(data.message)
//                 }
//             }
//         } catch (error) {
//             toast.error(data.message)
//         }
//     }

//     const handleGoogleLogin = async () => {
//         try {
//             const provider = new GoogleAuthProvider();
//             provider.setCustomParameters({ prompt: 'select_account' });

//             const result = await signInWithPopup(auth, provider);
//             const user = result.user;

//             const res = await axios.post("http://localhost:4000/api/auth/google-login", {
//                 name: user.displayName,
//                 email: user.email,
//                 profilePic: user.photoURL,
//                 googleId: user.uid,
//             }, { withCredentials: true });

//             if (res.data.success) {
//                 localStorage.setItem("userId", res.data.userId);
//                 localStorage.setItem("user", JSON.stringify({
//                     name: user.displayName,
//                     email: user.email,
//                     profilePic: user.photoURL,
//                 }));
//                 toast.success("Successfully Logged In");
//                 navigate('/home');
//             }
//         } catch (error) {
//             toast.error("Google Login Failed");
//         }
//     };


//     return (
//         <div className="relative flex items-center justify-center min-h-screen px-6 sm:px-0">
//             {/* Background Image */}
//             <div
//                 className="absolute inset-0 bg-cover bg-center"
//                 style={{ backgroundImage: "url('/bg_img.jpg')" }}>
//             </div>
//             {/* Dark Overlay */}
//             <div className="absolute inset-0 bg-black/60"></div>

//             {/* Frosted Glass Form Container */}
//             <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/30 shadow-lg p-10 rounded-lg w-full sm:w-96 text-indigo-300 text-sm">
//                 <h2 className="text-3xl font-semibold text-white text-center mb-3">
//                     {state === 'Sign Up' ? 'Create Account' : 'Login'}
//                 </h2>

//                 <p className="text-center text-sm mb-6 text-white/80">
//                     {state === 'Sign Up' ? 'Create Your Account' : 'Login To Your Account'}
//                 </p>

//                 <form onSubmit={onSubmitHandler}>
//                     {state === 'Sign Up' && (
//                         <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
//                             <img src={assets.person_icon} alt="" />
//                             <input
//                                 onChange={e => setName(e.target.value)}
//                                 value={name}
//                                 className="bg-transparent outline-none text-white placeholder-white/80"
//                                 type="text" placeholder="Full Name" required />
//                         </div>
//                     )}

//                     <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
//                         <img src={assets.mail_icon} alt="" />
//                         <input
//                             onChange={e => setEmail(e.target.value)}
//                             value={email}
//                             className="bg-transparent outline-none text-white placeholder-white/80"
//                             type="email" placeholder="Email id" required />
//                     </div>

//                     <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
//                         <img src={assets.lock_icon} alt="" />
//                         <input
//                             onChange={e => setPassword(e.target.value)}
//                             value={password}
//                             className="bg-transparent outline-none text-white placeholder-white/80"
//                             type="password" placeholder="Password" required />
//                     </div>

//                     <p onClick={() => navigate('/reset-password')} className="mb-4 text-indigo-300 cursor-pointer">
//                         Forgot Password
//                     </p>

//                     <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer">
//                         {state}
//                     </button>
//                 </form>

//                 {state === 'Sign Up' ? (
//                     <p className="text-gray-300 text-center text-xs mt-4">
//                         Already have an Account?{' '}
//                         <span onClick={() => setState('Login')} className="text-blue-400 cursor-pointer underline">Login Here</span>
//                     </p>
//                 ) : (
//                     <p className="text-gray-300 text-center text-xs mt-4">
//                         Don't have an Account?{' '}
//                         <span onClick={() => setState('Sign Up')} className="text-blue-400 cursor-pointer underline">Sign Up Here</span>
//                     </p>
//                 )}

//                 <button
//                     onClick={handleGoogleLogin}
//                     className="mt-4 flex items-center justify-start w-2/3 mx-auto py-2.5 bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full shadow-md relative cursor-pointer">
//                     <img src={assets.google_icon} alt="Google" className="w-8 h-8 absolute left-1 ml-2" />
//                     <span className="flex-1 text-center ml-6">Sign in with Google</span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Login


import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../Firebase";

const Login = () => {

    const navigate = useNavigate()

    const { backendUrl, setIsLoggedin, setUserData } = useContext(AppContext);

    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const endpoint = state === 'Sign Up' ? '/api/auth/register' : '/api/auth/login';
            const { data } = await axios.post(backendUrl + endpoint, { name, email, password }, { withCredentials: true });

            if (data.success) {
                toast.success("Successfully Logged In");
                setIsLoggedin(true);
                setUserData(data.user);

                localStorage.setItem("user", JSON.stringify(data.user));
                if (data.token) {
                    localStorage.setItem("token", data.token);
                } else {
                    console.error("Token is missing in response");
                }

                setTimeout(() => navigate('/home'), 100);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };



    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: "select_account" });

            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const res = await axios.post(backendUrl + "/api/auth/google-login", {
                name: user.displayName,
                email: user.email,
                profilePic: user.photoURL,
                googleId: user.uid,
            }, { withCredentials: true });

            if (res.data.success) {
                const userData = {
                    ...res.data.user,
                    profilePic: user.photoURL
                };

                if (res.data.token) {
                    localStorage.setItem("token", res.data.token);
                    console.log("Debug: Token saved in localStorage:", localStorage.getItem("token"));
                } else {
                    console.error("Token is missing in response");
                }

                localStorage.setItem("user", JSON.stringify(userData));

                toast.success("Successfully Logged In");
                setIsLoggedin(true);
                setUserData(userData);
                setTimeout(() => navigate("/home"), 100);
            }
        } catch (error) {
            toast.error("Google Login Failed");
        }
    };






    return (
        <div className="relative flex items-center justify-center min-h-screen px-6 sm:px-0">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/bg_img.jpg')" }}>
            </div>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Frosted Glass Form Container */}
            <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/30 shadow-lg p-10 rounded-lg w-full sm:w-96 text-indigo-300 text-sm">
                <h2 className="text-3xl font-semibold text-white text-center mb-3">
                    {state === 'Sign Up' ? 'Create Account' : 'Login'}
                </h2>

                <p className="text-center text-sm mb-6 text-white/80">
                    {state === 'Sign Up' ? 'Create Your Account' : 'Login To Your Account'}
                </p>

                <form onSubmit={onSubmitHandler}>
                    {state === 'Sign Up' && (
                        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                            <img src={assets.person_icon} alt="" />
                            <input
                                onChange={e => setName(e.target.value)}
                                value={name}
                                className="bg-transparent outline-none text-white placeholder-white/80"
                                type="text" placeholder="Full Name" required />
                        </div>
                    )}

                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                        <img src={assets.mail_icon} alt="" />
                        <input
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            className="bg-transparent outline-none text-white placeholder-white/80"
                            type="email" placeholder="Email id" required />
                    </div>

                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                        <img src={assets.lock_icon} alt="" />
                        <input
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            className="bg-transparent outline-none text-white placeholder-white/80"
                            type="password" placeholder="Password" required />
                    </div>

                    <p onClick={() => navigate('/reset-password')} className="mb-4 text-indigo-300 cursor-pointer">
                        Forgot Password
                    </p>

                    <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer">
                        {state}
                    </button>
                </form>

                {state === 'Sign Up' ? (
                    <p className="text-gray-300 text-center text-xs mt-4">
                        Already have an Account?{' '}
                        <span onClick={() => setState('Login')} className="text-blue-400 cursor-pointer underline">Login Here</span>
                    </p>
                ) : (
                    <p className="text-gray-300 text-center text-xs mt-4">
                        Don't have an Account?{' '}
                        <span onClick={() => setState('Sign Up')} className="text-blue-400 cursor-pointer underline">Sign Up Here</span>
                    </p>
                )}

                <button
                    onClick={handleGoogleLogin}
                    className="mt-4 flex items-center justify-start w-2/3 mx-auto py-2.5 bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full shadow-md relative cursor-pointer">
                    <img src={assets.google_icon} alt="Google" className="w-8 h-8 absolute left-1 ml-2" />
                    <span className="flex-1 text-center ml-6">Sign in with Google</span>
                </button>
            </div>
        </div>
    );
};

export default Login