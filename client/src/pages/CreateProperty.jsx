import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const CreateProperty = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        type: "",
        price: "",
        location: "",
        photo: null,
    });
    const [loading, setLoading] = useState(false);

    const propertyTypes = ["Apartment", "House", "Villa", "Office", "Land"];
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
            alert("User not authenticated. Please log in.");
            return;
        }


        const propertyData = new FormData();
        propertyData.append("name", formData.name);
        propertyData.append("description", formData.description);
        propertyData.append("type", formData.type);
        propertyData.append("price", formData.price);
        propertyData.append("location", formData.location);
        if (formData.photo) propertyData.append("photo", formData.photo); // Append image

        try {
            const response = await axios.post(
                "http://localhost:4000/api/properties/add",
                propertyData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            toast.success("Property Added Successfully")
            navigate("/home/my-properties");
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen p-6 bg-gray-200">
            <h1 className="text-3xl font-semibold mb-6">Add a Property</h1>

            <div className="w-full mx-auto bg-white p-6 shadow-lg rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter Property Name"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter Description"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows="3"
                        required
                    ></textarea>

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select Property Type</option>
                        {propertyTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter Property Price in ₹"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />

                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter Location"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />

                    <label className="block text-gray-700 font-semibold">
                        Property Photo
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                            required
                        />
                    </label>

                    <button
                        type="submit"
                        className={`w-1/3 text-white py-2 rounded-md transition mx-auto block ${loading ? "bg-gray-400 cursor-not-allowed" : "cursor-pointer bg-blue-600 hover:bg-blue-900"
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProperty;
