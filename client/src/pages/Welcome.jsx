import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Home = () => {
    return (
        <div className="relative w-full min-h-screen">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/bg_img.jpg')" }}>
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Navbar Stays on Top */}
            <div className="absolute top-0 left-0 w-full z-20">
                <Navbar />
            </div>

            {/* Centered Header Section */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center">
                <Header />
            </div>
        </div>


    )
}

export default Home
