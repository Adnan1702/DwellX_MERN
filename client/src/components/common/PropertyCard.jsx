import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinHouse } from 'lucide-react';

const PropertyCard = ({ property, isMyProperty }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/home/property/${property._id}`, { state: { isMyProperty: isMyProperty } })}
            className="cursor-pointer property-card backdrop-blur-lg bg-black/60 to-transparent rounded-lg shadow-lg border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-2xl"
        >
            <img
                src={property.photo}
                alt={property.name}
                className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="pt-3 pl-2 pr-2 pb-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">{property.name}</h3>
                    <span className="bg-white/20 text-white text-sm font-semibold px-2 py-1 rounded-md">
                        ₹ {property.price}
                    </span>
                </div>
                <p className="text-gray-300 mt-1">{property.type}</p>

                {/* Location with icon aligned */}
                <div className="flex items-center text-gray-200 mt-3">
                    <MapPinHouse className="w-5 h-5 mr-1" />
                    <span>{property.location}</span>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;

