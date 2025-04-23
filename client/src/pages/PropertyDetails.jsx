// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { ArrowLeft } from "lucide-react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { MapPinHouse } from 'lucide-react';
// import { Pencil } from 'lucide-react';
// import { Trash2 } from 'lucide-react';
// import { MessageCircle, Phone } from 'lucide-react';


// const propertyTypes = ["Apartment", "Villa", "Commercial", "Land"];

// const PropertyDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const location = useLocation();
//     const isMyProperty = location.state?.isMyProperty || false;
//     const [property, setProperty] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState({
//         name: "",
//         description: "",
//         type: "",
//         price: "",
//         location: "",
//         photo: null,
//     });

//     useEffect(() => {
//         const fetchProperty = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:4000/api/properties/${id}`);
//                 setProperty(response.data);
//                 setFormData({
//                     name: response.data.name,
//                     description: response.data.description,
//                     type: response.data.type,
//                     price: response.data.price,
//                     location: response.data.location,
//                     photo: null,
//                 });
//             } catch (error) {
//                 toast.error("Error fetching property details.");
//             }
//         };

//         fetchProperty();
//     }, [id]);

//     const handleDelete = async () => {
//         try {
//             await axios.delete(`http://localhost:4000/api/properties/${id}`);
//             toast.success("Property deleted successfully.");
//             navigate("/home/my-properties");
//         } catch (error) {
//             toast.error("Error deleting property.");
//         }
//     };

//     const handleEdit = () => {
//         setIsEditing(true);
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (e) => {
//         setFormData({ ...formData, photo: e.target.files[0] });
//     };


//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         const formDataToSend = new FormData();
//         formDataToSend.append("name", formData.name);
//         formDataToSend.append("description", formData.description);
//         formDataToSend.append("type", formData.type);
//         formDataToSend.append("price", formData.price);
//         formDataToSend.append("location", formData.location);
//         if (formData.photo) {
//             formDataToSend.append("photo", formData.photo);
//         }

//         try {
//             await axios.put(`http://localhost:4000/api/properties/${id}`, formDataToSend, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });
//             toast.success("Property updated successfully.");
//             setIsEditing(false);
//             const updatedProperty = await axios.get(`http://localhost:4000/api/properties/${id}`);
//             setProperty(updatedProperty.data);

//         } catch (error) {
//             toast.error("Error updating property.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!property) {
//         return <p className="text-center text-gray-500">Loading...</p>;
//     }

//     return (
//         <div className="min-h-screen p-6">

//             <button
//                 onClick={() => navigate(-1)}
//                 className="cursor-pointer w-14 h-10 bg-gray-600 text-white p-2 rounded-full mb-3 flex items-center justify-center"
//             >
//                 <ArrowLeft className="w-6 h-6" />
//             </button>
//             {isEditing && <h2 className="text-2xl font-bold mb-2">Update Property</h2>}

//             {isEditing ? (
//                 <form onSubmit={handleUpdate} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         placeholder="Enter Property Name"
//                         className="w-full p-2 border border-gray-300 rounded-md"
//                         required
//                     />

//                     <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         placeholder="Enter Description"
//                         className="w-full p-2 border border-gray-300 rounded-md"
//                         rows="3"
//                         required
//                     ></textarea>

//                     <select
//                         name="type"
//                         value={formData.type}
//                         onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 rounded-md"
//                         required
//                     >
//                         <option value="">Select Property Type</option>
//                         {propertyTypes.map((type, index) => (
//                             <option key={index} value={type}>
//                                 {type}
//                             </option>
//                         ))}
//                     </select>

//                     <input
//                         type="number"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleChange}
//                         placeholder="Enter Property Price in ₹"
//                         className="w-full p-2 border border-gray-300 rounded-md"
//                         required
//                     />

//                     <input
//                         type="text"
//                         name="location"
//                         value={formData.location}
//                         onChange={handleChange}
//                         placeholder="Enter Location"
//                         className="w-full p-2 border border-gray-300 rounded-md"
//                         required
//                     />

//                     <label className="block text-gray-700 font-semibold">
//                         Property Photo
//                         <input
//                             type="file"
//                             accept="image/*"
//                             onChange={handleFileChange}
//                             className="w-full p-2 border border-gray-300 rounded-md mt-1"
//                         />
//                     </label>

//                     <button
//                         type="submit"
//                         className={`w-1/3 text-white py-2 rounded-md transition mx-auto block ${loading ? "bg-gray-400 cursor-not-allowed" : "cursor-pointer bg-blue-600 hover:bg-blue-900"
//                             }`}
//                         disabled={loading}
//                     >
//                         {loading ? "Updating..." : "Update"}
//                     </button>
//                 </form>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <img src={property.photo} alt={property.name} className="w-full h-96 object-cover rounded-lg" />
//                     <div>
//                         <h1 className="text-4xl font-bold">{property.name}</h1>
//                         <div className="flex items-center text-xl text-gray-600 mt-3">
//                             <MapPinHouse className="w-5 h-5 mr-2" />
//                             <span>{property.location}</span>
//                         </div>
//                         <p className="text-lg text-gray-600 mt-4">{property.description}</p>
//                         <h2 className="text-2xl font-semibold mt-6">Price: ₹{property.price}</h2>
//                         <div className="mt-6 flex gap-4">
//                             {isMyProperty ? (
//                                 <>
//                                     <button onClick={handleEdit} className="cursor-pointer bg-orange-400 text-white px-4 py-2 rounded flex items-center gap-2">
//                                         <Pencil className="w-5 h-5" /> Edit
//                                     </button>
//                                     <button onClick={handleDelete} className="cursor-pointer bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2">
//                                         <Trash2 className="w-5 h-5" /> Delete
//                                     </button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <button className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
//                                         <MessageCircle className="w-5 h-5" /> Message
//                                     </button>
//                                     <button className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
//                                         <Phone className="w-5 h-5" /> Call
//                                     </button>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PropertyDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, MapPinHouse, Pencil, Trash2, MessageCircle, Phone } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const propertyTypes = ["Apartment", "Villa", "Commercial", "Land"];

const PropertyDetails = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const isMyProperty = location.state?.isMyProperty || false;
    const [property, setProperty] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/properties/${id}`);
                setProperty(response.data);
            } catch (error) {
                toast.error("Error fetching property details.");
            }
        };

        fetchProperty();
    }, [id]);

    const handleMessage = async () => {
        if (!message.trim()) {
            toast.error("Message cannot be empty.");
            return;
        }

        try {
            await axios.post("http://localhost:4000/api/messages", {
                senderId: user._id,
                receiverId: property.userId,
                propertyId: id,
                message,
            });
            toast.success("Message sent successfully!");
            setMessage("");
            document.getElementById('messageModal').close(); // Close modal after sending
        } catch (error) {
            toast.error("Error sending message.");
        }
    };

    if (!property) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    return (
        <div className="min-h-screen p-6">
            <button onClick={() => navigate(-1)} className="cursor-pointer w-14 h-10 bg-gray-600 text-white p-2 rounded-full mb-3 flex items-center justify-center">
                <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img src={property.photo} alt={property.name} className="w-full h-96 object-cover rounded-lg" />
                <div>
                    <h1 className="text-4xl font-bold">{property.name}</h1>
                    <div className="flex items-center text-xl text-gray-600 mt-3">
                        <MapPinHouse className="w-5 h-5 mr-2" />
                        <span>{property.location}</span>
                    </div>
                    <p className="text-lg text-gray-600 mt-4">{property.description}</p>
                    <h2 className="text-2xl font-semibold mt-6">Price: ₹{property.price}</h2>
                    <div className="mt-6 flex gap-4">
                        {isMyProperty ? (
                            <>
                                <button onClick={() => navigate(`/edit/${id}`)} className="cursor-pointer bg-orange-400 text-white px-4 py-2 rounded flex items-center gap-2">
                                    <Pencil className="w-5 h-5" /> Edit
                                </button>
                                <button onClick={() => navigate(`/delete/${id}`)} className="cursor-pointer bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2">
                                    <Trash2 className="w-5 h-5" /> Delete
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => document.getElementById('messageModal').showModal()} className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5" /> Message
                                </button>
                                <button className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
                                    <Phone className="w-5 h-5" /> Call
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Message Modal */}
            <dialog id="messageModal" className="p-6 bg-white rounded-md shadow-md w-1/2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h3 className="text-xl font-semibold mb-4 text-center">Send a Message</h3>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-32 p-3 border rounded-md"
                    placeholder="Type your message..."
                ></textarea>
                <div className="mt-4 flex justify-end gap-2">
                    <button onClick={() => document.getElementById('messageModal').close()} className="cursor-pointer bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                    <button onClick={handleMessage} className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded">Send</button>
                </div>
            </dialog>
        </div>
    );
};

export default PropertyDetails;

