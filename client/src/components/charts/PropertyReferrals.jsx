import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const referralsData = [
    { category: "Social Media", value: 70 },
    { category: "Marketplace", value: 40 },
    { category: "Websites", value: 55 },
    { category: "Digital Ads", value: 80 },
    { category: "Others", value: 15 },
];

const PropertyReferrals = () => {
    return (
        <div className='p-4'>
            <p className='text-lg text-black font-medium'>
                Property Referrals
            </p>

            <div className='space-y-8 mt-6'>
                {referralsData.map((item, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-center">
                            <p className='text-sm text-gray-700'>{item.category}</p>
                            <p className="text-sm text-gray-700 mr-1">{item.value}%</p>
                        </div>

                        <div className="w-full h-2.5 bg-gray-300 rounded-full mt-1">
                            <div
                                className="h-2.5 bg-blue-500 rounded-full"
                                style={{ width: `${item.value}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default PropertyReferrals
