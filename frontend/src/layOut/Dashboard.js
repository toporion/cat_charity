import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from '../components/Menu';

const Dashboard = () => {
    return (
        <div className=''>
            <div className='h-20'>
                <Menu/>
            </div>
            <div className='bg-white min-h-screen'>
                <Outlet/>
            </div>
        </div>
    );
};

export default Dashboard;