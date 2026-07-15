"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Users, CalendarDays, ShieldCheck, Trash2 } from "lucide-react";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  createdAt: string;
}

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);

      const result = await res.json();

      if (result.success) {
        setUsers(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",

      text: "This user will be permanently deleted!",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Yes, Delete",

      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) {
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,

        {
          method: "DELETE",
        },
      );

      const result = await res.json();

      if (result.success) {
        toast.success("User deleted successfully");

        fetchUsers();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="card bg-base-100 shadow">
            <div className="card-body">
              <div className="skeleton h-24 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Users />
          User Management
        </h1>

        <p className="text-base-content/70 mt-2">
          Manage all registered users.
        </p>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow border">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>

              <th>Email</th>

              <th>Role</th>

              <th>Joined</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                        <Image
                          src={user.image || "/user.png"}

                          alt={user.name}

                          width={50}

                          height={50}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>

                <td>{user.email}</td>

                <td>
                  <div className="badge badge-primary flex gap-2">
                    <ShieldCheck size={15} />

                    {user.role}
                  </div>
                </td>

                <td>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />

                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(user._id)}

                    className="btn btn-error btn-sm"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">No users found</h2>
        </div>
      )}
    </div>
  );
}
