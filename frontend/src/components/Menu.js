import React from 'react';
import logo from "../assets/logo1.png";
import { FaBell, FaSearch, FaUser } from "react-icons/fa";

const Menu = () => {
    return (
        <div className='bg-white mb-4'>
            <div className='flex justify-between items-center px-4 h-16'> {/* Set a fixed height for the top container */}
                <div>
                    <img src={logo} alt="" className='w-20 object-contain' /> {/* Ensure logo scales properly */}
                </div>
                <div className='w-1/2 flex items-center border '> {/* Flex container with full height */}
                    <FaSearch className='ml-2 text-gray-400' />
                    <input type="text" className='outline-none bg-white w-full px-2 h-10' placeholder="Search..." /> {/* Set a fixed height for the input */}
                </div>
                <div className='flex gap-4 items-center'> {/* Align icons properly */}
                    <FaBell />
                    <FaUser />
                </div>
            </div>
            <div className='custom flex items-center' style={{ height: '60px' }}> {/* Keep height as needed */}
                <div className='flex justify-between items-center px-4 text-black bg-slate-100 w-full'>
                    <ul className='flex gap-6 '>
                        <li className='cursor-pointer'>Create profile</li>
                        <li className='cursor-pointer'>Adopt status</li>
                        <li className='cursor-pointer'>All data</li>
                        <li className='cursor-pointer'>Medical history</li>
                    </ul>
                    <button className='px-6 mb-2 border py-2 rounded-md'>Learn More</button>
                </div>
            </div>
        </div>
    );
};

export default Menu;
