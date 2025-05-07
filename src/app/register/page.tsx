"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: " ", // default role
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success(data.message || "Registration successful!", {
        duration: 3000,
        position: "top-right",
      });
''
      setTimeout(() => {
        router.push("/login");
      }, 1500);

      setFormData({ username: "", email: "", password: "" , role :""});
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!", {
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <Toaster
        toastOptions={{
          className: "font-medium",
          success: {
            iconTheme: {
              primary: "#10B981", // green-500
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444", // red-500
              secondary: "white",
            },
          },
        }}
      />

      <div className="max-w-md w-full bg-gray-50 p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          Create Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-black">Role</label>
            <select
              name="role"
              value={formData.role || "user"}
              className="w-full mt-1 px-4 py-2 bg-gray-200 text-black rounded-md"
              required
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Full Name
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              className="w-full mt-1 px-4 py-2 bg-gray-200 text-black rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="w-full mt-1 px-4 py-2 bg-gray-200 text-black rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              className="w-full mt-1 px-4 py-2 bg-gray-200 text-black rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
