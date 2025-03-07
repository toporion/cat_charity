import { useForm } from 'react-hook-form';
import cat from '../../assets/3.jpg';
import logo from '../../assets/happyPaws.png';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const navigate=useNavigate()

    const onSubmit = async (data) => {
        console.log(data);
        
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('role', data.role);
        
        if (data.profileImage && data.profileImage.length > 0) {
            formData.append('profileImage', data.profileImage[0]);
        }

        try {
            const res = await axios.post('https://cat-charity-sgdi.vercel.app/api/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                
            });
            console.log(res.data);
            
            // Show SweetAlert on successful registration
            Swal.fire({
                title: 'Welcome to Happy Paws',
                text: 'Registration Successful',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            reset()
            navigate('/login')
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-300 bg-opacity-50">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-2xl flex w-[80%] max-w-4xl">
                {/* Left Side - Image */}
                <div className="w-1/2 flex items-center justify-center">
                    <img src={cat} alt="Register" className="w-full h-full object-cover rounded-2xl" />
                </div>

                {/* Right Side - Form */}
                <div className="w-1/2 p-6 relative text-black">
                    <img src={logo} alt="Logo" className="absolute top-0 right-0 w-20 m-4" />
                    <h2 className="text-2xl font-bold text-black text-center mb-6">Please Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-black">Name</label>
                                <input type="text" {...register("name", { required: "Name is required" })} className="w-full p-2 rounded bg-gray-400 text-black" />
                                {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="text-black">Email</label>
                                <input type="email" {...register("email", { required: "Email is required" })} className="w-full p-2 rounded bg-gray-400 text-black" />
                                {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-black">Password</label>
                                <input type="password" {...register("password", { required: "Password is required" })} className="w-full p-2 rounded bg-gray-400 text-black" />
                                {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
                            </div>
                            <div>
                                <label className="text-black">Role</label>
                                <select {...register("role")} className="w-full p-2 rounded bg-gray-400 text-black">
                                    <option value="user">User</option>
                                </select>
                            </div>
                        </div>
                        <p className='text-black'>Don't have an account? <span><Link to={'/login'}>Login</Link></span></p>
                        <button type="submit" className="w-full bg-blue-500 text-black p-2 rounded hover:bg-blue-600">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
