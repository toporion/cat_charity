import React, { useState } from 'react';
import logo from "../assets/logo1.png";
import { FaBell, FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import UseAuth from '../hook/UseAuth';

const Menu = () => {
    const { isAuthenticated, handleSignOut, user } = UseAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const onSignOut = async () => {
        await handleSignOut();
        navigate('/login');
    };

    return (
        <div className='bg-white mb-4 relative z-50'>
            <div className='flex justify-between items-center px-4 h-16'>
                <Link to={'/'}><img src={logo} alt="Logo" className='w-20 object-contain' /></Link>
                <div className='hidden md:flex w-1/2 items-center border px-2'>
                    <FaSearch className='text-gray-400' />
                    <input type="text" className='outline-none bg-white w-full px-2 h-10' placeholder="Search..." />
                </div>
                <div className='hidden md:flex gap-4 items-center'>
                    <FaBell />
                    {isAuthenticated ? (
                        <Link onClick={onSignOut} className='font-semibold cursor-pointer'>Sign Out</Link>
                    ) : (
                        <Link to="/login"><FaUser /></Link>
                    )}
                </div>
                {/* Mobile Menu Button */}
                <button className='md:hidden text-xl' onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            
            {/* Dropdown Menu for Mobile */}
            {menuOpen && (
                <div className='md:hidden flex flex-col items-center bg-gray-100 p-4 absolute top-16 left-0 w-full shadow-lg z-50'>
                    {isAuthenticated ? (
                        <Link onClick={onSignOut} className='mb-2 font-semibold cursor-pointer'>Sign Out</Link>
                    ) : (
                        <Link to="/login" className='mb-2'><FaUser /></Link>
                    )}
                    <div className='w-full flex items-center border p-2'>
                        <FaSearch className='text-gray-400' />
                        <input type="text" className='outline-none bg-white w-full px-2' placeholder="Search..." />
                    </div>
                </div>
            )}
            
            <div className='custom flex items-center' style={{ height: '60px' }}>
                <div className='hidden md:flex justify-between items-center px-4 text-black bg-slate-100 w-full'>
                    <ul className='flex gap-6'>
                        {user?.role === 'admin' ? (
                            <>
                                <Link to={'/dashboard/createCat'}><li className='cursor-pointer'>Create Profile</li></Link>
                                <Link to={'/dashboard/requets'}><li className='cursor-pointer'>Adopt Status</li></Link>
                                <Link to={'/dashboard/catManage'}><li className='cursor-pointer'>All Data</li></Link>
                                <Link to={'/dashboard/caltlist'}><li className='cursor-pointer'>Cat List</li></Link>
                                <Link to={'/dashboard/allUser'}><li className='cursor-pointer'>Users</li></Link>
                            </>
                        ) : (
                            <Link to={'/dashboard/catDetails'}><li className='cursor-pointer'>All Cats</li></Link>
                        )}
                    </ul>
                    <button className='px-6 mb-2 border py-2 rounded-md'>Learn More</button>
                </div>
                
                {/* Mobile Navigation */}
                {menuOpen && (
                    <div className='md:hidden bg-gray-100 p-4 flex flex-col items-center w-full absolute top-16 left-0 shadow-lg z-50'>
                        <ul className='flex flex-col gap-4 text-center'>
                            {user?.role === 'admin' ? (
                                <>
                                    <Link to={'/dashboard/createCat'}><li className='cursor-pointer'>Create Profile</li></Link>
                                    <Link to={'/dashboard/requets'}><li className='cursor-pointer'>Adopt Status</li></Link>
                                    <Link to={'/dashboard/catManage'}><li className='cursor-pointer'>All Data</li></Link>
                                    <Link to={'/dashboard/caltlist'}><li className='cursor-pointer'>Cat List</li></Link>
                                    <Link to={'/dashboard/allUser'}><li className='cursor-pointer'>Users</li></Link>
                                </>
                            ) : (
                                <Link to={'/dashboard/catDetails'}><li className='cursor-pointer'>All Cats</li></Link>
                            )}
                        </ul>
                        <button className='mt-4 px-6 border py-2 rounded-md'>Learn More</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;