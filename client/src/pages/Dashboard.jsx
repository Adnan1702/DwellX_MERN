// import React from 'react';
// import CustomPieChart from '../components/charts/CustomPieChart';

// const Dashboard = () => {
//     return (
//         <div className="min-h-screen">
//             <div className='mt-7 ml-4'>
//                 <h1 className="text-3xl font-semibold">Dashboard</h1>
//                 <CustomPieChart />
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

import React from 'react';
import CustomPieChart from '../components/charts/CustomPieChart';
import TotalRevenue from '../components/charts/TotalRevenue';
import PropertyReferrals from '../components/charts/PropertyReferrals';

const Dashboard = () => {
    return (
        <div className="min-h-screen p-4">
            <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

            <div className=" z-10 flex justify-between gap-6">
                <CustomPieChart
                    title="Properties for Sale"
                    value={684}
                    series={[75, 25]}
                    colors={["#002030", "#c4e8ef"]}
                />
                <CustomPieChart
                    title="Properties for Rent"
                    value={550}
                    series={[60, 40]}
                    colors={["#275fe8", "#c4e8ef"]}
                />
                <CustomPieChart
                    title="Total Customers"
                    value={5684}
                    series={[75, 25]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <CustomPieChart
                    title="Total Cities"
                    value={555}
                    series={[75, 25]}
                    colors={["#275be8", "#c4e8ef"]}
                />
            </div>
            <div className='mt-6 w-full flex flex-col lg:flex-row gap-4 lg:gap-0'>
                <div className='w-full lg:w-3/5 bg-gray-200 rounded-lg shadow-lg'>
                    <TotalRevenue amount={4253} isProfit={true} />
                </div>

                <div className='w-full lg:w-2/5 bg-gray-200 lg:ml-4 rounded-lg shadow-lg'>
                    <PropertyReferrals />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
