import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const ShowDetails = () => {
    const { id } = useParams();
    const { data: item, isLoading, error } = useQuery({
        queryKey: ['item', id],
        queryFn: async () => {
            const res = await axios.get(`https://cat-charity-sgdi.vercel.app/api/cat/${id}`);
            return res.data.getCat;
        },
    });

    if (isLoading) return <div className="text-center text-lg">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error fetching data</div>;

    return (
        <div className="max-w-3xl mx-auto py-10">
            <h2 className="text-2xl font-bold text-center mb-5">Cat Details</h2>
            <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
                <div className="grid grid-cols-2">
                    <div className="p-4 flex items-center justify-center bg-gray-100">
                        <img 
                            src={item.profileImage} 
                            alt={item.name} 
                            className="w-48 h-48 object-cover rounded-lg border"
                        />
                    </div>
                    <div className="p-4">
                        <table className="w-full border-collapse border border-gray-300">
                            <tbody>
                                <tr className="border-b">
                                    <td className="font-semibold p-2 border-r">Name:</td>
                                    <td className="p-2">{item.name}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="font-semibold p-2 border-r">Age:</td>
                                    <td className="p-2">{item.age} years</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="font-semibold p-2 border-r">Adoption Status:</td>
                                    <td className="p-2">{item.adoptionStatus}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="font-semibold p-2 border-r">Status:</td>
                                    <td className="p-2">{item.status}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="font-semibold p-2 border-r">Neutered:</td>
                                    <td className="p-2">{item.neutered === "true" ? "Yes" : "No"}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="font-semibold p-2 border-r">Microchip:</td>
                                    <td className="p-2">{item.microchip === "true" ? "Yes" : "No"}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold p-2 border-r">Medical History:</td>
                                    <td className="p-2">{item.medicalHistory || "No medical history available"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowDetails;
