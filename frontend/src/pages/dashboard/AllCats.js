import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllCats = () => {
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();

  // Fetch all cats from backend
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await axios.get("https://cat-charity-sgdi.vercel.app/api/cat");
        console.log("Fetched Cats:", response.data);
        setCats(response.data.data); // Adjust according to your API's response structure
      } catch (error) {
        console.error("Error fetching cats:", error);
      }
    };
    fetchCats();
  }, []);

  // Handle click on "Adopt" button - navigate to adopt page with cat id
  const handleAdopt = (catId) => {
    navigate(`/dashboard/adopt/${catId}`);
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Cats for Adoption</h1>
      <div className="cat-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cats.map((cat) => (
          <div key={cat._id} className="cat-card border p-4 rounded shadow relative">
            <div
              className={`absolute top-2 right-2 px-3 py-1 rounded text-white text-sm ${
                cat.adoptionStatus === "adopted" ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {cat.adoptionStatus === "adopted" ? "Adopted" : "Available"}
            </div>
            <img
              src={cat.profileImage}
              alt={cat.name}
              className="cat-image w-full h-48 object-cover rounded"
            />
            <h3 className="mt-2 text-xl font-semibold">{cat.name}</h3>
            <p>Age: {cat.age} years</p>
            <p>Status: {cat.status}</p>
            {cat.adoptionStatus !== "adopted" && (
              <button
                onClick={() => handleAdopt(cat._id)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Adopt
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCats;
