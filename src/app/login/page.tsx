"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Login failed");
      }

      const data = await response.json();
      
      // Show success toast
      toast.success(data.message || "Login successful!", {
        duration: 2000,
        position: "top-right",
      });
      
      // Redirect after a short delay to allow toast to be seen
      setTimeout(() => {
        router.push("/");
      }, 1500);

    } catch (err: any) {
      // Show error toast
      toast.error(err.message || "Invalid credentials", {
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      {/* Toast container */}
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
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">Login</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 bg-gray-200 text-black rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 bg-gray-200 text-black rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link 
            href="/register" 
            className="text-green-600 hover:underline hover:text-green-700"
          >
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;