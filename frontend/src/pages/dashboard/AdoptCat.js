import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authProvider/AuthProvider";

const AdoptCat = () => {
  const { catId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userId = user?._id;

  const [cat, setCat] = useState(null);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    homeType: "",
    hasPets: "", // Placeholder added
    experienceWithPets: "",
    adoptionReason: "",
  });

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const response = await axios.get(`https://cat-charity-sgdi.vercel.app/api/cat/${catId}`);
        setCat(response.data.getCat);
      } catch (error) {
        setMessage("Error loading cat details.");
      }
    };
    fetchCat();
  }, [catId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "hasPets" ? (value === "Yes") : value,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setMessage("You must be logged in to adopt a cat.");
      return;
    }
    try {
      const response = await axios.post("https://cat-charity-sgdi.vercel.app/api/adopt", {
        userId,
        catId,
        ...formData,
      });
      if (response.data.success) {
        setMessage("Adoption request submitted successfully!");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage("Failed to submit adoption request.");
      }
    } catch {
      setMessage("Error: Adoption request could not be processed.");
    }
  };

  if (!cat) return <div>Loading cat details...</div>;

  return (
    <div className="container mx-auto p-10 bg-white shadow-lg rounded-lg border border-gray-200 flex gap-8">
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4">Adopt {cat.name}</h1>
        <img src={cat.profileImage} alt={cat.name} className="max-w-xs rounded-md" />
        <p className="mt-2"><strong>Age:</strong> {cat.age} years</p>
        <p><strong>Status:</strong> {cat.status}</p>
        <p><strong>Medical History:</strong> {cat.medicalHistory}</p>
        <p>
          <strong>Adoption Status:</strong>
          <span className={cat.adoptionStatus === "adopted" ? "text-red-500" : "text-green-500"}>
            {cat.adoptionStatus}
          </span>
        </p>
      </div>
      <div className="w-1/2">
        <h2 className="text-xl font-semibold mb-4">Adoption Request Form</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input className="border p-2 rounded" type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input className="border p-2 rounded" type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          <input className="border p-2 rounded" type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          <input className="border p-2 rounded" type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
          <input className="border p-2 rounded" type="text" name="homeType" placeholder="Home Type" value={formData.homeType} onChange={handleChange} required />
          <select className="border p-2 rounded" name="hasPets" value={formData.hasPets} onChange={handleChange} required>
            <option value="" disabled>Do you have other pets?</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          <textarea className="border p-2 rounded col-span-2" name="experienceWithPets" placeholder="Describe your experience with pets" value={formData.experienceWithPets} onChange={handleChange} required />
          <textarea className="border p-2 rounded col-span-2" name="adoptionReason" placeholder="Why do you want to adopt?" value={formData.adoptionReason} onChange={handleChange} required />
          <button className="col-span-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition" type="submit">
            Submit Adoption Request
          </button>
        </form>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default AdoptCat;
