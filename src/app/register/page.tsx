import React from "react";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full bg-gray-50 p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">Create Account</h2>
        
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
          >
            Register
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
