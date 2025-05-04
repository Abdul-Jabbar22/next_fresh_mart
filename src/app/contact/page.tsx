import React from "react";

const ContactPage = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
        Contact Us
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto">
        We'd love to hear from you! Whether you have a question about our products, delivery, or anything else — our team is ready to help.
      </p>
    </div>
  
    {/* Centered form container */}
    <div className="flex justify-center">
      <form className="w-full max-w-xl space-y-6 bg-gray-50 p-8 rounded-xl shadow-md">
        <div>
          <label htmlFor="name" className="block font-semibold text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="John Doe"
            required
          />
        </div>
  
        <div>
          <label htmlFor="email" className="block font-semibold text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="you@example.com"
            required
          />
        </div>
  
        <div>
          <label htmlFor="message" className="block font-semibold text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="How can we help you?"
            required
          ></textarea>
        </div>
  
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
        >
          Send Message
        </button>
      </form>
    </div>
  </section>
  
  );
};

export default ContactPage;
