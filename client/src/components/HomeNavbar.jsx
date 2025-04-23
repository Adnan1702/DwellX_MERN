// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const DashboardNavbar = ({ isOpen }) => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         try {
//             const storedUser = localStorage.getItem("user");

//             if (storedUser) {
//                 const parsedUser = JSON.parse(storedUser);
//                 setUser(parsedUser);
//             }
//         } catch (error) {
//             setUser(null);
//         }
//     }, []);


//     const handleLogout = () => {
//         localStorage.removeItem("user");
//         setUser(null);  // Clear state after logout
//         navigate("/");
//     };

//     return (
//         <nav className={`z-50 fixed top-0 left-0 right-0 h-16 bg-gray-900 text-white flex items-center px-4 transition-all duration-300 ${isOpen ? 'ml-49' : 'ml-16'}`}>
//             <div className="flex items-center gap-6 ml-auto">
//                 {/* Profile Dropdown */}
//                 <div className="relative group">
//                     <img
//                         src={user?.profilePic || "https://lh3.googleusercontent.com/a/default-user"}
//                         alt="Profile"
//                         className="w-12 h-12 rounded-full cursor-pointer mr-4"
//                     />
//                     <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg hidden group-hover:block">
//                         <p className="p-3 text-gray-700">{user?.name || "Guest"}</p>
//                         <p className="px-3 pb-2 text-gray-500 text-sm">{user?.email || "Not Available"}</p>
//                         <button
//                             onClick={handleLogout}
//                             className="w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100"
//                         >
//                             Logout
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default DashboardNavbar;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import profileImage from '../assets/profile.png'; // Fallback image

// const DashboardNavbar = ({ isOpen }) => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         try {
//             const storedUser = localStorage.getItem("user");

//             if (storedUser) {
//                 const parsedUser = JSON.parse(storedUser);
//                 setUser(parsedUser);
//             }
//         } catch (error) {
//             setUser(null);
//         }
//     }, []);

//     // Handle image loading error
//     const handleError = (e) => {
//         e.target.onerror = null; // Prevent infinite loop if profile.png fails as well
//         e.target.src = profileImage; // Fallback to local profile image
//     };

//     return (
//         <nav className={`z-50 fixed top-0 left-0 right-0 h-16 bg-gray-900 text-white flex items-center px-4 transition-all duration-300 ${isOpen ? 'ml-49' : 'ml-16'}`}>
//             <div className="flex items-center gap-6 ml-auto">
//                 {/* Profile Dropdown */}
//                 <div className="relative group">
//                     <div className="flex items-center gap-2">
//                         <span className="text-sm font-medium">{user?.name || "Guest"}</span>
//                         <img
//                             src={user?.profilePic || profileImage} // Try Google Profile Pic, fallback to profile.png
//                             alt="Profile"
//                             className="w-12 h-12 rounded-full cursor-pointer"
//                             onError={handleError} // Trigger fallback image on error
//                         />
//                     </div>
//                     {/* Email on hover */}
//                     <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg hidden group-hover:block min-w-[150px] max-w-[250px] px-3 py-2">
//                         <p className="text-gray-700 text-sm break-words">
//                             {user?.email || "Not Available"}
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default DashboardNavbar;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImage from '../assets/profile.png'; // Fallback image

const DashboardNavbar = ({ isOpen }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");

            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);

                // Check if profile picture is in localStorage
                const savedProfilePic = localStorage.getItem("profilePic");

                if (savedProfilePic) {
                    setProfilePic(savedProfilePic); // Use saved image from localStorage
                } else if (parsedUser?.profilePic) {
                    // Save the profile picture URL in localStorage
                    localStorage.setItem("profilePic", parsedUser.profilePic);
                    setProfilePic(parsedUser.profilePic);
                }
            }
        } catch (error) {
            setUser(null);
            setProfilePic(null);
        }
    }, []);

    // Handle image loading error
    const handleError = (e) => {
        e.target.onerror = null; // Prevent infinite loop if profile.png fails as well
        e.target.src = profileImage; // Fallback to local profile image
    };

    return (
        <nav className={`z-50 fixed top-0 left-0 right-0 h-16 bg-gray-900 text-white flex items-center px-4 transition-all duration-300 ${isOpen ? 'ml-49' : 'ml-16'}`}>
            <div className="flex items-center gap-6 ml-auto">
                {/* Profile Dropdown */}
                <div className="relative group">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{user?.name || "Guest"}</span>
                        <img
                            src={profilePic || profileImage} // Use saved profile picture URL or fallback
                            alt="Profile"
                            className="w-12 h-12 rounded-full cursor-pointer"
                            onError={handleError} // Trigger fallback image on error
                        />
                    </div>
                    {/* Email on hover */}
                    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg hidden group-hover:block min-w-[150px] max-w-[250px] px-3 py-2">
                        <p className="text-gray-700 text-sm break-words">
                            {user?.email || "Not Available"}
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
