import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
    const { setShowUserLogin, setUser, axios, navigate } = useAppContext();
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const {data} = await axios.post(`/api/user/${state}`, {
                name,
                email,
                password
            })

            if(data.success){
                navigate('/');
                setUser(data.user);
                setShowUserLogin(false);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div onClick={()=> setShowUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center
        text-sm bg-black/35 backdrop-blur-sm'>

            <form 
                onSubmit={onSubmitHandler} 
                onClick={(e)=> e.stopPropagation()} 
                className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] 
                rounded-2xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-2xl"
            >
                <p className="text-3xl font-semibold m-auto text-white">
                    <span className="text-primary">{state === "login" ? "Login" : "Join Us"}</span>
                </p>
                
                <p className='text-gray-200 text-center w-full mb-2'>
                    {state === "login" ? "Welcome back! Please login." : "Create your account today."}
                </p>

                {state === "register" && (
                    <div className="w-full">
                        <p className='text-gray-200 ml-1'>Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Your Name" className="bg-white/20 border border-white/20 rounded-lg w-full p-2.5 mt-1 outline-none focus:border-primary text-white placeholder:text-gray-400" type="text" required />
                    </div>
                )}
                
                <div className="w-full">
                    <p className='text-gray-200 ml-1'>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="email" className="bg-white/20 border border-white/20 rounded-lg w-full p-2.5 mt-1 outline-none focus:border-primary text-white placeholder:text-white" type="email" required />
                </div>

                <div className="w-full">
                    <p className='text-gray-200 ml-1'>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password" className="bg-white/20 border border-white/20 rounded-lg w-full p-2.5 mt-1 outline-none focus:border-primary text-white placeholder:text-white" type="password" required />
                </div>

                {state === "register" ? (
                    <p className='text-gray-300'>
                        Already have an account? <span onClick={() => setState("login")} className="text-primary font-medium cursor-pointer hover:underline">Click here</span>
                    </p>
                ) : (
                    <p className='text-gray-300'>
                        New here? <span onClick={() => setState("register")} className="text-primary font-medium cursor-pointer hover:underline">Create account</span>
                    </p>
                )}

                <button className="bg-primary hover:bg-orange-600 transition-all text-white w-full py-3 rounded-xl cursor-pointer font-semibold shadow-lg mt-2">
                    {state === "register" ? "Create Account" : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;