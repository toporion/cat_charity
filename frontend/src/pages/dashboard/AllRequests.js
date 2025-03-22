import React from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';

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

  // Mutation for updating request status (approve/reject)
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
    if (window.confirm("Are you sure you want to delete this request?")) {
      deleteRequestMutation.mutate(requestId);
    }
  };

  return (
    <div className='py-10 grid grid-cols-3'>
      {allRequests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        allRequests.map((req) => (
          <div key={req._id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
            <p><strong>Cat:</strong> {req.cat?.name || 'Unknown Cat'}</p>
            <p><strong>User:</strong> {req.user?.name || 'Unknown User'}</p>
            <p><strong>Notes:</strong> {req.notes}</p>
            <p><strong>Status:</strong> {req.status}</p>
            
            {req.status === "pending" && (
              <div>
                <button onClick={() => handleUpdate(req._id, "approved")} style={{ marginRight: "1rem" }}>
                  Approve
                </button>
                <button onClick={() => handleUpdate(req._id, "rejected")}>
                  Reject
                </button>
              </div>
            )}
            
            {/* Delete Button */}
            <button onClick={() => handleDelete(req._id)} style={{ marginTop: "1rem", background: "red", color: "white" }}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AllRequests;
