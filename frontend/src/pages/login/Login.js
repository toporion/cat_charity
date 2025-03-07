import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import UseAuth from '../../hook/UseAuth';
import login from '../../assets/login.jpg';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signIn } = UseAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    const result = await signIn(data.email, data.password);
    if (result.success) {
      if (result.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard/user");
      }
    } else {
      console.log("Login failed.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="relative flex w-[800px] h-[500px] bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl">
        {/* Left Side - Image */}
        <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${login})` }}></div>
        
        {/* Right Side - Form */}
        <div className="w-1/2 flex flex-col justify-center p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Sign In</h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-white block mb-1">Email</label>
              <input {...register("email")} type="email" className="w-full p-2 rounded bg-white/20 text-white outline-none" placeholder="Enter your email" />
            </div>
            <div>
              <label className="text-white block mb-1">Password</label>
              <input {...register("password")} type="password" className="w-full p-2 rounded bg-white/20 text-white outline-none" placeholder="Enter your password" />
            </div>
            <p className='text-white'>Don't have an account ? <span className='text-blue-500 font-semibold'><Link to={'/register'}>Register</Link></span></p>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded transition">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;