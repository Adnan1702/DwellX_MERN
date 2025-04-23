import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/common/PropertyCard';
import axios from 'axios';

const AllProperties = () => {
    const [properties, setProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [propertyType, setPropertyType] = useState('all');

    const fetchProperties = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("User not authenticated. Please log in.");
                return;
            }

            const response = await axios.get('http://localhost:4000/api/properties/explore', {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            setProperties(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            alert(error.response?.data?.message || 'Error fetching properties.');
        }
    };


    useEffect(() => {
        fetchProperties();
    }, []);

    // Filter and sort properties
    const filteredProperties = properties.filter(property =>
        property.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (propertyType === 'all' || property.type === propertyType)
    );

    const sortedProperties = [...filteredProperties].sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    return (
        <div className="min-h-screen p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold">All Properties</h1>
            </div>

            {/* Search, Sort & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="p-2 border-1 rounded-md w-full bg-gray-100 text-gray-900"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    className="p-2 border rounded-md bg-gray-100 text-gray-900"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
                <select
                    className="p-2 border rounded-md bg-gray-100 text-gray-900"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {sortedProperties.length > 0 ? (
                    sortedProperties.map((property) => (
                        <PropertyCard key={property._id} property={property} isMyProperty={false} />
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-full">No properties found.</p>
                )}
            </div>
        </div>
    );
};

export default AllProperties;
