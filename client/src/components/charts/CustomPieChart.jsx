// import React from 'react'
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// const COLORS1 = [{ name: "Sold", value: 300 }, { name: "Available", value: 700 }];
// const COLORS2 = [{ name: "Rented", value: 400 }, { name: "Available", value: 600 }];
// const COLORS3 = [{ name: "New", value: 500 }, { name: "Returning", value: 500 }];
// const COLORS4 = [{ name: "Metropolitan", value: 200 }, { name: "Others", value: 800 }];

// const COLORS = ["#4F46E5", "#CBD5E1"]; // Purple & Grey

// const chartData = [
//     { title: "Properties For Sale", data: [{ name: "Sold", value: 684 }, { name: "Available", value: 700 }], colors: ['#475be8', '#e4e8ef'] },
//     { title: "Properties For Rent", data: [{ name: "Rented", value: 546 }, { name: "Available", value: 600 }], colors: ['#475ae8', '#e4b8ef'] },
//     { title: "Total Customers", data: [{ name: "New", value: 5732 }, { name: "Returning", value: 500 }], colors: ['#275be8', '#c4e8ef'] },
//     { title: "Total Cities", data: [{ name: "Metropolitan", value: 90 }, { name: "Others", value: 800 }], colors: ['#275be8', '#c4e8ef'] }
// ];

// const renderPieChart = (data, colors) => (
//     <div className="w-full flex justify-center">
//         <PieChart width={200} height={200}>
//             <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
//                 {data.map((_, index) => (
//                     <Cell key={`cell-${index}`} fill={colors[index]} />
//                 ))}
//             </Pie>
//             <Tooltip />
//         </PieChart>
//     </div>
// );

// const CustomPieChart = () => {
//     return (
//         <div className="flex justify-between gap-6 mt-6">
//             {chartData.map((chart, index) => (
//                 <div key={index} className="w-1/4 bg-white p-4 rounded-lg shadow-lg text-center">
//                     <p className="text-gray-500 mb-2">{chart.title}</p>
//                     {renderPieChart(chart.data, chart.colors)}
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default CustomPieChart

import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const CustomPieChart = ({ title, value, series, colors }) => {
    // Format series data for Recharts
    const data = series.map((percentage, index) => ({
        name: index === 0 ? "Primary" : "Secondary",
        value: percentage
    }));

    return (
        <div className="w-1/4 h-25 bg-gray-200 pl-4 rounded-lg shadow-lg flex items-center justify-between">

            <div className="text-left">
                <p className="text-gray-600 text-sm font-medium">{title}</p>
                <p className="text-lg font-bold text-gray-900 mt-1">{value}</p>
            </div>

            {/* Pie Chart */}
            <div className="w-24 h-24 flex justify-center items-center">
                <PieChart width={80} height={80}>
                    <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={28} innerRadius={16}>
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
        </div>
    );
};

export default CustomPieChart;
