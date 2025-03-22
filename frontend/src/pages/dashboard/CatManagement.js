import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const CatManagement = () => {
  const [cats, setCats] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  useEffect(() => {
    axios
      .get("https://cat-charity-sgdi.vercel.app/api/cat")
      .then((response) => {
        if (response.data.success) {
          setCats(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching cats:", error));
  }, []);

  // Use useMemo to optimize filtering
  const filteredCats = useMemo(() => {
    return cats.filter((cat) =>
      cat.chipNo?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cats, searchQuery]);

  const columns = [
    { accessorKey: "profileImage", header: "Image", cell: (info) => <img src={info.getValue()} alt="cat" width={50} /> },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "age", header: "Age" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "chipNo", header: "Microchip Number", cell: (info) => info.getValue() || "N/A" },
    { accessorKey: "neutered", header: "Neutered", cell: (info) => (info.getValue() ? "Yes" : "No") },
    { accessorKey: "adoptionStatus", header: "Adoption Status" },
  ];

  const table = useReactTable({
    data: filteredCats, // Now using memoized filtered data
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="py-14 px-4">
      <input
        type="text"
        placeholder="Search by Chip Number"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "8px",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

      <table style={{ width: "100%", border: "1px solid black", borderCollapse: "collapse" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} style={{ border: "1px solid black", padding: "8px" }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ border: "1px solid black", padding: "8px" }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CatManagement;
