import React from 'react';
import { CircleArrowUp, CircleArrowDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const revenueData = [
    { month: "Jan", lastMonth: 183, runningMonth: 95 },
    { month: "Feb", lastMonth: 124, runningMonth: 84 },
    { month: "Mar", lastMonth: 115, runningMonth: 72 },
    { month: "Apr", lastMonth: 85, runningMonth: 44 },
    { month: "May", lastMonth: 143, runningMonth: 108 },
    { month: "Jun", lastMonth: 143, runningMonth: 108 },
    { month: "Jul", lastMonth: 96, runningMonth: 47 },
];

const TotalRevenue = ({ amount, isProfit }) => {
    return (
        <div className="bg-gray-200 rounded-lg shadow-lg p-4">
            <p className='text-lg text-black font-medium'>
                Total Revenue
            </p>

            {/* Amount + Profit/Loss Indicator */}
            <div className='flex items-center mt-2'>
                <p className='text-2xl font-bold text-black'>
                    ${amount}
                </p>

                {/* Conditional Arrow + Percentage */}
                <div className="flex items-center ml-4">
                    {isProfit ? (
                        <CircleArrowUp className="text-green-600" size={24} />
                    ) : (
                        <CircleArrowDown className="text-red-600" size={24} />
                    )}
                    <span className="text-sm text-gray-500 ml-1">0.8%</span>
                </div>
            </div>

            {/* Custom Legend */}
            <div className="flex justify-end space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                    <span className="w-3 h-3 bg-[#475BE8] square-full"></span>
                    <p className="text-sm text-black">This Year</p>
                </div>
                <div className="flex items-center space-x-1">
                    <span className="w-3 h-3 bg-[#CFC8FF] square-full"></span>
                    <p className="text-sm text-black">Last Year</p>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="mt-4">
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={revenueData}>
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="month" />
                        <YAxis label={{
                            value: "$ (Thousands)",
                            angle: -90,
                            position: "insideLeft",
                            style: { textAnchor: "middle", fill: "#555" }
                        }} />
                        <Tooltip />
                        <Bar dataKey="lastMonth" fill="#475BE8" name="Last Month" />
                        <Bar dataKey="runningMonth" fill="#CFC8FF" name="Running Month" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default TotalRevenue;
