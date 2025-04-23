import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/HomeNavbar";
import Sider from "../components/Sider";

const Home = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user === null) {
            navigate("/", { replace: true }); // Prevents navigation history stacking
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const toggleSider = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex">
            <Sider isOpen={isOpen} toggleSider={toggleSider} onLogout={handleLogout} />
            <div className={`flex-1 ${isOpen ? "ml-[200px]" : "ml-[64px]"} transition-all duration-300`}>
                <DashboardNavbar isOpen={isOpen} toggleSider={toggleSider} />
                <div className="bg-gray-300 min-h-screen pt-[64px]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Home;
