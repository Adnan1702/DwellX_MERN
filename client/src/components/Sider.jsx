import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaHome, FaUserTie, FaStar, FaEnvelope, FaUser, FaSignOutAlt, FaGlobe } from "react-icons/fa";
// import { MdFavorite } from "react-icons/md";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Sider = ({ isOpen, toggleSider }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useContext(AppContext);

    const handleLogout = async () => {
        await logout();
        toast.success("Logged Out Successfully");
        navigate("/login");
    };

    return (
        <div className={`z-50 h-screen bg-gray-900 text-white ${isOpen ? "w-50" : "w-16"} duration-300 fixed top-0 left-0 flex flex-col justify-between`}>
            {/* Logo & Toggle */}
            <div>
                <div className="p-4 flex items-center">
                    <img
                        src={assets.logo}
                        alt="logo"
                        className={`cursor-pointer transition ${isOpen ? "w-12" : "w-10"}`}
                        onClick={toggleSider}
                    />
                    {isOpen && <h1 className="text-3xl font-bold ml-2">Dwellex</h1>}
                </div>

                {/* Sidebar Items */}
                <nav className="flex-grow">
                    <ul className="space-y-4 p-2">
                        <SidebarItem icon={<FaTachometerAlt />} text="Dashboard" to="/home/dashboard" isOpen={isOpen} location={location} />
                        <SidebarItem icon={<FaHome />} text="My Properties" to="/home/my-properties" isOpen={isOpen} location={location} />
                        <SidebarItem icon={<FaGlobe />} text="Explore Properties" to="/home/all-properties" isOpen={isOpen} location={location} />
                        {/* <SidebarItem icon={<FaUserTie />} text="Agents" to="/home/agents" isOpen={isOpen} location={location} /> */}
                        {/* <SidebarItem icon={<FaStar />} text="Reviews" to="/home/reviews" isOpen={isOpen} location={location} /> */}
                        <SidebarItem icon={<FaEnvelope />} text="Messages" to="/home/messages" isOpen={isOpen} location={location} />
                        {/* <SidebarItem icon={<MdFavorite />} text="Favorites" to="/home/favorites" isOpen={isOpen} location={location} /> */}
                    </ul>
                </nav>
            </div>

            {/* My Profile & Logout */}
            <div className="p-2 border-t border-gray-700">
                <SidebarItem icon={<FaUser />} text="My Profile" to="/home/profile" isOpen={isOpen} location={location} />
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full p-3 text-red-400 hover:bg-gray-700 rounded-lg transition cursor-pointer relative group"
                >
                    <FaSignOutAlt size={20} />
                    {isOpen && <span className="ml-3">Logout</span>}
                    {!isOpen && (
                        <span className="absolute left-full ml-3 px-2 py-1 text-sm bg-gray-800 text-white rounded-md opacity-0 group-hover:opacity-100 transition">
                            Logout
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
};

const SidebarItem = ({ icon, text, to, isOpen, location }) => {
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`flex items-center p-3 rounded-lg transition relative group ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`}
        >
            {icon}
            {isOpen && <span className="ml-3">{text}</span>}
            {!isOpen && (
                <span className="absolute left-full ml-3 px-2 py-1 text-sm bg-gray-800 text-white rounded-md opacity-0 group-hover:opacity-100 transition">
                    {text}
                </span>
            )}
        </Link>
    );
};

export default Sider;
