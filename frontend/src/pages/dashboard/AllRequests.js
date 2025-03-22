import React from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';
import Swal from 'sweetalert2';

const AllRequests = () => {
  const queryClient = useQueryClient();

  // Fetch all adoption requests
  const { data: allRequests = [] } = useQuery({
    queryKey: ['requests'],
    queryFn: async () => {
      const res = await axios.get('https://cat-charity-sgdi.vercel.app/api/adoptions');
      return res.data;
    }
  });

  // Mutation for updating request status
  const updateRequestMutation = useMutation({
    mutationFn: async ({ requestId, status }) => {
      await axios.put(`https://cat-charity-sgdi.vercel.app/api/adoptions/${requestId}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['requests']);
    }
  });

  // Mutation for deleting request
  const deleteRequestMutation = useMutation({
    mutationFn: async (requestId) => {
      await axios.delete(`https://cat-charity-sgdi.vercel.app/api/adoptions/${requestId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['requests']);
    }
  });

  // Handlers
  const handleUpdate = (requestId, status) => {
    updateRequestMutation.mutate({ requestId, status });
  };

  const handleDelete = (requestId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRequestMutation.mutate(requestId);
        Swal.fire("Deleted!", "The request has been deleted.", "success");
      }
    });
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Adoption Requests</h2>
      {allRequests.length === 0 ? (
        <p className="text-center text-gray-600">No requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Cat</th>
                <th className="border border-gray-300 px-4 py-2 text-left">User</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Notes</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allRequests.map((req) => (
                <tr key={req._id} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">{req.cat?.name || 'Unknown Cat'}</td>
                  <td className="border border-gray-300 px-4 py-2">{req.user?.name || 'Unknown User'}</td>
                  <td className="border border-gray-300 px-4 py-2">{req.notes}</td>
                  <td className="border border-gray-300 px-4 py-2">{req.status}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {req.status === "pending" && (
                      <>
                        <button 
                          onClick={() => handleUpdate(req._id, "approved")}
                          className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleUpdate(req._id, "rejected")}
                          className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => handleDelete(req._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllRequests;
