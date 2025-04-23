import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/common/PropertyCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyProperties = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const [propertyType, setPropertyType] = useState('all'); // Default to 'all'

    const fetchProperties = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("User not authenticated. Please log in.");
                return;
            }

            const response = await axios.get('http://localhost:4000/api/properties', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setProperties(response.data);
        } catch (error) {
            alert(error.response?.data?.message || 'Error fetching properties.');
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    // Filter properties based on search and type
    const filteredProperties = properties.filter(property =>
        property.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (propertyType === 'all' || property.type === propertyType)
    );

    // Sort properties by price
    const sortedProperties = [...filteredProperties].sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    return (
        <div className="min-h-screen p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold">Properties</h1>

                {/* Add Property Button */}
                <button
                    className="flex items-center bg-blue-600 text-white px-3 py-1.5 rounded-full shadow-md hover:bg-blue-900 transition cursor-pointer"
                    onClick={() => navigate("/home/create-property")}
                >
                    <span className="text-3xl font-semibold">+</span>
                    <span className="ml-2 text-lg">Add Property</span>
                </button>
            </div>

            {/* Search, Sort & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="p-2 border-1 rounded-md w-full bg-gray-100 text-gray-900"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Sort Dropdown */}
                <select
                    className="p-2 border rounded-md bg-gray-100 text-gray-900 cursor-pointer hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-white/50"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>

                {/* Property Type Filter */}
                <select
                    className="p-2 border rounded-md bg-gray-100 text-gray-900 cursor-pointer hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-white/50"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                >
                    <option value="all">All Types</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                    <option value="Office">Office</option>
                    <option value="Land">Land</option>
                </select>
            </div>

            {/* Property Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProperties.length > 0 ? (
                    sortedProperties.map((property) => (
                        <PropertyCard key={property._id} property={property} isMyProperty={true} />
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-full">No properties found.</p>
                )}
            </div>
        </div>
    );
};

export default MyProperties;