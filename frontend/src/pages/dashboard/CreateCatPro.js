import { useForm } from "react-hook-form";
import bgImage from "../../assets/bgCat.jpg"; // Import your background image
import sideImg from "../../assets/2.jpg";
import axios from "axios";

export default function CatForm() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("age", data.age);
    formData.append("status", data.status);
    formData.append("microchip", data.microchip);
    formData.append("neutered", data.neutered);
    formData.append("adoptionStatus", data.adoptionStatus);
    formData.append("medicalHistory", data.medicalHistory);
    formData.append("profileDetails", data.profileDetails);
    formData.append("rescueDate", data.rescueDate); // Add rescueDate to formData
    if (data.profileImage && data.profileImage.length > 0) {
      formData.append("profileImage", data.profileImage[0]);
    }
    try {
      const res = await axios.post("https://cat-charity-sgdi.vercel.app/api/cat", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      reset();
      console.log(res.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div
      className="flex justify-center items-center bg-gray-900 py-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex flex-col md:flex-row w-4/5 max-w-4xl bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg">
        {/* Left Image Section */}
        <div className="w-full md:w-1/3 flex justify-center items-center hidden md:flex">
          <img
            src={sideImg}
            alt="Cat"
            className="w-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-2/3 p-4">
          <h2 className="text-white text-xl font-semibold mb-4 text-center">
            Cat Profile
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Name & Age */}
            <div className="flex flex-col md:flex-row md:space-x-3">
              <input
                {...register("name", { required: true })}
                placeholder="Name"
                className="w-full md:w-1/2 p-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
              />
              <input
                {...register("age", { required: true })}
                type="number"
                placeholder="Age"
                className="w-full md:w-1/2 p-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
              />
            </div>

            {/* Status & Microchip */}
            <div className="flex flex-col md:flex-row md:space-x-3">
              <select
                {...register("status", { required: true })}
                className="w-full md:w-1/2 p-2 rounded bg-white/20 text-white focus:outline-none"
              >
                <option value="stray">Stray</option>
                <option value="surrender">Surrender</option>
              </select>
              <input
                {...register("microchip", { required: true })}
                placeholder="Microchip"
                className="w-full md:w-1/2 p-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
              />
            </div>

            {/* Neutered & Adoption Status */}
            <div className="flex flex-col md:flex-row md:space-x-3">
              <input
                {...register("neutered", { required: true })}
                placeholder="Neutered"
                className="w-full md:w-1/2 p-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
              />
              <select
                {...register("adoptionStatus", { required: true })}
                className="w-full md:w-1/2 p-2 rounded bg-white/20 text-white focus:outline-none"
              >
                <option value="in rescue">In Rescue</option>
                <option value="adopted">Adopted</option>
              </select>
            </div>

            {/* Rescue Date */}
            <input
              {...register("rescueDate", { required: true })}
              type="date"
              placeholder="Rescue Date"
              className="w-full p-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            />

            {/* Medical History */}
            <textarea
              {...register("medicalHistory")}
              placeholder="Medical History"
              className="w-full p-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            ></textarea>

            {/* Profile Details */}
            <textarea
              {...register("profileDetails")}
              placeholder="Profile Details"
              className="w-full p-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            ></textarea>

            {/* Profile Image */}
            <div className="w-full text-center">
              <input
                type="file"
                {...register("profileImage")}
                className="text-white cursor-pointer file:bg-white/20 file:text-white file:rounded file:border-none file:px-3 file:py-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
