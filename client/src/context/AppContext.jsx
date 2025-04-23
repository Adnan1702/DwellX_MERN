import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);

    axios.defaults.withCredentials = true;

    const checkAuthStatus = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setIsLoggedin(false);
            setUserData(null);
            return;
        }

        try {
            const { data } = await axios.get(`${backendUrl}/api/auth/is-authenticated`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });

            if (data.success) {
                setIsLoggedin(true);
                setUserData(data.user);

                localStorage.setItem("user", JSON.stringify(data.user));
                if (data.token) {
                    localStorage.setItem("token", data.token);
                }
            } else {
                handleLogout();
            }
        } catch (error) {
            console.error("Auth check failed:", error.response?.data || error.message);
            handleLogout();
        }
    };

    // Logout function to clear data properly
    const handleLogout = () => {
        setIsLoggedin(false);
        setUserData(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("profilePic");
    };

    // Restore user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (storedUser && token) {
            try {
                setUserData(JSON.parse(storedUser));
                setIsLoggedin(true);
            } catch (error) {
                console.error("Failed to parse user from localStorage:", error);
                handleLogout();
            }
        } else {
            handleLogout();
            checkAuthStatus();
        }
    }, []);



    // Logout function
    const logout = async () => {
        try {
            await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.clear();
            setIsLoggedin(false);
            setUserData(null);
            // window.location.reload(); // Ensures fresh state
        } catch (error) {
            console.error("Logout failed:", error.response?.data || error.message);
        }
    };

    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        logout,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
