import React from 'react';
import logo from '../../assets/logo1.png';
import './Home.css'; // Import the CSS file for animations
import { Link, useNavigate } from 'react-router-dom';
import UseAuth from '../../hook/UseAuth';
import { FaUser } from 'react-icons/fa';
const Home = () => {
  const { user, handleSignOut,isAuthenticated } = UseAuth()
  const navigate = useNavigate();
  const onSignOut = async () => {
    await handleSignOut();
    navigate('/login');
  };
  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="absolute top-0 right-0 p-4">
      {isAuthenticated ? (
                        <Link onClick={onSignOut}>
                            <p className='font-semibold cursor-pointer'>Sign Out</p>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <button>Sign In</button>
                        </Link>
                    )}

      </div>
      <div className="logo-container mx-auto">
        <img src={logo} alt="Logo" />
      </div>
      <div className="bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
    </div>
  );
};

export default Home;
