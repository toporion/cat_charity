import { useForm } from 'react-hook-form';
import cat from '../../assets/3.jpg';
import logo from '../../assets/happyPaws.png';
import axios from "axios";

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

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
            const res = await axios.post('http://localhost:8080/api/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
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
                <div className="w-1/2 p-6 relative">
                    <img src={logo} alt="Logo" className="absolute top-0 right-0 w-20 m-4" />
                    <h2 className="text-2xl font-bold text-white text-center mb-6">Please Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-white">Name</label>
                                <input type="text" {...register("name", { required: "Name is required" })} className="w-full p-2 rounded bg-gray-400 text-white" />
                                {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="text-white">Email</label>
                                <input type="email" {...register("email", { required: "Email is required" })} className="w-full p-2 rounded bg-gray-400 text-white" />
                                {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-white">Password</label>
                                <input type="password" {...register("password", { required: "Password is required" })} className="w-full p-2 rounded bg-gray-400 text-white" />
                                {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
                            </div>
                            <div>
                                <label className="text-white">Role</label>
                                <select {...register("role")} className="w-full p-2 rounded bg-gray-400 text-white">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="text-white">Profile Image</label>
                            <input type="file" {...register("profileImage")} className="w-full p-2 rounded bg-gray-400 text-white" />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
