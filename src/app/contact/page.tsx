"use client"
import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:3000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit message');
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      console.error('Error submitting message:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6 bg-gray-50 p-8 rounded-xl shadow-md">
          <div>
            <label htmlFor="name" className="block font-semibold text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.message}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="How can we help you?"
              required
            ></textarea>
          </div>

        
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;