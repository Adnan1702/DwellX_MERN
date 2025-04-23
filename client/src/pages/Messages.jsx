import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchMessages = async () => {
            if (!user) {
                toast.error("User not found. Please log in.");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:4000/api/messages/user/${user._id}`);
                setMessages(response.data);
            } catch (error) {
                toast.error("Error fetching messages.");
            }
        };

        fetchMessages();
    }, [user]);

    return (
        <div className="p-6 min-h-screen bg-gray-100">
            <h2 className="text-3xl font-semibold mb-6">Messages</h2>
            {messages.length === 0 ? (
                <p className="text-gray-500 text-lg">No messages yet.</p>
            ) : (
                <div className="space-y-6">
                    {messages.map((msg) => (
                        <div key={msg._id} className="p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row items-start gap-4 border">
                            {/* Property Image with Placeholder */}
                            {msg.propertyId ? (
                                <img
                                    src={msg.propertyId.photo || "https://via.placeholder.com/150"}
                                    alt={msg.propertyId.name || "Property"}
                                    className="w-32 h-32 object-cover rounded-lg border"
                                />
                            ) : (
                                <div className="w-32 h-32 bg-gray-300 flex items-center justify-center text-gray-600 rounded-lg border">
                                    No Image
                                </div>
                            )}

                            <div className="flex-1">
                                {/* Property Name */}
                                {msg.propertyId && (
                                    <h3 className="text-xl font-semibold text-blue-600">{msg.propertyId.name}</h3>
                                )}
                                {/* Sender Info */}
                                <p className="mt-2 text-gray-700">
                                    <span className="font-semibold text-black">{msg.senderId?.name}</span> ({msg.senderId?.email}):
                                </p>
                                {/* Message Content */}
                                <p className="text-lg bg-gray-100 p-3 rounded-md mt-2 border">{msg.message}</p>
                                {/* Timestamp */}
                                <p className="text-xs text-gray-500 mt-2">{new Date(msg.timestamp).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Messages;
