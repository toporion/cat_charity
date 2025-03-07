import React from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const CatList = () => {

    // Fetching the list of cats
    const { data: cats = [] } = useQuery({
        queryKey: ['cats'],
        queryFn: async () => {
            const res = await axios.get('https://cat-charity-sgdi.vercel.app/api/cat');
            console.log('see all cats', res.data.data);
            return res.data.data;
        }
    });

    // Handle delete with confirmation
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://cat-charity-sgdi.vercel.app/api/cat/${id}`)
                    .then((res) => {
                        console.log('Deleted data:', res.data);
                        Swal.fire(
                            'Deleted!',
                            'The record has been deleted.',
                            'success'
                        );
                    })
                    .catch((err) => {
                        console.error('Error deleting data:', err);
                        Swal.fire(
                            'Error!',
                            'There was an issue deleting the record.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div className='py-12'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {
                    cats.map(cat =>
                        <div key={cat._id} className="card bg-slate-200 shadow-sm mx-auto">
                            <figure>
                                <img
                                    src={cat.profileImage}
                                    alt="Cat" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {cat.name}
                                </h2>
                                <p>Microchip: {cat.microchip}</p>
                                <div className="card-actions justify-between">
                                    <div className="bg-green-500 px-4 py-3 rounded-md text-white hover:bg-pink-500 hover:text-black cursor-pointer">
                                        <Link to={`/dashboard/catdetails/${cat._id}`}>Show Details</Link>
                                    </div>
                                    <div className="bg-green-500 px-4 py-3 rounded-md text-white hover:bg-pink-500 hover:text-black cursor-pointer">
                                        <Link to={`/dashboard/update/${cat._id}`}>Edit</Link>
                                    </div>
                                    <div className="bg-red-600 px-4 py-3 rounded-md text-white hover:bg-pink-500 hover:text-black cursor-pointer">
                                        <p onClick={() => handleDelete(cat._id)}>Delete</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default CatList;
