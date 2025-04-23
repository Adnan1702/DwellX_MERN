import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

    const navigate = useNavigate();

    return (
        <div className='absolute top-0 left-0 w-full z-50 bg-transparent'>
            <div className='flex w-full items-center justify-between py-4 px-6 md:px-18 lg:px-20'>
                <div className="flex items-center gap-2">
                    <img src={assets.logo} alt="logo" className='w-12 sm:w-8 md:w-10 lg:w-13' />
                    <h1 className="text-lg md:text-4xl font-bold text-white">Dwellex</h1>
                </div>
                <button
                    onClick={() => navigate('/login')}
                    className='flex items-center  border
             border-gray-500 rounded-full px-6 py-2 text-black font-semibold bg-white 
              hover:bg-gray-500 transition-all cursor-pointer'>Login
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg></button>
            </div>
        </div>
    )
}

export default Navbar
