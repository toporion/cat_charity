import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import UseAuth from "../../hook/UseAuth";

const AllUsers = () => {
  const queryClient = useQueryClient();
  const { user } = UseAuth();

  // Fetch all users
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("https://cat-charity-sgdi.vercel.app/api/user");
      return res.data.data;
    },
  });

  // Mutation for updating user role
  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }) => {
      const res = await axios.patch(
        `https://cat-charity-sgdi.vercel.app/api/user/makerole/${userId}`,
        { role }
      );
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  // Handler for delete action with SweetAlert2 confirmation
  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://cat-charity-sgdi.vercel.app/api/user/${id}`)
          .then((res) => {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            queryClient.invalidateQueries(["users"]);
          })
          .catch((error) => {
            Swal.fire("Error!", "There was an error deleting the user.", "error");
          });
      }
    });
  };

  // Handler for role change
  const handleRoleChange = (userId, newRole) => {
    if (newRole === "admin") {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to make this user an admin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, make admin!",
      }).then((result) => {
        if (result.isConfirmed) {
          updateRoleMutation.mutate({ userId, role: newRole });
        }
      });
    } else {
      updateRoleMutation.mutate({ userId, role: newRole });
    }
  };

  return (
    <div className="py-8 px-4 md:py-10 md:px-6 lg:px-8">
      <h2 className="text-xl font-semibold mb-4 md:text-2xl md:mb-6">All Users</h2>
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full border border-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-6 md:text-sm">
                Name
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-6 md:text-sm">
                Email
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-6 md:text-sm">
                Role
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-6 md:text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-sm text-gray-700 md:px-6 md:py-4 md:text-base">
                  {user.name}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 md:px-6 md:py-4 md:text-base">
                  {user.email}
                </td>
                <td className="py-3 px-4 text-sm md:px-6 md:py-4">
                  {user.role === "admin" ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 md:px-3 md:py-1 md:text-sm">
                      Admin
                    </span>
                  ) : (
                    <select
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:text-base md:py-2 md:px-3"
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  )}
                </td>
                <td className="py-3 px-4 text-sm md:px-6 md:py-4">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 md:px-4 md:py-2 md:text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;