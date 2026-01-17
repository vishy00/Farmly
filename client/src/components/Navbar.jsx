import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { ShoppingCart, CircleUserRound, Menu, X, Search } from 'lucide-react'

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const { user, setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery, getCartCount, axios } = useAppContext();

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout')
            if (data.success) {
                toast.success(data.message);
                setUser(null);
                setOpen(false); // Close sidebar on logout
                navigate("/")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Search trigger
    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate("/products")
        }
    }, [searchQuery, navigate])

    return (
        <>
            {/* Main Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 py-4 border-b border-gray-300 bg-white shadow-sm">
                
                {/* Logo Section */}
                <div className="flex items-center gap-4">
                    <NavLink to='/' onClick={() => setOpen(false)} >
                        <img className="h-8 md:h-10" src={assets.logo1} alt="logo" />
                    </NavLink>
                </div>

                {/* Desktop Menu (sm and above) */}
                <div className="hidden md:flex items-center gap-6 lg:gap-10 font-medium text-gray-700">
                    <NavLink to='/' className={({isActive}) => isActive ? "text-primary" : ""}>Home</NavLink>
                    <NavLink to='/products' className={({isActive}) => isActive ? "text-primary" : ""}>All Products</NavLink>
                    <NavLink to='/contact' className={({isActive}) => isActive ? "text-primary" : ""}>Contact</NavLink>

                    {/* Search Bar */}
                    <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-4 py-1.5 rounded-full bg-gray-50 focus-within:border-primary transition-all">
                        <input 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            className="bg-transparent outline-none placeholder-gray-500 w-40" 
                            type="text" 
                            placeholder="Search products..." 
                        />
                        <Search className='w-4 h-4 text-gray-400' />
                    </div>
                </div>

                {/* Icons Section */}
                <div className="flex items-center gap-4 md:gap-6">
                    <NavLink to="/seller/login" className="hidden sm:block text-xs font-semibold px-4 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition">
                        Seller Login
                    </NavLink>

                    {/* Cart Icon */}
                    <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                        <ShoppingCart className="w-6 text-gray-700" />
                        {getCartCount() > 0 && (
                            <span className="absolute -top-2 -right-2 text-[10px] text-white bg-primary w-5 h-5 flex items-center justify-center rounded-full">
                                {getCartCount()}
                            </span>
                        )}
                    </div>

                    {/* User Profile / Login */}
                    {!user ? (
                        <button onClick={() => setShowUserLogin(true)} className="hidden md:block px-8 py-2 bg-primary hover:bg-orange-600 transition text-white rounded-full">
                            Login
                        </button>
                    ) : (
                        <div className='relative group hidden md:block'>
                            <CircleUserRound className='w-9 text-primary cursor-pointer' />
                            <ul className="hidden group-hover:block absolute top-full right-0 bg-white shadow-xl border border-gray-100 py-2 w-48 rounded-lg mt-1 transition-all">
                                <li onClick={() => navigate("my-orders")} className='px-4 py-2 hover:bg-gray-50 cursor-pointer'>My Orders</li>
                                <li onClick={logout} className='px-4 py-2 hover:bg-gray-50 cursor-pointer text-red-500'>Logout</li>
                            </ul>
                        </div>
                    )}

                    {/* Mobile Menu Toggle Icon */}
                    <button onClick={() => setOpen(true)} className="md:hidden p-1">
                        <Menu className="w-7 text-gray-700" />
                    </button>
                </div>

                {/* --- MOBILE SIDEBAR --- */}
                <div className={`fixed top-0 right-0 bottom-0 bg-white z-[60] transition-all duration-300 shadow-2xl ${open ? 'w-full' : 'w-0 overflow-hidden'}`}>
                    <div className='flex flex-col text-gray-600 h-full'>
                        <div className='flex items-center justify-between p-5 border-b'>
                            <img className="h-8" src={assets.logo1} alt="logo" />
                            <X onClick={() => setOpen(false)} className="w-7 cursor-pointer text-gray-500" />
                        </div>

                        <div className='flex flex-col gap-2 p-5 text-lg font-medium'>
                            <NavLink onClick={() => setOpen(false)} className='py-2 border-b' to='/'>Home</NavLink>
                            <NavLink onClick={() => setOpen(false)} className='py-2 border-b' to='/products'>All Products</NavLink>
                            <NavLink onClick={() => setOpen(false)} className='py-2 border-b' to='/seller/login'>Become a Seller</NavLink>
                            
                            {user ? (
                                <>
                                    <NavLink onClick={() => setOpen(false)} className='py-2 border-b' to='/my-orders'>My Orders</NavLink>
                                    <button onClick={logout} className='text-left py-2 border-b text-red-500'>Logout</button>
                                </>
                            ) : (
                                <button onClick={() => { setOpen(false); setShowUserLogin(true); }} className='text-left py-2 border-b text-primary'>Login / Sign Up</button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Space Filler (Required because Navbar is 'fixed') */}
            <div className="h-[72px] md:h-[80px]"></div>
        </>
    )
}

export default Navbar;