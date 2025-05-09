// app/admin/users/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/component/Loader";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/users");
      console.log("Users API response:", res.data);
      
      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else if (Array.isArray(res.data.users)) {
        setUsers(res.data.users);
      } else {
        console.error("Unexpected response format:", res.data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);
  
  if (loading) {
    return <Loader/>
  }

  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border bg-green">
            <thead className="bg-green-600">
              <tr>
                <th className="text-left px-4 py-2 text-white border">#</th>
                <th className="text-left px-4 py-2 text-white border">Name</th>
                <th className="text-left px-4 py-2 text-white  border">Email</th>
                <th className="text-left px-4 py-2 text-white border">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border capitalize">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
